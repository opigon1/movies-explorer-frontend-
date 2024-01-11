import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

function Header({ locarion, children, isLogged }) {
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
    </header>
  );
}

export default Header;
