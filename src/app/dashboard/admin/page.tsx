import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/outline";
import { auth } from "~/auth";
import { redirect } from "next/navigation";
import { DataTable } from "~/app/ui/admin/data-table";
import { getShipmentNotices } from "~/server/db/actions";
import { columns, ShipmentNotice } from "~/app/ui/admin/columns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export default async function Page() {
  const notices = await getShipmentNotices();
  const session = await auth();
  if (!session) return redirect("/");

  return (
    <main>
      <div className="m-28 mt-16 grid gap-8 lg:grid-cols-2">
        <div >
        <Card >
          <CardHeader>
            <CardTitle>Tables</CardTitle>
            <CardDescription>List of tables:</CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              href="/dashboard/admin/createShipmentNotice"
              className="flex h-10 m-5 items-center rounded-lg bg-red-600 px-4 text-sm font-medium text-white transition-colors hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              <span className="hidden md:block">Create Shipment Notice</span>{" "}
              <PlusIcon className="h-5 md:ml-4" />
            </Link>
            <Link
              href="/dashboard/admin/ShipmentNoticeTable"
              className="flex h-10 m-5 items-center rounded-lg bg-red-600 px-4 text-sm font-medium text-white transition-colors hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              <span className="hidden md:block">Shipment Notice Table</span>{" "}
            </Link>
            <Link
              href="/dashboard/admin/UsersTable"
              className="flex h-10 m-5 items-center rounded-lg bg-red-600 px-4 text-sm font-medium text-white transition-colors hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              <span className="hidden md:block">Users Table</span>{" "}
            </Link>
            <Link
              href="/dashboard/admin/ShipmentsTable"
              className="flex h-10 m-5 items-center rounded-lg bg-red-600 px-4 text-sm font-medium text-white transition-colors hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              <span className="hidden md:block">Shipments Table</span>{" "}
            </Link>

          </CardContent>
        </Card>
        </div>
      </div>
    </main>
  );
}
