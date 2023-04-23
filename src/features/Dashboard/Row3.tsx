import { DashboardBox } from "@/common/DashboardBox.tsx";
import BoxHeader from "@/common/BoxHeader.tsx";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { products, transactions } from "@/app/store.ts";

export const Row3 = () => {
  const { palette } = useTheme();

  const data = products;

  const transactionsData = transactions;

  const productColumns = [
    {
      field: "id",
      headerName: "id",
      flex: 1,
    },
    {
      field: "expense",
      headerName: "Expense",
      flex: 0.5,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.5,
    },
  ];

  const transactionsColumns = [
    {
      field: "id",
      headerName: "id",
      flex: 1,
    },
    {
      field: "buyer",
      headerName: "Buyer",
      flex: 0.67,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 0.35,
    },
  ];

  return (
    <>
      <DashboardBox gridArea="g">
        <BoxHeader title="Список продуктов" sideText={`${data?.length}`} />
        <Box
          mt="0.5rem"
          p="0 0.05rem"
          height="75%"
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnHeader": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={data || []}
            columns={productColumns}
          />
        </Box>
      </DashboardBox>
      <DashboardBox gridArea="h">
        <BoxHeader
          title="Последние сделки"
          sideText={`${transactionsData?.length} последних транзакций`}
        />
        <Box
          mt="1rem"
          p="0 0.05rem"
          height="80%"
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnHeader": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={transactionsData || []}
            columns={transactionsColumns}
          />
        </Box>
      </DashboardBox>
      <DashboardBox gridArea="j">
        <BoxHeader title="Общие данные" sideText="4%" />
        <Box
          height="15px"
          margin="1.25rem 1rem 0.4rem 1rem"
          bgcolor={palette.primary[800]}
        >
          <Box
            height="15px"
            bgcolor={palette.primary[600]}
            borderRadius="1rem"
            width="40%"
          ></Box>
        </Box>
        <Typography margin="0 1rem" variant="h6">
          В прошлом году наша компания продемонстрировала отличные финансовые
          результаты, заработав более $5 миллионов долларов чистой прибыли. Это
          было на 15% больше, чем в предыдущем году, что свидетельствует о
          стабильном росте нашего бизнеса. Мы также увеличили наш оборот на 10%,
          достигнув впечатляющей отметки в $50 миллионов долларов. Эти
          результаты были достигнуты благодаря эффективной работе нашей команды
          и стратегии, ориентированной на рост и развитие. В текущем году мы
          планируем продолжать нашу успешную работу и увеличить наши доходы на
          еще 20%, что поможет нам укрепить нашу позицию на рынке.
        </Typography>
      </DashboardBox>
    </>
  );
};
