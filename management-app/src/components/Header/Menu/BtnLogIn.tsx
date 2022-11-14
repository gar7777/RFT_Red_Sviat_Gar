import { Login } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';

function BtnLogIn() {
  return (
    <>
      <Login fontSize="large" />
      <NavLink to="/signin">
        <Button variant="text" sx={{ color: 'white', fontSize: '1.3rem', fontWeight: '400' }}>
          ВОЙТИ
        </Button>
      </NavLink>
    </>
  );
}

export default BtnLogIn;
