import { Login } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react';

function BtnLogIn() {
  return (
    <>
      <Login fontSize="large" />
      <Button variant="text" sx={{ color: 'white', fontSize: '1.3rem', fontWeight: '400' }}>
        ВОЙТИ
      </Button>
    </>
  );
}

export default BtnLogIn;
