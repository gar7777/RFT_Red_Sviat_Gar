import { Home, Task, Language } from '@mui/icons-material';
import { Button, Toolbar } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { i18n } from '../../../features/i18n';
import BtnProfile from '../Menu/BtnProfile';
import BtnLogIn from '../Menu/BtnSignIn';
import BtnLogOut from '../Menu/BtnSignOut';
import BtnSignUp from '../Menu/BtnSignUp';
import Switcher from '../Menu/Switcher/Switcher';
import styles from '../Header.module.scss';
import { useAppSelector } from '../../../store/hooks';

const UserToolbar = () => {
  const { userToken } = useAppSelector((state) => state.auth);
  const { lang } = useAppSelector((state) => state.lang);

  return (
    <Toolbar className={styles.toolbar}>
      <div className={styles.linkMain}>
        <NavLink to="/" className={styles.toolbarItem}>
          <Button variant="text" className={styles.btn}>
            <Home fontSize="large" className={styles.icon} /> {i18n[lang].mainPage}
          </Button>
        </NavLink>
      </div>
      {userToken && (
        <>
          <NavLink to="/boards" className={styles.toolbarItem}>
            <Button variant="text" className={styles.btn}>
              <Task fontSize="large" className={styles.icon} />
              {i18n[lang].boards}
            </Button>
          </NavLink>
        </>
      )}
      <div className={styles.toolbarItem}>
        <Switcher />
      </div>
      <div className={styles.toolbarItem}>{!userToken ? <BtnLogIn /> : <BtnLogOut />}</div>
      <div className={styles.toolbarItem}>{!userToken ? <BtnSignUp /> : <BtnProfile />}</div>
    </Toolbar>
  );
};

export default UserToolbar;
