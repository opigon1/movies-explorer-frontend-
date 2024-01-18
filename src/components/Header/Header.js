import React from 'react';
import logo from '../../images/logo.svg';
import { Link, useLocation } from 'react-router-dom';
import Burger from '../Burger/Burger';

function Header({ locarion, children, isLogged }) {
  const [burgerVisible, setBurgerVisible] = React.useState(false);
  const location = useLocation();
  const mainLocatiom = location.pathname === '/';

  return (
    <header className={`header header_` + locarion}>
      <div
        className={`header__content ${
          !isLogged ? 'header__content_type_unauthorized' : ''
        }`}
      >
        <Link to='/'>
          <img src={logo} className='header__logo' alt='Логотип' />
        </Link>

        {children}
      </div>
      <button
        className={
          mainLocatiom
            ? 'header__burger header__burger_type_light'
            : 'header__burger'
        }
        type='button'
        onClick={() => setBurgerVisible(!burgerVisible)}
      ></button>
      <Burger
        burgerVisible={burgerVisible}
        setBurgerVisible={setBurgerVisible}
      />
    </header>
  );
}

export default Header;
