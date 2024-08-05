'use client';

import React, { useState, useMemo } from 'react';
import { TrendingUp } from 'lucide-react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { User } from '@prisma/client';

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

interface Props {
  users: User[];
}

type ChartDataPoint = {
  date: string;
  premium: number;
  nonPremium: number;
};

export function UserSignupsChart({ users }: Props) {
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d' | '6m'>(
    '30d'
  );

  const chartData = useMemo<ChartDataPoint[]>(() => {
    const now = new Date();
    let startDate = new Date(now);
    let interval: 'hour' | 'day' | 'month';

    switch (timeRange) {
      case '24h':
        startDate.setHours(now.getHours() - 24);
        interval = 'hour';
        break;
      case '7d':
        startDate.setDate(now.getDate() - 7);
        interval = 'day';
        break;
      case '30d':
        startDate.setDate(now.getDate() - 30);
        interval = 'day';
        break;
      case '6m':
        startDate.setMonth(now.getMonth() - 6);
        interval = 'month';
        break;
      default:
        startDate.setDate(now.getDate() - 30);
        interval = 'day';
    }

    const groupedData: Record<string, ChartDataPoint> = {};

    const formatDate = (
      date: Date,
      interval: 'hour' | 'day' | 'month'
    ): string => {
      if (interval === 'hour') {
        return date.toISOString().slice(0, 13) + ':00:00.000Z';
      } else if (interval === 'day') {
        return date.toISOString().split('T')[0];
      } else {
        return date.toISOString().slice(0, 7) + '-01';
      }
    };

    // Initialize all intervals with 0 count
    let current = new Date(startDate);
    while (current <= now) {
      const key = formatDate(current, interval);
      groupedData[key] = { date: key, premium: 0, nonPremium: 0 };
      if (interval === 'hour') {
        current.setHours(current.getHours() + 1);
      } else if (interval === 'day') {
        current.setDate(current.getDate() + 1);
      } else {
        current.setMonth(current.getMonth() + 1);
      }
    }

    // Count signups
    users.forEach((user) => {
      const signupDate = new Date(user.createdAt);
      if (signupDate >= startDate) {
        const key = formatDate(signupDate, interval);
        if (groupedData[key]) {
          if (user.stripeSubscriptionId) {
            groupedData[key].premium++;
          } else {
            groupedData[key].nonPremium++;
          }
        }
      }
    });

    return Object.values(groupedData).sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }, [users, timeRange]);

  const totalSignups = chartData.reduce(
    (sum, data) => sum + data.premium + data.nonPremium,
    0
  );

  const getSignupsForPeriod = (start: number, end?: number) =>
    chartData
      .slice(start, end)
      .reduce((sum, data) => sum + data.premium + data.nonPremium, 0);

  const lastMonthSignups = getSignupsForPeriod(-30);
  const previousMonthSignups = getSignupsForPeriod(-60, -30);

  const growthRate =
    previousMonthSignups !== 0
      ? ((lastMonthSignups - previousMonthSignups) / previousMonthSignups) * 100
      : lastMonthSignups > 0
        ? 100
        : 0;

  const formatXAxis = (tickItem: string) => {
    const date = new Date(tickItem);
    switch (timeRange) {
      case '24h':
        return date.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });
      case '7d':
      case '30d':
        return date.toLocaleDateString([], {
          month: 'short',
          day: 'numeric',
        });
      case '6m':
        return date.toLocaleDateString([], {
          month: 'short',
          year: 'numeric',
        });
      default:
        return tickItem;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Signups Chart</CardTitle>
        <CardDescription>
          Showing premium and non-premium signups over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          {/* @ts-ignore */}
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="6m">Last 6 months</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={chartData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={formatXAxis}
                interval="preserveStartEnd"
                minTickGap={30}
              />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="nonPremium"
                stackId="1"
                stroke="var(--color-nonPremium)"
                fill="var(--color-nonPremium)"
                fillOpacity={0.4}
              />
              <Area
                type="monotone"
                dataKey="premium"
                stackId="1"
                stroke="var(--color-premium)"
                fill="var(--color-premium)"
                fillOpacity={0.4}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              {growthRate !== 0 ? (
                <>
                  {growthRate > 0 ? 'Trending up' : 'Trending down'} by{' '}
                  {Math.abs(growthRate).toFixed(1)}% this month
                </>
              ) : (
                'No change in trend this month'
              )}
              <TrendingUp
                className={`h-4 w-4 ${
                  growthRate > 0
                    ? 'text-green-500'
                    : growthRate < 0
                      ? 'text-red-500'
                      : 'text-gray-500'
                }`}
              />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Total Signups: {totalSignups}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
