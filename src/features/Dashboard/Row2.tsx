import { DashboardBox } from "@/common/DashboardBox.tsx";
import BoxHeader from "@/common/BoxHeader.tsx";
import {
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";
import { Box, Typography, useTheme } from "@mui/material";
import { useMemo } from "react";
import { Month, monthlyData, products } from "@/app/store.ts";
import { FlexBetween } from "@/common/FlexBetween.tsx";

const piedata = [
  { name: "Group A", value: 600 },
  { name: "Group B", value: 400 },
];

export const Row2 = () => {
  const { palette } = useTheme();
  const pieColors = [palette.primary[800], palette.primary[300]];
  const data = monthlyData;

  const prod = products;

  const operationalExpenses = useMemo(() => {
    return data.map(
      ({ month, operationalExpenses, nonOperationalExpenses }: Month) => {
        return {
          name: month.substring(0, 3),
          "Operational Expenses": parseFloat(
            operationalExpenses.replace(/[$,]/g, "")
          ),
          "Non-Operational Expenses": parseFloat(
            nonOperationalExpenses.replace(/[$,]/g, "")
          ),
        };
      }
    );
  }, [data]);

  const productExpenseData = useMemo(() => {
    return prod.map(({ id, price, expense }) => {
      return {
        id: id,
        price: parseFloat(price.replace(/[$,]/g, "")),
        expense: parseFloat(expense.replace(/[$,]/g, "")),
      };
    });
  }, [prod]);

  return (
    <>
      <DashboardBox gridArea="d">
        <BoxHeader
          title="Затраты операционки и не операционки"
          subtitle="Здесь отображаются затраты"
          sideText="+4%"
        />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={operationalExpenses}
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
              orientation="left"
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
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="Non-Operational Expenses"
              stroke={palette.tertiary[500]}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="Operational Expenses"
              stroke={palette.primary.main}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea="e">
        <BoxHeader title="Кампании и цели" sideText="+4%" />
        <FlexBetween>
          <PieChart
            width={110}
            height={100}
            margin={{
              top: 0,
              right: -10,
              left: 10,
              bottom: 0,
            }}
          >
            <Pie
              stroke="none"
              data={piedata}
              innerRadius={18}
              outerRadius={38}
              paddingAngle={2}
              dataKey="value"
            >
              {piedata.map((_, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index]} />
              ))}
            </Pie>
          </PieChart>
          <Box ml="-0.7rem" flexBasis="40%" textAlign="center">
            <Typography variant="h5">Target Sales</Typography>
            <Typography m="0.3rem 0" variant="h3" color={palette.primary[300]}>
              75
            </Typography>
            <Typography variant="h6">
              Финансовые цели желаемой кампании
            </Typography>
          </Box>
          <Box flexBasis="40%">
            <Typography variant="h5">Потери в доходах</Typography>
            <Typography variant="h6">Потери упали на 30%</Typography>
            <Typography mt="0.4rem" variant="h5">
              Прибыль
            </Typography>
            <Typography variant="h6">
              Потери упали на 30% от последнего месяца
            </Typography>
          </Box>
        </FlexBetween>
      </DashboardBox>
      <DashboardBox gridArea="f">
        <BoxHeader title="Цены на продукты vs Потери" sideText="+4%" />
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{
              top: 20,
              right: 25,
              bottom: 40,
              left: -10,
            }}
          >
            <CartesianGrid stroke={palette.grey[800]} />
            <XAxis
              type="number"
              dataKey="price"
              name="price"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
              tickFormatter={(v) => `$${v}`}
            />
            <YAxis
              type="number"
              dataKey="expense"
              name="expense"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
              tickFormatter={(v) => `$${v}`}
            />
            <ZAxis type="number" range={[20]} />
            <Tooltip formatter={(v) => `$${v}`} />
            <Scatter
              name="Product Expense Ratio"
              data={productExpenseData}
              fill={palette.tertiary[500]}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};
