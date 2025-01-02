import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/outline";
import { auth } from "~/auth";
import { redirect } from "next/navigation";
import { getPendingShipments } from "~/server/db/actions";
import { columns } from "~/app/ui/admin/pendingsTable/columns";
import { PendingsTable } from "~/app/ui/admin/pendingsTable/data-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader, 
  CardTitle,
} from "~/components/ui/card";
import { Summary } from "~/app/ui/admin/SummaryTable";

export default async function Page() {
  const session = await auth();
  if (!session) return redirect("/");
  const pending = await getPendingShipments();

  return (
    <main>
      <div className="m-28 mt-16 grid gap-3 lg:grid-cols-4">
        <div>
          <h2 className="scroll-m-20  pb-2 text-3xl font-semibold tracking-tight ">
            Tables
          </h2>
          <Card >
            <CardContent>
              <Link
                href="/dashboard/admin/createShipmentNotice"
                className="flex h-10 m-5 items-center rounded-lg bg-red-600 px-4 text-sm font-medium text-white transition-colors hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                <span>Create Shipment Notice</span>{" "}
                <PlusIcon className="h-5 md:ml-4" />
              </Link>
              <Link
                href="/dashboard/admin/ShipmentNoticeTable"
                className="flex h-10 m-5 items-center rounded-lg bg-red-600 px-4 text-sm font-medium text-white transition-colors hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                <span>Shipment Notice Table</span>{" "}
              </Link>
              <Link
                href="/dashboard/admin/UsersTable"
                className="flex h-10 m-5 items-center rounded-lg bg-red-600 px-4 text-sm font-medium text-white transition-colors hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                <span>Users Table</span>{" "}
              </Link>
              <Link
                href="/dashboard/admin/ShipmentsTable"
                className="flex h-10 m-5 items-center rounded-lg bg-red-600 px-4 text-sm font-medium text-white transition-colors hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                <span >Shipments Table</span>{" "}
              </Link>

            </CardContent>
          </Card>
        </div>

        <div className="col-span-3">
          <PendingsTable columns={columns} data={pending} />
        </div>
        {pending.map((pending) => {
          if(pending.goods) {
          const goods = pending.goods as string
          return (
            <div key={pending.id} className="mt-8 col-span-2">
              <Summary id={pending.id} items={goods} cost={pending.cost} shipment={pending} />
            </div>
          );
        }
        })}

      </div>
    </main>
  );
}
