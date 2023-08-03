// Packages
import { ReactElement } from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";

// Contexts
import { CycleProvider } from "contexts/useCycleContext";

// Routes
import { Router } from "./router";

// Styles
import { defaultTheme } from "./styles/theme/default";
import { GlobalStyle } from "./styles/global";

export const App = (): ReactElement => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CycleProvider>
          <Router />
        </CycleProvider>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  );
};
