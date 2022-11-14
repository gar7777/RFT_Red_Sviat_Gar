import React from 'react';
import { AppBar, Button, Toolbar } from '@mui/material';
import { Home, Language } from '@mui/icons-material';
import Menu from './Menu/Menu';
import styles from './Header.module.scss';
import BtnLogIn from './Menu/BtnLogIn';
import BtnLogOut from './Menu/BtnLogOut';
import BtnProfile from './Menu/BtnProfile';
import BtnSignUp from './Menu/BtnSignUp';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';

function Header() {
  const { userToken } = useAppSelector((state) => state.auth);

  return (
    <AppBar className={styles.appbar} position="sticky">
      <Toolbar className={styles.toolbar}>
        <div className={styles.toolbarItem}>
          <Home fontSize="large" />
          <NavLink to="/boards">
            <Button variant="text" sx={{ color: 'white', fontSize: '1.3rem', fontWeight: '400' }}>
              ГЛАВНАЯ
            </Button>
          </NavLink>
        </div>
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
