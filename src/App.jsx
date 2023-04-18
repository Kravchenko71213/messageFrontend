import React, { useContext, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, NavLink } from 'react-router-dom';

import '@fortawesome/fontawesome-free/css/all.min.css';
import './styles.scss';
import Alert from '@mui/material/Alert';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import { AccountActivationPage } from './pages/AccountActivationPage';
import { AuthContext } from './components/AuthContext';
import { LoginPage } from './pages/LoginPage';
import { RegistrationPage } from './pages/RegistrationPage';
import { RequireAuth } from './components/RequireAuth';
import { UsersPage } from './pages/UsersPage';
import { Loader } from './components/Loader.jsx';
import { HomePage } from './pages/HomePage.jsx';
import { usePageError } from './hooks/usePageError.js';

function App() {
  const navigate = useNavigate();
  const [error, setError] = usePageError();
  const { isChecked, user, logout, checkAuth } = useContext(AuthContext);

  useEffect(() => {
    checkAuth();
  }, []);

  if (!isChecked) {
    return <Loader />
  }

  return <>
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
        </IconButton>
        <Typography variant="h6" component="div" sx={{ mr: 2 }}>
        <NavLink to="/" style={{color: 'white'}}>
          Home
        </NavLink>
        </Typography>
        <Typography variant="h6" component="div"  sx={{ flexGrow: 1 }}>
        <NavLink to="/users" style={{color: 'white'}}>
          Users
        </NavLink>
        </Typography>
        {user ? (
              <Button variant="outlined" size="small" style={{color: 'white'}}
                onClick={() => {
                  logout()
                    .then(() => {
                      navigate('/');
                    })
                    .catch((error) => {
                      setError(error.response?.data?.message);
                    });
                }}
              >
                Log out
              </Button>
            ) : (
              <>
                <Link to="/sign-up" style={{color: 'white'}} >
                  <Button variant="outlined" size="small" style={{color: 'white'}}>
                   Sign up
                  </Button>
                </Link>

                <Link to="/login" style={{color: 'white'}} >
                <Button variant="outlined" size="small" style={{color: 'white'}}>
                   Log in
                  </Button>
                </Link>
              </>
            )}
      </Toolbar>
    </AppBar>
  </Box>

    <main>
      <section className="section">
        <Routes>
          <Route
            path="/"
            element={<HomePage />}
          />
          <Route
            path="sign-up"
            element={<RegistrationPage />}
          />
          <Route
            path="activate/:activationToken"
            element={<AccountActivationPage />}
          />
          <Route
            path="login"
            element={<LoginPage />}
          />

          <Route path="/" element={<RequireAuth />}>
            <Route
              path="users"
              element={<UsersPage />}
            />
          </Route>
        </Routes>
      </section>

      {error && <Alert severity="error">{error}</Alert>}
    </main>
  </>
}

export default App;
