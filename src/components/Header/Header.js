import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

function Header({ locarion, children }) {
  return (
    <header className={`header header_` + locarion}>
      <div className='header__content'>
        <Link to='/'>
          <img src={logo} className='header__logo' alt='Логотип'></img>
        </Link>
        {children}
      </div>
    </header>
  );
}

export default Header;
