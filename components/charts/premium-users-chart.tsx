'use client';

import React, { useMemo } from 'react';
import { Pie, PieChart, Label } from 'recharts';
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
  premium: {
    label: 'Premium',
    color: 'hsl(var(--chart-6))',
  },
  nonPremium: {
    label: 'Non-Premium',
    color: 'hsl(var(--chart-7))',
  },
} satisfies ChartConfig;

export function PremiumUsersChart({ users }) {
  const chartData = useMemo(() => {
    const premiumUsers = users.filter(
      (user) => user.stripeSubscriptionId
    ).length;
    const nonPremiumUsers = users.length - premiumUsers;
    return [
      { name: 'Premium', value: premiumUsers, fill: chartConfig.premium.color },
      {
        name: 'Non-Premium',
        value: nonPremiumUsers,
        fill: chartConfig.nonPremium.color,
      },
    ];
  }, [users]);

  const totalUsers = users.length;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Premium vs Non-Premium Users</CardTitle>
        <CardDescription>Total Users: {totalUsers}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent />} />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalUsers.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total Users
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
