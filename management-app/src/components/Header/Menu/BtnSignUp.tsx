import { Airplay } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { i18n } from '../../../features/i18n';
import { useAppSelector } from '../../../store/hooks';

function BtnSignUp() {
  const { lang } = useAppSelector((state) => state.lang);

  return (
    <>
      <Airplay fontSize="large" />
      <NavLink to="/signup">
        <Button variant="text" sx={{ color: 'white', fontSize: '1.3rem', fontWeight: '400' }}>
          {i18n[lang].signUp}
        </Button>
      </NavLink>
    </>
  );
}

export default BtnSignUp;
