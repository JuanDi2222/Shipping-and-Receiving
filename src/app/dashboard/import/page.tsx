import { auth } from "~/auth";
import { redirect } from "next/navigation";
import PDFView from "~/app/ui/admin/pdf";
import { useState, useEffect } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import { env } from "~/env.js";
import { shipment, columns } from "~/app/ui/export/createShipment/columns";
import { DataTable } from "~/app/ui/export/createShipment/data-table";
import { getUserShipments } from "~/server/db/actions";

let url = "https://api-eu.dhl.com/track/shipments?trackingNumber=9484349151";
let options = { method: "GET", headers: { "DHL-API-Key": env.DHL_API_KEY } };

const fetchData = async () => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

export default async function Page() {
  const session = await auth();
  if (!session) return redirect("/");

  const data = await fetchData();
  console.log(data);
  console.log(data.shipments[0].origin);
  console.log(data.shipments[0].destination);
  console.log(data.shipments[0].status);
  console.log(data.shipments[0].details);
  console.log(data.shipments[0].events);

  const ship = await getUserShipments();
 

  return (
    <div className="h-full w-full">
      <p>{JSON.stringify(data)}</p>
      <DataTable columns={columns} data={ship} />
    </div>
  );
}
