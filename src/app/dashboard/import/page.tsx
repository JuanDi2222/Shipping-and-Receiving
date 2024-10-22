import { auth } from "~/auth";
import { redirect } from "next/navigation";
import {getFedexTracking} from "~/server/db/actions";


export default async function Page() {
  const session = await auth();
  if (!session) return redirect("/");

 const data = await getFedexTracking("779158410161");
 console.log(data);
 console.log(data.output)
  return ( 
    <div className="h-full w-full">
      <p>{JSON.stringify(data)}</p>
    
    </div>
  );
}
