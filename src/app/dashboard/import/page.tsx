import { Shipment, columns } from "~/app/ui/import/columns";
import { DataTable } from "~/app/ui/import/data-table";

import {auth} from "~/auth"
import {redirect} from "next/navigation";
import  PDFView  from "~/app/ui/admin/pdf";
import { useState, useEffect } from "react";
import { PDFViewer} from "@react-pdf/renderer";




export default async function Page() {
  const session = await auth();
  if (!session) return redirect("/");

  const pepe = "Hola";

  return (
    <div className= "h-full w-full">
    
    </div>
  );
}
