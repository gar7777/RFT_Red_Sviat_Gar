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
      <NavLink to="/signin">
        <Button variant="text" sx={{ color: 'white', fontSize: '1.3rem', fontWeight: '400' }}>
          <Login fontSize="large" sx={{ marginRight: '0.5rem' }} />
          {i18n[lang].signIn}
        </Button>
      </NavLink>
    </>
  );
}

export default BtnLogIn;
