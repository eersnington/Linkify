'use client';

import * as React from 'react';
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
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
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
import { getPageviews } from '@/actions/analytics-dashboard';

interface PageView {
  id: string;
  page: string;
  referrer: string;
  userAgent: string;
  country: string;
  timestamp: Date;
  websiteId: string;
}

const chartConfig: ChartConfig = {
  pageViews: {
    label: 'Page Views',
    color: 'hsl(var(--chart-2))',
  },
};

export function PageViewsChart({ path }: { path: string }) {
  const [timeRange, setTimeRange] = React.useState('1d');
  const [pageviewsData, setPageviewsData] = React.useState<
    Array<{ date: string; count: number }>
  >([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getPageviews({ path });
        const transformedData = transformData(data, timeRange);
        setPageviewsData(transformedData);
      } catch (err) {
        setError('Failed to fetch pageviews');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [path, timeRange]);

  const transformData = (
    data: PageView[],
    range: string
  ): Array<{ date: string; count: number }> => {
    const now = new Date();
    let startDate = new Date(now);
    let interval: 'hour' | 'day';

    switch (range) {
      case '1d':
        startDate.setHours(now.getHours() - 24);
        interval = 'hour';
        break;
      case '7d':
        startDate.setDate(now.getDate() - 7);
        interval = 'day';
        break;
      case '30d':
      default:
        startDate.setDate(now.getDate() - 30);
        interval = 'day';
        break;
    }

    const filteredData = data.filter(
      (item) => new Date(item.timestamp) >= startDate
    );

    const groupedData: { [key: string]: { date: string; count: number } } = {};

    // Initialize all intervals with 0 count
    let current = new Date(startDate);
    while (current <= now) {
      const key =
        interval === 'hour'
          ? current.toISOString().slice(0, 13) + ':00:00.000Z' // Add time component for hours
          : current.toISOString().split('T')[0];
      groupedData[key] = { date: key, count: 0 };
      if (interval === 'hour') {
        current.setHours(current.getHours() + 1);
      } else {
        current.setDate(current.getDate() + 1);
      }
    }

    // Count page views
    filteredData.forEach((item) => {
      const date = new Date(item.timestamp);
      const key =
        interval === 'hour'
          ? date.toISOString().slice(0, 13) + ':00:00.000Z' // Add time component for hours
          : date.toISOString().split('T')[0];
      if (groupedData[key]) {
        groupedData[key].count++;
      }
    });

    return Object.values(groupedData).sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  };

  const formatXAxis = (tickItem: string): string => {
    const date = new Date(tickItem);
    switch (timeRange) {
      case '1d':
        return date.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });
      case '7d':
      case '30d':
        return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
      default:
        return tickItem;
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching pageviews: {error}</p>;

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Page Views Chart</CardTitle>
          <CardDescription>Showing page views data</CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a time range"
          >
            <SelectValue placeholder="Last 30 days" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="1d" className="rounded-lg">
              Last 24 hours
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={pageviewsData}>
              <defs>
                <linearGradient id="fillPageViews" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-pageViews)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-pageViews)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={formatXAxis}
                interval="preserveStartEnd"
                minTickGap={30}
              />
              <YAxis />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) =>
                      new Date(value).toLocaleString([], {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    }
                  />
                }
              />

              <Area
                type="monotone"
                dataKey="count"
                stroke="var(--color-pageViews)"
                fillOpacity={1}
                fill="url(#fillPageViews)"
              />
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
