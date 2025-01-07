"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart"

interface BarChartItem {
  month: string,
  cost: number
}

interface BarChartHomeProps {
  barData: BarChartItem[]
}

export const description = "Export cost"

const chartConfig = {
  desktop: {
    label: "cost",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function BarChartHome({barData}: BarChartHomeProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Export Customs Cost</CardTitle>
        <CardDescription>Showing customs total cost for the year</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={barData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="cost" fill="var(--color-cost)" stroke="var(--color-cost)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
