'use client';

import { TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
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
import { format, subDays } from 'date-fns';

// Function to generate the last 7 days dynamically
const getLast7Days = () => {
  const today = new Date();
  return Array.from({ length: 7 }, (_, i) => {
    const date = subDays(today, i);
    return format(date, 'MMM dd'); // Abbreviated month and day
  }).reverse();
};

const chartData = getLast7Days().map((date, index) => ({
  day: date,
  pageViews: [154, 185, 191, 178, 247, 230, 340][index], // Example data; keep views the same
}));

const chartConfig = {
  pageViews: {
    label: 'Page Views',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export function PageViewsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Page Views Over the Last 7 Days</CardTitle>
        <CardDescription>
          Showing total page views for the last 7 days
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value} // Show full date
              interval={0} // Ensure all ticks are shown
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" hideLabel />}
            />
            <Area
              dataKey="pageViews"
              type="linear"
              fill="var(--color-pageViews)"
              fillOpacity={0.4}
              stroke="var(--color-pageViews)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Last 7 Days
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
