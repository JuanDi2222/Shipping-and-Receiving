

import {AreaChartHome} from "~/app/ui/Home/AreaChart";
import {BarChartHome} from "~/app/ui/Home/BarChart";
import {DonutChartHome} from "~/app/ui/Home/DonutChart";
import {auth} from "~/auth"
import {redirect} from "next/navigation";
import { getDonutShart, getAreaShart, getBarChart, getUsers } from "~/server/db/actions";
import Layout from "~/app/dashboard/layout";


export default async function Page() {
  
  const session = await auth();
  if (!session) {
    redirect("/");
    return;
  }
  if (!session.user) {
    redirect("/");
    return;
  }
  const users = await getUsers(session.user.id);
  const isProfileIncomplete = !users[0]?.phone || !users[0]?.department
  
  
  const donutData = await getDonutShart();
  const areaData = await getAreaShart();
  const barData = await getBarChart();

  return (
    <Layout isProfileIncomplete={isProfileIncomplete}>
      
    <main>
      <div className="grid lg:grid-cols-2 gap-8 mt-16 m-28" >
        <DonutChartHome donutData={donutData}></DonutChartHome>
        <AreaChartHome areaData={areaData}></AreaChartHome>
        <BarChartHome barData={barData}></BarChartHome>
      </div>
    </main>
    </Layout>
  );
}
