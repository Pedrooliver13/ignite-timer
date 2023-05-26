// Packages
import { ReactElement } from 'react';
import { Timer as TimeIcon, Scroll as ScrollIcon } from 'phosphor-react';
import { NavLink } from 'react-router-dom';

// Assets
import LogoIgnite from 'assets/logo-ignite.svg';

// Styles
import { HeaderContainer } from './styles';

export const Header = (): ReactElement => {
  return (
    <HeaderContainer>
      <img src={LogoIgnite} alt="" />
      <nav>
        <NavLink to="/">
          <TimeIcon size={24} />
        </NavLink>
        <NavLink to="/history">
          <ScrollIcon size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  );
};
