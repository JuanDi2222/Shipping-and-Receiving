
import  { ShipmentForm }  from "~/app/ui/export/createShipment/shipmentForm"
import {auth} from "~/auth"
import {redirect} from "next/navigation";

export default async function CreatePage() {

  const session = await auth();
  if (!session) return redirect("/");
  return (
    <div className="grid lg:grid-cols-1 gap-8 mt-16 m-28">
      
      <ShipmentForm />
    </div>
  );
}