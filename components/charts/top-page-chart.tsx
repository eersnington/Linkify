"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartData = [
  { page: "/home", visits: 2750, fill: "hsl(var(--chart-1))" },
  { page: "/products", visits: 2000, fill: "hsl(var(--chart-2))" },
  { page: "/about", visits: 1870, fill: "hsl(var(--chart-3))" },
  { page: "/contact", visits: 1730, fill: "hsl(var(--chart-4))" },
  { page: "/blog", visits: 900, fill: "hsl(var(--chart-5))" },
]

const chartConfig = {
  visits: { label: "Visits" },
  ...Object.fromEntries(
    chartData.map(({ page }) => [page, { label: page, color: "hsl(var(--chart-1))" }])
  ),
} satisfies ChartConfig

export function TopPagesChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Pages</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{ left: 0 }}
          >
            <YAxis
              dataKey="page"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <XAxis dataKey="visits" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="visits" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing top pages by total visits
        </div>
      </CardFooter>
    </Card>
  )
}