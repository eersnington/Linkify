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
  withDomain: {
    label: 'With Domain',
    color: 'hsl(var(--chart-6))',
  },
  withoutDomain: {
    label: 'Without Domain',
    color: 'hsl(var(--chart-7))',
  },
} satisfies ChartConfig;

export function PremiumUsersDomainChart({ users }) {
  const chartData = useMemo(() => {
    const premiumUsers = users.filter((user) => user.stripeSubscriptionId);
    const withDomain = premiumUsers.filter((user) => user.domain).length;
    const withoutDomain = premiumUsers.length - withDomain;
    return [
      {
        name: 'With Domain',
        value: withDomain,
        fill: 'hsl(var(--chart-6))',
      },
      {
        name: 'Without Domain',
        value: withoutDomain,
        fill: 'hsl(var(--chart-7))',
      },
    ];
  }, [users]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Premium Users Domain Status</CardTitle>
        <CardDescription>With Domain vs Without Domain</CardDescription>
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
