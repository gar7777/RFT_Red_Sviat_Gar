import { AccountCircle } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { l18n } from '../../../features/l18n';
import { useAppSelector } from '../../../store/hooks';

function BtnProfile() {
  const { lang } = useAppSelector((state) => state.lang);

  return (
    <>
      <AccountCircle fontSize="large" />
      <NavLink to="/profile">
        <Button variant="text" sx={{ color: 'white', fontSize: '1.3rem', fontWeight: '400' }}>
          {l18n[lang].profile}
        </Button>
      </NavLink>
    </>
  );
}

export default BtnProfile;
