import { Airplay } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';

function BtnSignUp() {
  return (
    <>
      <Airplay fontSize="large" />
      <NavLink to="/signup">
        <Button variant="text" sx={{ color: 'white', fontSize: '1.3rem', fontWeight: '400' }}>
          РЕГИСТРАЦИЯ
        </Button>
      </NavLink>
    </>
  );
}

export default BtnSignUp;
