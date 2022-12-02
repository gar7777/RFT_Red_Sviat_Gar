import { Login } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { i18n } from '../../../features/i18n';
import { useAppSelector } from '../../../store/hooks';
import styles from '../Header.module.scss';

function BtnLogIn() {
  const { lang } = useAppSelector((state) => state.lang);

  return (
    <>
      <NavLink to="/signin">
        <Button variant="text" className={styles.btn}>
          <Login fontSize="large" sx={{ marginRight: '0.5rem' }} />
          {i18n[lang].signIn}
        </Button>
      </NavLink>
    </>
  );
}

export default BtnLogIn;
