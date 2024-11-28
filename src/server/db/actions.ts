"use server";

import { db } from "~/server/db/index";
import { shipmentNotice, shipment, user } from "~/server/db/schema";
import { auth } from "~/auth";
import { eq, and, isNull, isNotNull, desc, count, sql } from "drizzle-orm";
import { redirect } from 'next/navigation'
import { env } from "~/env.js";
import { unstable_cache } from "next/cache";

let fedexTokenCache = {
  token: "",
  expiryTime: 0
};

export async function fetchFedexToken() {
  const currentTime = Date.now();

  if (fedexTokenCache.token && currentTime < fedexTokenCache.expiryTime) {
    return fedexTokenCache.token;
  }

  let url = "https://apis.fedex.com/oauth/token";
  let options = {
    method: "POST",
    headers: { "Content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: env.FEDEX_API_KEY,
      client_secret: env.FEDEX_SECRET
    })
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! Status: ${response.status}, Response: ${errorText}`);
    }
    const data = await response.json();
    fedexTokenCache.token = data.access_token;
    fedexTokenCache.expiryTime = currentTime + 3600 * 1000;

    return data.access_token;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export async function getFedexTracking(tracking: string) {
  let url = "https://apis.fedex.com/track/v1/trackingnumbers";
  let options = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ${await fetchFedexToken()}`,
      "x-locale": "en_US"
    },
    body: JSON.stringify({
      includeDetailedScans: true,
      trackingInfo: [
        {
          trackingNumberInfo: {
            trackingNumber: tracking
          }
        }
      ]
    })
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! Status: ${response.status}, Response: ${errorText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }

}

export async function createShipment(values: any) {
  const session = await auth();
  const ship = values;
  ship.userId = session?.user?.id;
  const user = await getUsers(ship.userId);
  ship.requestor = user[0]?.name;
  ship.service = ship.type;

  if (ship?.items && ship.items.length > 0) {
    let totalPieces = 0;
    let totalCost = 0;

    ship.items.forEach((items: any) => {
      totalPieces += items.quantity;
      totalCost += items.quantity * items.unitPrice;
    })

    ship.pieces = totalPieces;
    ship.cost = totalCost;
  }

  ship.goods = JSON.stringify(ship.items);


  await db.insert(shipment).values(ship);
}

export async function getShipments() {
  const shipments = await db.select().from(shipment);
  return shipments;
}

