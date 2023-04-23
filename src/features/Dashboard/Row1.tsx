import { DashboardBox } from "@/common/DashboardBox.tsx";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useMemo } from "react";
import { Month, monthlyData } from "@/app/store.ts";
import { useTheme } from "@mui/material";
import BoxHeader from "@/common/BoxHeader.tsx";

export const Row1 = () => {
  const data = monthlyData;
  const { palette } = useTheme();

  const revenueExpenses = useMemo(() => {
    return data.map(({ month, revenue, expenses }: Month) => {
      return {
        name: month.substring(0, 3),
        revenue: parseFloat(revenue.replace(/[$,]/g, "")),
        expenses: parseFloat(expenses.replace(/[$,]/g, "")),
      };
    });
  }, [data]);

  const revenueProfit = useMemo(() => {
    return data.map(({ month, revenue, expenses }: Month) => {
      return {
        name: month.substring(0, 3),
        revenue: parseFloat(revenue.replace(/[$,]/g, "")),
        profit: (
          parseFloat(revenue.replace(/[$,]/g, "")) -
          parseFloat(expenses.replace(/[$,]/g, ""))
        ).toFixed(2),
      };
    });
  }, [data]);

  const revenue = useMemo(() => {
    return data.map(({ month, revenue }: Month) => {
      return {
        name: month.substring(0, 3),
        revenue: parseFloat(revenue.replace(/[$,]/g, "")),
      };
    });
  }, [data]);

  return (
    <>
      <DashboardBox gridArea="a">
        <BoxHeader
          title="Затраты и доход"
          subtitle="Верхняя линия показывает показатель дохода, нижняя затрат"
          sideText="+4%"
        />
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={revenueExpenses}
            margin={{
              top: 15,
              right: 25,
              left: -10,
              bottom: 60,
            }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity="0.5"
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity="0"
                />
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity="0.5"
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity="0"
                />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              tickLine={false}
              axisLine={{ strokeWidth: "0" }}
              style={{ fontSize: "10px" }}
              domain={[8000, 23000]}
            />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="revenue"
              dot={true}
              stroke={palette.primary.main}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
            <Area
              type="monotone"
              dataKey="expenses"
              dot={true}
              stroke={palette.primary.main}
              fillOpacity={1}
              fill="url(#colorExpenses)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea="b">
        <BoxHeader
          title="Профит"
          subtitle="Здесь отображается Профит"
          sideText="+4%"
        />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={400}
            data={revenueProfit}
            margin={{
              top: 20,
              right: 0,
              left: -10,
              bottom: 60,
            }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="left"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            <Tooltip />
            <Legend
              height={20}
              wrapperStyle={{
                margin: "0 0 10px 0",
              }}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="profit"
              stroke={palette.tertiary[500]}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="revenue"
              stroke={palette.primary.main}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea="c">
        <BoxHeader
          title="Доход месяц за месяцем"
          subtitle="Борд показывает доход месяц за месяцем"
          sideText="+4%"
        />
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={revenue}
            margin={{
              top: 17,
              right: 15,
              left: -5,
              bottom: 58,
            }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity="0.8"
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity="0"
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <Tooltip />
            <Bar dataKey="revenue" fill="url(#colorRevenue)" />
          </BarChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};
