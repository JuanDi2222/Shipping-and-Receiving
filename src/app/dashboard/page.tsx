// Page.tsx (Authenticated Page)
import { AreaChartHome } from "~/app/ui/Home/AreaChart";
import { BarChartHome } from "~/app/ui/Home/BarChart";
import { DonutChartHome } from "~/app/ui/Home/DonutChart";
import { auth } from "~/auth";
import { getDonutShart, getAreaShart, getBarChart, getUsers } from "~/server/db/actions";

export default async function Page() {
    const session = await auth();

    const users = await getUsers(session?.user?.id);
    const isProfileIncomplete = !users[0]?.phone || !users[0]?.department;

    const donutData = await getDonutShart();
    const areaData = await getAreaShart();
    const barData = await getBarChart();

    return (
            <main>
                <div className="grid lg:grid-cols-2 gap-8 mt-16 m-28">
                    <DonutChartHome donutData={donutData}></DonutChartHome>
                    <AreaChartHome areaData={areaData}></AreaChartHome>
                    <BarChartHome barData={barData}></BarChartHome>
                </div>
            </main>
    );
}
