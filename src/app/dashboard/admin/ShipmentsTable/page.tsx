import { auth } from "~/auth";
import { redirect } from "next/navigation";
import { getAllUsers, getShipments } from "~/server/db/actions";

import { ShipmentsTable } from "~/app/ui/admin/shipmentsTable/data-table";
import {columns, shipment} from "~/app/ui/admin/shipmentsTable/columns";

export default async function Page() {
    const session = await auth();
    const shipments = await getShipments();
    if (!session) return redirect("/");
    return (
        <main>
        <div className="m-14 mt-16 grid gap-8 lg:grid-cols-1">
            <ShipmentsTable
                columns={columns}
                data={shipments}
            />
        </div>
    </main>
    );
}