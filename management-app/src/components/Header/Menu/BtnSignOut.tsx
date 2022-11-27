import { Logout } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { i18n } from '../../../features/i18n';
import { logoutUser } from '../../../store/authorization/reducers/auth.slice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setEmptyUser } from '../../../store/user/reducers/user.slice';
import { setTokenToLS } from '../../../utilities/getToken';

export default function BtnLogOut() {
  const { lang } = useAppSelector((state) => state.lang);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(logoutUser());
    dispatch(setEmptyUser());
    setTokenToLS('');
  };

  return (
    <>
      <Logout fontSize="large" />
      <NavLink to="/">
        <Button
          variant="text"
          sx={{ color: 'white', fontSize: '1.3rem', fontWeight: '400' }}
          onClick={handleClick}
        >
          {i18n[lang].signOut}
        </Button>
      </NavLink>
    </>
  );
}
