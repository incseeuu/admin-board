import { Box, Button, useMediaQuery, useTheme } from "@mui/material";
import { FlexBetween } from "@/common/FlexBetween.tsx";
import { useState } from "react";
import PixIcon from "@mui/icons-material/Pix";
import { Link } from "react-router-dom";

type Props = {
  openFullSize: boolean;
  openOnFullSizeCallBack: (openFullSize: boolean) => void;
};

const Navbar = ({ openOnFullSizeCallBack, openFullSize }: Props) => {
  const { palette } = useTheme();
  const [selected, setSelected] = useState("Dashboard");
  const isMediumScreen = useMediaQuery("(min-width: 1200px)");

  return (
    <FlexBetween mb="0.25rem" p="0.5rem 0rem" color={palette.grey[300]}>
      {/* LEFT SIDE */}
      <FlexBetween gap="0.75rem">
        <Button
          disabled={!isMediumScreen}
          variant="outlined"
          onClick={() => openOnFullSizeCallBack(!openFullSize)}
        >
          На весь экран
        </Button>
      </FlexBetween>

      {/* RIGHT SIDE */}
      <FlexBetween gap="2rem">
        <PixIcon sx={{ fontSize: "28px" }} />
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            to={"/"}
            onClick={() => setSelected("Dashboard")}
            style={{
              color: selected === "Dashboard" ? "inherit" : palette.grey[700],
              textDecoration: "inherit",
            }}
          >
            Dashboard
          </Link>
        </Box>
        <Box></Box>
      </FlexBetween>
    </FlexBetween>
  );
};

export default Navbar;
