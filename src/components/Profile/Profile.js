import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';

function Profile() {
  return (
    <>
      <Header locarion={'location_movies'}>
        <Navigation location={'location_movies'} />
        <Link
          className='header__account header__account_location_movies'
          to='/profile'
        >
          Аккаунт
        </Link>
        <button
          className='header__burger header__burger_type_dark'
          type='button'
        ></button>
      </Header>
      <main className='profile-page'>
        <h1 className='profile-page__title'>Привет, Степан!</h1>
        <div className='profile-page__name-section'>
          <p className='profile-page__name'>Имя</p>
          <p className='profile-page__username'>Степан</p>
        </div>
        <div className='profile-page__email-section'>
          <p className='profile-page__email'>E-mail</p>
          <p className='profile-page__user-email'>step.rindin@yandex.ru</p>
        </div>
        <button className='profile-page__edit-btn'>Редактировать</button>
        <Link to='/signin' className='profile-page__exit-btn'>
          Выйти из аккаунта
        </Link>
      </main>
    </>
  );
}

export default Profile;
