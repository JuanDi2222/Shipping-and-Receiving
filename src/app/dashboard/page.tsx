

import {AreaChartHome} from "~/app/ui/Home/AreaChart";
import {BarChartHome} from "~/app/ui/Home/BarChart";
import {DonutChartHome} from "~/app/ui/Home/DonutChart";
import {auth} from "~/auth"
import {redirect} from "next/navigation";
import {getDonutShart, getAreaShart} from "~/server/db/actions";



export default async function Page() {
  
  const session = await auth();
  if (!session) return redirect("/");
  const Data = await getAreaShart();
  const hola = [ { month: 'September', count: 10 }, { month: 'October', count: 8 } ]
  console.log(Data)
  const donutData = await getDonutShart()

  return (
    <main>
      <div className="grid lg:grid-cols-2 gap-8 mt-16 m-28" >
          <DonutChartHome donutData={donutData}/>
          <BarChartHome></BarChartHome>
      </div>
    </main>
  );
}
