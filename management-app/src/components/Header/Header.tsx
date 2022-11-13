import React from 'react';
import { AppBar, Button, Toolbar } from '@mui/material';
import { Home, Language, Login, Logout } from '@mui/icons-material';
import Menu from './Menu/Menu';
import styles from './Header.module.scss';
import BtnLogIn from './Menu/BtnLogIn';
import BtnLogOut from './Menu/BtnLogOut';
import BtnProfile from './Menu/BtnProfile';
import BtnSignUp from './Menu/BtnSignUp';

function Header() {
  console.log(styles);
  const isAuthorized = false;
  return (
    <AppBar className={styles.appbar} position="sticky">
      <Toolbar className={styles.toolbar}>
        <div className={styles.toolbarItem}>
          <Home fontSize="large" />
          <Button variant="text" sx={{ color: 'white', fontSize: '1.3rem', fontWeight: '400' }}>
            ГЛАВНАЯ
          </Button>
        </div>
        <div className={styles.toolbarItem} style={{ marginLeft: 'auto' }}>
          <Language fontSize="large" />
          <Menu />
        </div>
        <div className={styles.toolbarItem}>{!isAuthorized ? <BtnLogIn /> : <BtnLogOut />}</div>
        <div className={styles.toolbarItem}>{!isAuthorized ? <BtnSignUp /> : <BtnProfile />}</div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
