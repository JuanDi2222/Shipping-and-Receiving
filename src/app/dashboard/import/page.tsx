import { auth } from "~/auth";
import { redirect } from "next/navigation";
import {getUserImports} from "~/server/db/actions";
import { ImportUserTable } from "~/app/ui/import/data-table";
import { columns, port} from "~/app/ui/import/columns";


export default async function Page() {
  const session = await auth();
  if (!session) return redirect("/");  
  const ports = await getUserImports(session);


  return ( 
    <div className="h-full w-full">
     <ImportUserTable
     columns={columns}
     data={ports}/>
    </div>
  );
}
