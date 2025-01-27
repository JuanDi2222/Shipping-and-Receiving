import { auth } from "~/auth";
import { redirect } from "next/navigation";
import {getFedexTracking} from "~/server/db/actions";


export default async function Page() {
  const session = await auth();
  if (!session) return redirect("/");  

 const data = await getFedexTracking("480258671-4");
 console.log(data);
 console.log(data.output)
 console.log(new Date(data?.output?.completeTrackResults?.[0]?.trackResults?.[0].standardTransitTimeWindow?.window?.ends))

  return ( 
    <div className="h-full w-full">
      <p>{JSON.stringify(data)}</p>
    
    </div>
  );
}
