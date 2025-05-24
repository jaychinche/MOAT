import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import type { ThemeOptions } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import { inputsCustomizations } from "./customizations/inputs";
import { dataDisplayCustomizations } from "./customizations/dataDisplay";
import { feedbackCustomizations } from "./customizations/feedback";
import { navigationCustomizations } from "./customizations/navigation";
import { surfacesCustomizations } from "./customizations/surfaces";
import { colorSchemes, typography, shadows, shape } from "./themePrimitives";

interface AppThemeProps {
  children: React.ReactNode;
}

export default function AppTheme({ children }: AppThemeProps) {
  // Get the saved theme from localStorage, default to 'dark'
  const storedTheme = localStorage.getItem("theme") || "dark";
  const [mode, setMode] = React.useState<"light" | "dark">(
    storedTheme as "light" | "dark"
  );

  // Function to toggle the theme
  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("theme", newMode); // Save user preference
  };

  const theme = React.useMemo(
    () =>
      createTheme({
        cssVariables: {
          colorSchemeSelector: "data-mui-color-scheme",
          cssVarPrefix: "template",
        },
        palette: {
          mode, // Dynamic theme mode
        },
        colorSchemes,
        typography,
        shadows,
        shape,
        components: {
          ...inputsCustomizations,
          ...dataDisplayCustomizations,
          ...feedbackCustomizations,
          ...navigationCustomizations,
          ...surfacesCustomizations,
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
   
      {children}
    </ThemeProvider>
  );
}
