import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import { signout } from '../../utils/auth';
import { CurrentUserContext } from '../../context/currentUserContext';
import { mainApi } from '../../utils/MainApi';
import { CONFLICT, BAD_REQUEST } from '../../utils/constants';

function Profile({ onSignout, isLogged }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [editButton, setEditButton] = React.useState(true);
  const [submitButton, setSubmitButton] = React.useState(false);
  const [isValidButton, setIsValidButton] = React.useState(true);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const navigate = useNavigate();
  const currentUser = React.useContext(CurrentUserContext);

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      name: currentUser.data?.name,
      email: currentUser.data?.email,
    },
  });

  const {
    handleSubmit,
    register,
    watch,
    setError,
    formState: { errors, isValid },
  } = methods;

  const getTargetValue = React.useCallback((e) => {
    return e.target.value;
  });

  React.useEffect(() => {
    if (
      currentUser.data?.name === watch('name') &&
      currentUser.data?.email === watch('email')
    ) {
      setIsValidButton(false);
    } else setIsValidButton(true);
  }, [currentUser.data, watch, getTargetValue]);

  const changeEditButton = () => {
    setEditButton(false);
    setSubmitButton(true);
  };

  const onSubmit = (data) => {
    setIsLoading(true);
    mainApi
      .editUserInfo(data)
      .then(() => {
        mainApi.getUserInfo().then((res) => {
          currentUser.data.name = res.data?.name;
          currentUser.data.email = res.data?.email;
        });
        setEditButton(true);
        setSubmitButton(false);
        setIsValidButton(true);
        setIsSuccess(true);

        setTimeout(() => {
          setIsSuccess(false);
        }, 3000);
      })
      .catch((err) => {
        console.error('Error:', err);
        if (err === CONFLICT) {
          setError('root.serverError', {
            type: err,
          });
        }
        if (err === BAD_REQUEST) {
          setError('root.serverError', {
            type: err,
          });
        }
        setIsValidButton(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSignout = () => {
    signout()
      .then(() => {
        onSignout();
        navigate('/');
        localStorage.clear();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Header locarion={'location_movies'} isLogged={isLogged}>
        <Navigation location={'location_movies'} isLogged={isLogged} />
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
              {errors?.root?.serverError?.type === CONFLICT &&
                'Пользователь с таким email уже существует.'}
              {errors?.root?.serverError?.type === BAD_REQUEST &&
                'При обновлении профиля произошла ошибка.'}
            </span>
            {isSuccess && <p className='profile-page__success'>Успешно!</p>}
            <button
              className={
                editButton
                  ? 'profile-page__submit-btn'
                  : 'profile-page__submit-btn profile-page__submit-btn_type_active'
              }
              type='button'
              onClick={handleSubmit(onSubmit)}
              disabled={!isValidButton || !isValid || isLoading}
            >
              {isLoading ? 'Сохранение...' : 'Сохранить'}
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
