'use client';

import React, { useMemo } from 'react';
import { Pie, PieChart } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartConfig = {
  published: {
    label: 'Published',
    color: 'hsl(var(--chart-6))',
  },
  notPublished: {
    label: 'Not Published',
    color: 'hsl(var(--chart-7))',
  },
} satisfies ChartConfig;

export function WebsitePublicationChart({ users }) {
  const chartData = useMemo(() => {
    const publishedWebsites = users.filter((user) => user.website).length;
    const notPublishedWebsites = users.length - publishedWebsites;
    return [
      {
        name: 'Published',
        value: publishedWebsites,
        fill: 'hsl(var(--chart-6))',
      },
      {
        name: 'Not Published',
        value: notPublishedWebsites,
        fill: 'hsl(var(--chart-7))',
      },
    ];
  }, [users]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Website Publication Status</CardTitle>
        <CardDescription>Published vs Not Published</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
