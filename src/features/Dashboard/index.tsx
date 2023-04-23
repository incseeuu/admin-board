import { Box, useMediaQuery } from "@mui/material";
import { Row1 } from "@/features/Dashboard/Row1.tsx";
import { Row2 } from "@/features/Dashboard/Row2.tsx";
import { Row3 } from "@/features/Dashboard/Row3.tsx";

const gridTemplate = `
  "a b c"
  "a b c"
  "a b c"
  "a b f"
  "d e f"
  "d e f"
  "d h j"
  "g h j"
  "g h j"
  "g h j"
`;

const gridTemplateSmallScreen = `
  "a"
  "a"
  "a"
  "a"
  "b"
  "b"
  "b"
  "b"
  "c"
  "c"
  "c"
  "d"
  "d"
  "d"
  "e"
  "e"
  "f"
  "f"
  "f"
  "g"
  "g"
  "g"
  "h"
  "h"
  "h"
  "h"
  "j"
  "j"
`;

type Props = {
  openFullSize: boolean;
};

const Dashboard = ({ openFullSize }: Props) => {
  const isMediumScreen = useMediaQuery("(min-width: 1200px)");

  return (
    <Box
      width="100%"
      height="100%"
      display="grid"
      gap="1.5rem"
      sx={
        isMediumScreen && !openFullSize
          ? {
              gridTemplateColumns: "repeat(3, minmax(370px, 1fr))",
              gridTemplateRows: "repeat(10, minmax(60px, 1fr))",
              gridTemplateAreas: gridTemplate,
            }
          : {
              gridAutoColumns: "1fr",
              gridAutoRows: "80px",
              gridTemplateAreas: gridTemplateSmallScreen,
            }
      }
    >
      <Row1 />
      <Row2 />
      <Row3 />
    </Box>
  );
};

export default Dashboard;
