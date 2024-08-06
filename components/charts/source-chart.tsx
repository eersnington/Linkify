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
import { Source } from '@prisma/client';

interface SourceChartProp {
  sources: Source[];
}

export function SourceChart({ sources }: SourceChartProp) {
  // Process the sources data
  const sourceCounts = sources.reduce(
    (acc, source) => {
      acc[source.source] = (acc[source.source] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const chartData = Object.entries(sourceCounts)
    .map(([source, count], index) => ({
      source,
      count,
      fill: `hsl(var(--chart-6`, // Cycle through 6 colors
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6); // Limit to top 6 sources

  const chartConfig: ChartConfig = {
    count: { label: 'Count' },
    ...Object.fromEntries(
      chartData.map(({ source, fill }) => [
        source,
        { label: source, color: fill },
      ])
    ),
  };

  const topSource = chartData[0]?.source || 'N/A';

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
      <CardFooter className="flex-col items-start gap-2 text-sm"></CardFooter>
    </Card>
  );
}
