// Packages
import { ReactElement } from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';

// Routes
import { Router } from './router';

// Styles
import { defaultTheme } from './styles/theme/default';
import { GlobalStyle } from './styles/global';

export const App = (): ReactElement => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  );
};
