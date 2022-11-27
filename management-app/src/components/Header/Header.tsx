import React, { useEffect } from 'react';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { Home, Language, Task } from '@mui/icons-material';
import Menu from './Menu/Switcher/Switcher';
import styles from './Header.module.scss';
import BtnLogIn from './Menu/BtnSignIn';
import BtnLogOut from './Menu/BtnSignOut';
import BtnProfile from './Menu/BtnProfile';
import BtnSignUp from './Menu/BtnSignUp';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { i18n } from '../../features/i18n';
import { loadUser } from '../../store/user/thunks/loadUser.thunks';

function Header() {
  const { lang } = useAppSelector((state) => state.lang);
  const { userToken } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const setUser = async () => {
    await dispatch(loadUser());
  };

  useEffect(() => {
    if (userToken) {
      setUser();
    }
  }, []);

  const mainPageLink = () => {
    if (userToken) {
      return (
        <>
          <Home fontSize="large" />
          <NavLink to="/boards">
            <Button variant="text" sx={{ color: 'white', fontSize: '1.3rem', fontWeight: '400' }}>
              {i18n[lang].mainPage}
            </Button>
          </NavLink>
        </>
      );
    } else {
      return (
        <>
          <Task fontSize="large" />
          <Typography variant="h5">{i18n[lang].taskManager}</Typography>
        </>
      );
    }
  };

  return (
    <AppBar className={styles.appbar} position="sticky">
      <Toolbar className={styles.toolbar}>
        <div className={styles.toolbarItem}>{mainPageLink()}</div>
        <div className={styles.toolbarItem} style={{ marginLeft: 'auto' }}>
          <Language fontSize="large" />
          <Menu />
        </div>
        <div className={styles.toolbarItem}>{!userToken ? <BtnLogIn /> : <BtnLogOut />}</div>
        <div className={styles.toolbarItem}>{!userToken ? <BtnSignUp /> : <BtnProfile />}</div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
