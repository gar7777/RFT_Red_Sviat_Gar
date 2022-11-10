import React from 'react';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { Home } from '@mui/icons-material';

function Header() {
  return (
    <AppBar>
      <Toolbar>
        <IconButton>
          <Home />
        </IconButton>
        <Typography>Главная</Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
