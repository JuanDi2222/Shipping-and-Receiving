import { Shipment, columns } from "~/app/ui/import/columns";
import { DataTable } from "~/app/ui/import/data-table";

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
  ];
}

export default async function Page() {
  const data = await getData();
  return (
    <>
      <div></div>

      <div className="m-28 mt-16 grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Shipments
          </h2>
          <DataTable columns={columns} data={data} />
        </div>
        <div>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Mail
          </h2>
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </>
  );
}
