import React, { useEffect } from 'react';
import { AppBar, Button, Grid, Toolbar, Typography } from '@mui/material';
import { Home, Language, Menu, Task } from '@mui/icons-material';
import Switcher from './Menu/Switcher/Switcher';
import styles from './Header.module.scss';
import BtnLogIn from './Menu/BtnSignIn';
import BtnLogOut from './Menu/BtnSignOut';
import BtnProfile from './Menu/BtnProfile';
import BtnSignUp from './Menu/BtnSignUp';
import { Link, NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { i18n } from '../../features/i18n';
import { loadUser } from '../../store/user/thunks/loadUser.thunks';
import TemporaryDrawer from './Burger/Drawer';

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

  // const mainPageLink = () => {
  //   if (userToken) {
  //     return (
  //       <>
  //         <Home fontSize="large" />
  //         <NavLink to="/boards">
  //           <Button variant="text" sx={{ color: 'white', fontSize: '1.3rem', fontWeight: '400' }}>
  //             {i18n[lang].mainPage}
  //           </Button>
  //         </NavLink>
  //       </>
  //     );
  //   } else {
  //     return (
  //       <>
  //         <Task fontSize="large" />
  //         <Typography variant="h5">{i18n[lang].taskManager}</Typography>
  //       </>
  //     );
  //   }
  // };

  //const size = window.matchMedia('(max-width: 768px)');

  return (
    <AppBar className={styles.appbar}>
      <Toolbar className={styles.toolbar}>
        <div style={{ marginRight: 'auto' }}>
          <NavLink to="/">
            <Button variant="text" className={styles.btn}>
              <Home fontSize="large" sx={{ marginRight: '0.5rem' }} /> {i18n[lang].mainPage}
            </Button>
          </NavLink>
        </div>
        {userToken && (
          <>
            <NavLink to="/boards">
              <Button variant="text" className={styles.btn}>
                <Task fontSize="large" sx={{ marginRight: '0.5rem' }} />
                {i18n[lang].boards}
              </Button>
            </NavLink>
          </>
        )}
        <div className={styles.toolbarItem}>
          <Language fontSize="medium" />
          <Switcher />
        </div>
        <div className={styles.toolbarItem}>{!userToken ? <BtnLogIn /> : <BtnLogOut />}</div>
        <div className={styles.toolbarItem}>{!userToken ? <BtnSignUp /> : <BtnProfile />}</div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
