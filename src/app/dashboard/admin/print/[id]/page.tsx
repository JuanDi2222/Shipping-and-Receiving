import {auth} from "~/auth"
import {redirect} from "next/navigation";
import { PDFView } from "~/app/ui/admin/pdf";
import { getShipmentNotice } from "~/server/db/actions";


export default async function Page({ params }: { params: { id: number } }) {
  const notice = await getShipmentNotice(params.id);
  const session = await auth();
  
  
  return (
    <div className= "h-full w-full">
        <PDFView data={notice[0]}/>
    </div>
  );
}
