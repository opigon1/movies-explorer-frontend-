import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import { signout } from '../../utils/auth';
import { CurrentUserContext } from '../../context/currentUserContext';
import { mainApi } from '../../utils/MainApi';

function Profile({ onSignout, isLogged }) {
  const [editButton, setEditButton] = React.useState(true);
  const [submitButton, setSubmitButton] = React.useState(false);
  const [isValidButton, setIsValidButton] = React.useState(true);
  const navigate = useNavigate();
  const currentUser = React.useContext(CurrentUserContext);

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      name: currentUser.data.name,
      email: currentUser.data.email,
    },
  });

  const {
    handleSubmit,
    register,
    watch,
    // setValue,
    setError,
    formState: { errors, isValid },
  } = methods;

  const getTargetValue = React.useCallback((e) => {
    return e.target.value;
  });

  React.useEffect(() => {
    if (
      currentUser.data.name === watch('name') &&
      currentUser.data.email === watch('email')
    ) {
      setIsValidButton(false);
    } else setIsValidButton(true);
  }, [currentUser.data, watch, getTargetValue]);

  // React.useEffect(() => {
  //   setValue('name', currentUser.data.name);
  //   setValue('email', currentUser.data.email);
  //   console.log(currentUser.data.name);
  // }, [currentUser, setValue]);

  const changeEditButton = () => {
    setEditButton(false);
    setSubmitButton(true);
  };

  const onSubmit = (data) => {
    mainApi
      .editUserInfo(data)
      .then(() => {
        mainApi.getUserInfo().then((res) => {
          currentUser.data.name = res.data.name;
          currentUser.data.email = res.data.email;
        });
        setEditButton(true);
        setSubmitButton(false);
        setIsValidButton(true);
      })
      .catch((err) => {
        console.error('Error:', err);
        if (err === 409) {
          setError('root.serverError', {
            type: err,
          });
        }
        if (err === 400) {
          setError('root.serverError', {
            type: err,
          });
        }
        setIsValidButton(false);
      });
  };

  const handleSignout = () => {
    signout()
      .then(() => {
        onSignout();
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Header locarion={'location_movies'} isLogged={isLogged}>
        <Navigation location={'location_movies'} isLogged={isLogged} />
        <button
          className='header__burger header__burger_type_dark'
          type='button'
        ></button>
      </Header>
      <main className='profile-page'>
        <h1 className='profile-page__title'>Привет, {watch('name')}!</h1>
        <FormProvider {...methods}>
          <form
            action='#'
            name='editProfile'
            noValidate
            onSubmit={(e) => e.preventDefault()}
          >
            <div className='profile-page__name-section'>
              <label className='profile-page__name'>Имя</label>
              <input
                className='profile-page__username'
                type='text'
                id='name'
                name='name'
                disabled={!submitButton}
                {...register('name')}
              />
            </div>
            <div className='profile-page__email-section'>
              <label className='profile-page__email'>E-mail</label>
              <input
                className='profile-page__user-email'
                type='email'
                id='email'
                name='email'
                disabled={!submitButton}
                {...register('email')}
              />
            </div>
            <span className='profile-page__error'>
              {errors?.root?.serverError?.type === 409 &&
                'Пользователь с таким email уже существует.'}
              {errors?.root?.serverError?.type === 400 &&
                'При обновлении профиля произошла ошибка.'}
            </span>

            <button
              className={
                editButton
                  ? 'profile-page__submit-btn'
                  : 'profile-page__submit-btn profile-page__submit-btn_type_active'
              }
              type='button'
              onClick={handleSubmit(onSubmit)}
              disabled={!isValidButton || !isValid}
            >
              Сохранить
            </button>
            <button
              className={
                submitButton
                  ? 'profile-page__edit-btn'
                  : 'profile-page__edit-btn profile-page__edit-btn_type_active'
              }
              onClick={changeEditButton}
            >
              Редактировать
            </button>
            <button
              className={
                submitButton
                  ? 'profile-page__exit-btn'
                  : 'profile-page__exit-btn profile-page__exit-btn_type_active'
              }
              onClick={handleSignout}
            >
              Выйти из аккаунта
            </button>
          </form>
        </FormProvider>
      </main>
    </>
  );
}

export default Profile;
