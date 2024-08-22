import { auth } from "~/auth";
import { redirect } from "next/navigation";
import { getAllUsers } from "~/server/db/actions";
import { DataTable } from "~/app/ui/admin/UsersTable/data-table";
import {columns, User} from "~/app/ui/admin/UsersTable/columns";

export default async function Page() {
    const users = await getAllUsers();
    const session = await auth();
    if (!session) return redirect("/");

    return (
        <main>
        <div className="m-14 mt-16 grid gap-8 lg:grid-cols-1">
            <DataTable
                columns={columns}
                data={users}
            />
        </div>
    </main>
    );
}