import { NoticeForm } from "~/app/ui/admin/create/NoticeForm"

export default function CreateNotice() {
  return (
    <div className="grid lg:grid-cols-1 gap-8 mt-16 m-28" >
      <NoticeForm/>
    </div>
  );
}
