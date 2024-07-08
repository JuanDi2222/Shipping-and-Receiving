

import Table from "~/app/ui/export/table";
import Search from "~/app/ui/export/search";
import Link from "next/link";
import { PlusIcon } from '@heroicons/react/24/outline';


export default function Page() {
  return (
    <main>
      <div className="grid lg:grid-cols-1 gap-8 mt-16 m-28">
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search/>
        <Link
      href="/dashboard/export/create"
      className="flex h-10 items-center rounded-lg bg-red-600 px-4 text-sm font-medium text-white transition-colors hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
    >
      <span className="hidden md:block">Create Shipment</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
      </div>
        <Table />
      </div>
    </main>
  );
}