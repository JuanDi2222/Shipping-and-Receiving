"use server";

import { db } from "~/server/db/index";
import { shipmentNotice, shipment, user } from "~/server/db/schema";
import { auth } from "~/auth";
import { eq, and, isNull, isNotNull } from "drizzle-orm";
import { redirect } from 'next/navigation'

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

export async function getUserShipments () {
  const session = await auth();
  const shipments = await db.select().from(shipment).where(and(eq(shipment.userId, session?.user?.id),isNotNull(shipment.goods)));
  return shipments;
}

export async function getUserMails( ) {
  const session = await auth();
  const mails = await db.select().from(shipment).where(and(eq(shipment.userId, session?.user?.id),isNull(shipment.goods)));
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
  if (ship.goods && ship.goods.length > 0) {
    ship.goods = JSON.stringify(ship.goods);
  }
  await db.update(shipment).set(ship).where(eq(shipment.id, ship.id));
}

export async function getUsers(id: any) {
  const ser = await db.select().from(user)
    .where(eq(user.id, id));
  return ser;
}

export async function updateUser(values: any) {
  const session = await auth();
  const up = values;
  await db.update(user).set(up).where(eq(user.id, session?.user?.id));
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

