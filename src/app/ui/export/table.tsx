import Image from "next/image";
import Status from "~/app/ui/export/status";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";

type Shipment = {
  id: string;
  tracking: number;
  status: string;
  client: string;
  image_url: string;
  name: string;
  date: string;
};

async function fetchData(): Promise<Shipment[]> {
  return [
    {
      id: "728ed52f",
      tracking: 321321,
      status: "sent",
      client: "Stellantis",
      image_url: "/juan.jpg",
      name: "Juan",
      date: "2023-01-01",
    },
    {
      id: "728ed52g",
      tracking: 32124412,
      status: "pending",
      client: "Polaris",
      image_url: "/carlos.png",
      name: "Carlos",
      date: "2023-01-01",
    },
    {
      id: "728ed52n",
      tracking: 32124412,
      status: "delivered",
      client: "Polaris",
      image_url: "/carlos.png",
      name: "Carlos",
      date: "2022-01-03",
    },
    {
      id: "728ed52a",
      tracking: 32124412,
      status: "processing",
      client: "Polaris",
      image_url: "/carlos.png",
      name: "Carlos",
      date: "2024-02-01",
    },
  ];
}

export default async function Table() {
  const data = await fetchData();
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {data?.map((shipment) => (
              <div
                key={shipment.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={shipment.image_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${shipment.name}'s profile picture`}
                      />
                      <p>{shipment.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{shipment.client}</p>
                  </div>
                  <Status status={shipment.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">{shipment.tracking}</p>
                    <p className="text-sm text-gray-500">{shipment.date}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button className="rounded-md border p-2 hover:bg-gray-100">
                      <span className="sr-only">Edit</span>
                      <PencilIcon className="w-4" />
                    </button>
                    <button className="rounded-md border p-2 hover:bg-gray-100">
                      <span className="sr-only">Delete</span>
                      <TrashIcon className="w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Created by
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Client
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Tracking
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {data?.map((shipment) => (
                <tr
                  key={shipment.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={shipment.image_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${shipment.name}'s profile picture`}
                      />
                      <p>{shipment.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {shipment.client}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {shipment.tracking}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {shipment.date}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <Status status={shipment.status} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <button className="rounded-md border p-2 hover:bg-gray-100">
                        <span className="sr-only">Edit</span>
                        <PencilIcon className="w-4" />
                      </button>
                      <button className="rounded-md border p-2 hover:bg-gray-100">
                        <span className="sr-only">Delete</span>
                        <TrashIcon className="w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
