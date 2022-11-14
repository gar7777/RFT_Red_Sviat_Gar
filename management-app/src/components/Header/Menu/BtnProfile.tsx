import { AccountCircle } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';

function BtnProfile() {
  return (
    <>
      <AccountCircle fontSize="large" />
      <NavLink to="/profile">
        <Button variant="text" sx={{ color: 'white', fontSize: '1.3rem', fontWeight: '400' }}>
          ПРОФИЛЬ
        </Button>
      </NavLink>
    </>
  );
}

export default BtnProfile;
