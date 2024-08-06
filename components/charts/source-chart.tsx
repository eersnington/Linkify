'use client';

import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, XAxis, YAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartData = [
  { source: 'TIKTOK', count: 150, fill: 'hsl(var(--chart-1))' },
  { source: 'LINKEDIN', count: 100, fill: 'hsl(var(--chart-2))' },
  { source: 'INSTAGRAM', count: 80, fill: 'hsl(var(--chart-3))' },
  { source: 'YOUTUBE', count: 60, fill: 'hsl(var(--chart-4))' },
  { source: 'GOOGLE', count: 40, fill: 'hsl(var(--chart-5))' },
  { source: 'FRIEND', count: 20, fill: 'hsl(var(--chart-6))' },
];

const chartConfig = {
  count: { label: 'Count' },
  ...Object.fromEntries(
    chartData.map(({ source }) => [
      source,
      { label: source, color: 'hsl(var(--chart-1))' },
    ])
  ),
} satisfies ChartConfig;

export function SourceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Sources</CardTitle>
        <CardDescription>Distribution of user sources</CardDescription>
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
              dataKey="source"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <XAxis dataKey="count" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          TikTok is the top source this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing distribution of user sources
        </div>
      </CardFooter>
    </Card>
  );
}
