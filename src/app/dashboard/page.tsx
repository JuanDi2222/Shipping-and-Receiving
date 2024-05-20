'use client'

import AreaChartHome from "~/app/ui/Home/AreaChart";
import BarChartHome from "~/app/ui/Home/BarChart";
import DonutChartHome from "~/app/ui/Home/DonutChart";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    const originalConsoleError = console.error;

    console.error = (...args: any[]) => {
      if (typeof args[0] === "string" && /defaultProps/.test(args[0])) {
        return;
      }

      originalConsoleError(...args);
    };

    return () => {
      console.error = originalConsoleError;
    };
  }, []);
  return (
    <main>
      <div className="grid lg:grid-cols-2 gap-8 mt-16 m-28" >
        <div className="flex flex-col items-start justify-center rounded border border-gray-200 w-full">
          <AreaChartHome />
        </div>
        <div className="flex flex-col items-start justify-center rounded border border-gray-200 w-full">
          <BarChartHome />
        </div>
        <div className="flex flex-col items-start justify-center rounded border border-gray-200 w-full">
          <DonutChartHome />
        </div>
      </div>
    </main>
  );
}
