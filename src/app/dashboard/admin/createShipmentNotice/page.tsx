import { NoticeForm } from "~/app/ui/admin/create/NoticeForm"
import {auth} from "~/auth"
import {redirect} from "next/navigation";

export default async function CreateNotice() {
  const session = await auth();
  if (!session) return redirect("/");

  return (
    <div className="grid lg:grid-cols-1 gap-8 mt-16 m-28" >
      <NoticeForm/>
    </div>
  );
}
