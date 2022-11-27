import { Login } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { i18n } from '../../../features/i18n';
import { useAppSelector } from '../../../store/hooks';

function BtnLogIn() {
  const { lang } = useAppSelector((state) => state.lang);

  return (
    <>
      <Login fontSize="large" />
      <NavLink to="/signin">
        <Button variant="text" sx={{ color: 'white', fontSize: '1.3rem', fontWeight: '400' }}>
          {i18n[lang].signIn}
        </Button>
      </NavLink>
    </>
  );
}

export default BtnLogIn;
