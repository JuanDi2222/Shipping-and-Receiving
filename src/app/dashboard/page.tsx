

import {AreaChartHome} from "~/app/ui/Home/AreaChart";
import {BarChartHome} from "~/app/ui/Home/BarChart";
import {DonutChartHome} from "~/app/ui/Home/DonutChart";
import {auth} from "~/auth"
import {redirect} from "next/navigation";




export default async function Page() {
  
  const session = await auth();
  if (!session) return redirect("/");


  return (
    <main>
      <div className="grid lg:grid-cols-2 gap-8 mt-16 m-28" >
      </div>
    </main>
  );
}
