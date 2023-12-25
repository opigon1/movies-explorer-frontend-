import { Link } from 'react-router-dom';
import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';

function Main() {
  return (
    <>
      <Header locarion='locarion_lending'>
        <Navigation />
        <Link className='header__account' to='/profile'>
          Аккаунт
        </Link>
        <button className='header__burger' type='button'></button>
      </Header>
      <Promo />
      <main className='main'>
        <NavTab />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </main>
      <Footer />
    </>
  );
}

export default Main;