export async function getUserShipments(session: any) {
  const shipments = await db.select().from(shipment).where(and(eq(shipment.userId, session?.user?.id), isNotNull(shipment.goods)));
  const fetchPromises = shipments.map(async (shipment: any) => {

    if (shipment.tracking && shipment.status !== "delivered" && shipment.carrier == "DHL") {
      const url = `https://api-eu.dhl.com/track/shipments?trackingNumber=${shipment.tracking}`;
      const options = { method: "GET", headers: { "DHL-API-Key": env.DHL_API_KEY } };

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const shipmentStatus = data.shipments[0].status.statusCode;

        shipment.shippingDate = new Date(data.shipments[0].details.shipmentActivationDate)
        if (shipmentStatus === "delivered") {
          shipment.recievedDate = new Date(data.shipments[0].events[0].timestamp);
          shipment.status = shipmentStatus;
        }
        if (shipmentStatus === "transit") {
          shipment.expectedDate = new Date(data.shipments[0].estimatedTimeOfDelivery);
          shipment.status = shipmentStatus;
        }
        if (shipmentStatus === "failure") {
          shipment.status = "failed";
        }
        if (shipmentStatus !== "delivered" && shipmentStatus !== "transit" && shipmentStatus !== "failure") {
          shipment.status = "sent"
        }
        await updateShipment(shipment);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    if (shipment.tracking && shipment.status !== "delivered" && (shipment.carrier == "FedEx" || shipment.carrier == "Fedex Freight")) {
      const data = await getFedexTracking(shipment.tracking)

      const trackResults = data?.output?.completeTrackResults?.[0]?.trackResults?.[0];

      const scanEvents = trackResults?.scanEvents || [];

      const dateAndTimes = trackResults?.dateAndTimes || [];

      const latestEvent = scanEvents.length > 0 ? scanEvents[0] : null;
      const latestEventType = latestEvent ? latestEvent.eventType : "N/A";

      const pickupDateEntry = dateAndTimes.find((entry: any) => entry.type === "ACTUAL_PICKUP");
      const pickupDate = pickupDateEntry ? pickupDateEntry.dateTime : "N/A";

      const expectedDeliveryDate = trackResults?.standardTransitTimeWindow?.window?.ends || "N/A";

      const deliveredDateEntry = dateAndTimes.find((entry: any) => entry.type === "ACTUAL_DELIVERY");
      const deliveredDate = deliveredDateEntry ? deliveredDateEntry.dateTime : "N/A";

      shipment.shippingDate = new Date(pickupDate)

      if (latestEventType === "DL") {
        shipment.recievedDate = new Date(deliveredDate);
        shipment.status = "delivered";
      }
      if (latestEventType === "IT" || latestEventType === "AO" || latestEventType === "OD" || latestEventType === "AR") {
        shipment.expectedDate = new Date(expectedDeliveryDate);
        shipment.status = "transit";
      }
      if (latestEventType === "DY" || latestEventType === "DE") {
        shipment.status = "failed";
      }
      if (latestEventType === "PU" ) {
        shipment.status = "sent"
      }
      await updateShipment(shipment);
    }
  });
  await Promise.all(fetchPromises);
  const updatedShipments = await db.select().from(shipment).orderBy(desc(shipment.date)).where(and(eq(shipment.userId, session?.user?.id), isNotNull(shipment.goods)));
  return updatedShipments;
}


export async function getUserMails(session: any) {
  const mails = await db.select().from(shipment).where(and(eq(shipment.userId, session?.user?.id), isNull(shipment.goods)));
  const fetchPromises = mails.map(async (shipment: any) => {

    if (shipment.tracking && shipment.status !== "delivered" && shipment.carrier == "DHL") {
      const url = `https://api-eu.dhl.com/track/shipments?trackingNumber=${shipment.tracking}`;
      const options = { method: "GET", headers: { "DHL-API-Key": env.DHL_API_KEY } };

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const shipmentStatus = data.shipments[0].status.statusCode;

        shipment.shippingDate = new Date(data.shipments[0].details.shipmentActivationDate)
        if (shipmentStatus === "delivered") {
          shipment.recievedDate = new Date(data.shipments[0].events[0].timestamp);
          shipment.status = shipmentStatus;
        }
        if (shipmentStatus === "transit") {
          shipment.expectedDate = new Date(data.shipments[0].estimatedTimeOfDelivery);
          shipment.status = shipmentStatus;
        }
        if (shipmentStatus === "failure") {
          shipment.status = "failed";
        }
        if (shipmentStatus !== "delivered" && shipmentStatus !== "transit" && shipmentStatus !== "failure") {
          shipment.status = "sent"
        }
        await updateShipment(shipment);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    if (shipment.tracking && shipment.status !== "delivered" && (shipment.carrier == "FedEx" || shipment.carrier == "Fedex Freight")) {
      const data = await getFedexTracking(shipment.tracking)

      const trackResults = data?.output?.completeTrackResults?.[0]?.trackResults?.[0];

      const scanEvents = trackResults?.scanEvents || [];

      const dateAndTimes = trackResults?.dateAndTimes || [];

      const latestEvent = scanEvents.length > 0 ? scanEvents[0] : null;
      const latestEventType = latestEvent ? latestEvent.eventType : "N/A";

      const pickupDateEntry = dateAndTimes.find((entry: any) => entry.type === "ACTUAL_PICKUP");
      const pickupDate = pickupDateEntry ? pickupDateEntry.dateTime : "N/A";

      const expectedDeliveryDate = trackResults?.standardTransitTimeWindow?.window?.ends || "N/A";

      const deliveredDateEntry = dateAndTimes.find((entry: any) => entry.type === "ACTUAL_DELIVERY");
      const deliveredDate = deliveredDateEntry ? deliveredDateEntry.dateTime : "N/A";

      shipment.shippingDate = new Date(pickupDate)

      if (latestEventType === "DL") {
        shipment.recievedDate = new Date(deliveredDate);
        shipment.status = "delivered";
      }
      if (latestEventType === "IT" || latestEventType === "AO" || latestEventType === "OD") {
        shipment.expectedDate = new Date(expectedDeliveryDate);
        shipment.status = "transit";
      }
      if (latestEventType === "DY" || latestEventType === "DE") {
        shipment.status = "failed";
      }
      if (latestEventType === "PU") {
        shipment.status = "sent"
      }
      await updateShipment(shipment);
    }
  });
  await Promise.all(fetchPromises);
  const updatedmails = await db.select().from(shipment).orderBy(desc(shipment.date)).where(and(eq(shipment.userId, session?.user?.id), isNull(shipment.goods)));
  return updatedmails;
  return mails;
}

export async function createShipmentNotice(values: any) {
  const notice = values;
  await db.insert(shipmentNotice).values(notice);
}

export async function getShipmentNotices() {
  const notices = await db.select().from(shipmentNotice);
  return notices;
}
export async function deleteShipmentNotice(id: number) {
  await db.delete(shipmentNotice).where(eq(shipmentNotice.id, id));
}

export async function deleteShipment(id: number) {
  await db.delete(shipment).where(eq(shipment.id, id));
}

export async function getShipmentNotice(id: number) {
  const notice = await db.select().from(shipmentNotice).where(eq(shipmentNotice.id, id));
  return notice;
}

export async function updateShipmentNotice(values: any) {
  const notice = values;
  await db.update(shipmentNotice).set(notice).where(eq(shipmentNotice.id, notice.id));
}

export async function updateShipment(values: any) {
  const ship = values;

  await db.update(shipment).set(ship).where(eq(shipment.id, ship.id));
}

export async function getUsers(id: any) {
  const ser = await db.select().from(user)
    .where(eq(user.id, id));
  return ser;
}

export async function updateUser(values: any,) {
  const up = values;
  await db.update(user).set(up).where(eq(user.id, up.id));
}

export async function getAllUsers() {
  const users = await db.select().from(user);
  return users;
}

export async function updateAllUsers(values: any) {
  const userValues = values;
  await db.update(user).set(userValues).where(eq(user.id, userValues.id));
}

export async function getPendingShipments() {
  const shipments = await db.select().from(shipment).where(eq(shipment.status, "pending"));
  return shipments;
}

export async function getDonutShart() {
  interface DonutDataItem {
    country: string;
    count: number;
    fill: string;
  }
  const currentYear = new Date().getFullYear();
  
  const counts = await db
    .select({
      country: shipment.country,
      count: sql`COUNT(*)`.as("count")
    })
    .from(shipment)
    .where(sql`YEAR(shipment.date) = ${currentYear}`)
    .groupBy(shipment.country)
    .limit(5)

    counts.forEach((count: any) => {
      count.country = count.country.toLowerCase();
      count.fill = `var(--color-${count.country.toLowerCase()})`;
    })
  return counts as DonutDataItem[];
}

export async function getAreaShart() {
  const currentYear = new Date().getFullYear();

  const shipments = await db
    .select()
    .from(shipment)
    .where(sql`YEAR(${shipment.date}) = ${currentYear}`);

  const monthlyCounts: Record<string, number> = {};
  
  shipments.forEach((shipment) => {
    const monthName = new Date(shipment.date).toLocaleString('default', { month: 'long' }); 
    if (!monthlyCounts[monthName]) {
      monthlyCounts[monthName] = 0;
    }
    monthlyCounts[monthName] += 1; 
  });

  const result = Object.entries(monthlyCounts).map(([month, count]) => ({
    month,
    count,
  }));

  return result;
}