import { useMemo, useState } from "react";
import { Box, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { themeSettings } from "@/assets/theme.ts";
import { HashRouter, Route, Routes } from "react-router-dom";
import Navbar from "@/features/Navbar";
import Dashboard from "@/features/Dashboard";

function App() {
  const [openFullSize, SetOpenFullSize] = useState(false);
  const theme = useMemo(() => createTheme(themeSettings), []);

  return (
    <HashRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem">
          <Navbar
            openOnFullSizeCallBack={SetOpenFullSize}
            openFullSize={openFullSize}
          />
          <Routes>
            <Route
              path="/"
              element={<Dashboard openFullSize={openFullSize} />}
            />
          </Routes>
        </Box>
      </ThemeProvider>
    </HashRouter>
  );
}

export default App;
