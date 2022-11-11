import { AccountCircle } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react';

function BtnProfile() {
  return (
    <>
      <AccountCircle fontSize="large" />
      <Button variant="text" sx={{ color: 'white', fontSize: '1.3rem', fontWeight: '400' }}>
        ПРОФИЛЬ
      </Button>
    </>
  );
}

export default BtnProfile;
