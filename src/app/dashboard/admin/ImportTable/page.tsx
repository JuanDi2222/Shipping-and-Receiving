import { auth } from "~/auth";
import { getImports, getNames } from "~/server/db/actions";

import { ImportTable } from "~/app/ui/admin/ImportsTable/data-table";
import {columns, port} from "~/app/ui/admin/ImportsTable/columns";

import { ImportForm } from "~/app/ui/admin/ImportsTable/registerImport";
import {redirect} from "next/navigation";

export default async function Page() {
    const session = await auth();
    const ports = await getImports();
    const names = await getNames()
    if (!session) return redirect("/");
    
    
    return (
        <main>
        <div className="m-14 mt-16 grid gap-8 lg:grid-cols-1">
            <ImportForm names={names} />
            <ImportTable
                columns={columns}
                data={ports}
            />
        </div>
    </main>
    );
}