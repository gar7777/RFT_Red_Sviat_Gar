import { Logout } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react';

function BtnLogOut() {
  return (
    <>
      <Logout fontSize="large" />
      <Button variant="text" sx={{ color: 'white', fontSize: '1.3rem', fontWeight: '400' }}>
        ВЫЙТИ
      </Button>
    </>
  );
}

export default BtnLogOut;
