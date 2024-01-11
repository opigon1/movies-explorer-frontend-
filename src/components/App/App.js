import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import { checkToken } from '../../utils/auth';
import { CurrentUserContext } from '../../context/currentUserContext';
import { mainApi } from '../../utils/MainApi';

function App() {
  const [isLogged, setIsLogged] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const navigate = useNavigate();

  React.useEffect(() => {
    checkToken()
      .then(() => {
        setIsLogged(true);
        navigate('/');
      })
      .catch((err) => console.log(err));
  }, [isLogged]);

  React.useEffect(() => {
    if (isLogged) {
      mainApi.getUserInfo().then((res) => {
        setCurrentUser(res);
      });
    }
  }, [isLogged, navigate]);

  function handleLogin() {
    setIsLogged(true);
  }

  function handleExit() {
    setIsLogged(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path='/' element={<Main isLogged={isLogged} />} />
        <Route
          path='/movies'
          element={<ProtectedRoute element={Movies} isLogged={isLogged} />}
        />
        <Route
          path='/saved-movies'
          element={<ProtectedRoute element={SavedMovies} isLogged={isLogged} />}
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute
              element={Profile}
              onSignout={handleExit}
              isLogged={isLogged}
            />
          }
        />
        <Route path='/signin' element={<Login onLogin={handleLogin} />} />
        <Route path='/signup' element={<Register onLogin={handleLogin} />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
