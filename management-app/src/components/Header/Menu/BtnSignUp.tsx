import { Airplay } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react';

function BtnSignUp() {
  return (
    <>
      <Airplay fontSize="large" />
      <Button variant="text" sx={{ color: 'white', fontSize: '1.3rem', fontWeight: '400' }}>
        РЕГИСТРАЦИЯ
      </Button>
    </>
  );
}

export default BtnSignUp;
