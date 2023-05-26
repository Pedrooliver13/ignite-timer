// Packages
import { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';

// Components
import { Header } from 'components/core';

// Styles
import * as Styled from './styles';

export const DefaultLayout = (): ReactElement => {
  return (
    <Styled.LayoutContainer>
      <Header />
      <Outlet />
    </Styled.LayoutContainer>
  );
};
