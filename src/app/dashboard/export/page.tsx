import { Shipment, columns } from "~/app/ui/import/columns";
import { DataTable } from "~/app/ui/import/data-table";
import Table from "~/app/ui/export/table";
import Search from "~/app/ui/export/search";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/outline";
import {auth} from "~/auth"
import {redirect} from "next/navigation";

async function getData(): Promise<Shipment[]> {
  return [
    {
      id: "728ed52f",
      tracking: 321321,
      status: "sent",
      client: "Stellantis",
      date: "2023-01-01",
    },
    {
      id: "728ed52g",
      tracking: 32124412,
      status: "pending",
      client: "Polaris",
      date: "2023-01-01",
    },
    {
      id: "728ed52n",
      tracking: 32124412,
      status: "delivered",
      client: "Polaris",
      date: "2022-01-03",
    },
    {
      id: "728ed52a",
      tracking: 32124412,
      status: "processing",
      client: "Polaris",
      date: "2024-02-01",
    },
    {
      id: "728ed52a",
      tracking: 32124412,
      status: "failed",
      client: "Polaris",
      date: "2024-02-01",
    },
  ];
}

export default async function Page() {
  const session = await auth();
  if (!session) return redirect("/");
  const data = await getData();
  return (
    <>
      <div></div>

      <div className="m-28 mt-16 grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Shipments
          </h2>
          <div className="mt-4 flex items-center p-11 justify-between ">
            <Search />
            <Link
              href="/dashboard/export/createShipment"
              className="flex h-10 items-center rounded-lg bg-red-600 px-4 text-sm font-medium text-white transition-colors hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              <span className="hidden md:block">Create Shipment</span>{" "}
              <PlusIcon className="h-5 md:ml-4" />
            </Link>
          </div>
          <DataTable columns={columns} data={data} />
        </div>
        <div>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Mail
          </h2>
          <div className="mt-4 flex items-center p-11 justify-between ">
            <Search />
            <Link
              href="/dashboard/export/createMail"
              className="flex h-10 items-center rounded-lg bg-red-600 px-4 text-sm font-medium text-white transition-colors hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              <span className="hidden md:block">Create Mail</span>{" "}
              <PlusIcon className="h-5 md:ml-4" />
            </Link>
          </div>
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </>
  );
}
