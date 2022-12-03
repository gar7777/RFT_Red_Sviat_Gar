import React, { ChangeEvent, useEffect } from 'react';
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
import useMediaQuery from '@mui/material/useMediaQuery';
import UserToolbar from './Toolbar/Toolbar';

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

  const matches = useMediaQuery('(max-width:768px)');

  const mainMenu = (match: boolean) => {
    return match ? <TemporaryDrawer /> : <UserToolbar />;
  };

  return <AppBar className={styles.appbar}>{mainMenu(matches)}</AppBar>;
}

export default Header;
