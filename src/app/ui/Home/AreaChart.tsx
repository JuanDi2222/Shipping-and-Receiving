import { AreaChart } from '@tremor/react';

const tempData = [
  {
    date: 'January',
    active: 50
  },
  {
    date: 'February',
    active: 75
  },
  {
    date: 'March',
    active: 100
  },
  {
    date: 'April',
    active: 75
  },                  
  {
    date: 'May',
    active: 50
  },
  {
    date: 'June',
    active: 75
  },
  {
    date: 'July',
    active: 100
  },
  {
    date: 'August',
    active: 75
  },
  {
    date: 'September',
    active: 50
  },                  
  {
    date: 'October',
    active: 75
  },
  {
    date: 'November',
    active: 100
  },
  {
    date: 'December',
    active: 75
  }
];


export default function AreaChartHome() {
  return (
    
    <AreaChart
    className="h-80 w-full pr-5"
    data={tempData}
    index="date"
    categories={["active"]}
    colors={["red"]}
    showAnimation={true}
    yAxisWidth={60}
    intervalType="month"
    />
  );
}
