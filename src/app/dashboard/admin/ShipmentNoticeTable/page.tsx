import { auth } from "~/auth";
import { redirect } from "next/navigation";
import { getShipmentNotices } from "~/server/db/actions";
import { columns, ShipmentNotice } from "~/app/ui/admin/columns";
import { DataTable } from "~/app/ui/admin/data-table";


export default async function Page() {
    const notices = await getShipmentNotices();
    const session = await auth();
    if (!session) return redirect("/");
  return (
    <main>
        <div className="m-14 mt-16 grid gap-8 lg:grid-cols-1">
            <DataTable
                columns={columns}
                data={notices}
            />
        </div>
    </main>
  );
}
