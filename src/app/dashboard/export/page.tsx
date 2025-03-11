
import Search from "~/app/ui/export/search";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/outline";
import {auth} from "~/auth"
import {redirect} from "next/navigation";
import { getUserShipments, getUserMails } from "~/server/db/actions";
import { DataTable } from "~/app/ui/export/createShipment/data-table";
import { shipment, columns } from "~/app/ui/export/createShipment/columns";


export default async function Page() {
  const session = await auth();
  if (!session) return redirect("/");
  
  const data = await getUserShipments(session);
  const mails = await getUserMails(session);

  return (
    <>
      <div className="m-28 mt-16 grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Shipments
          </h2>
          <DataTable columns={columns} data={data} link="Shipment" />
        </div>
        <div>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Mail
          </h2>
          <DataTable columns={columns} data={mails} link="Mail" />
        </div>
      </div>
    </>
  );
}
