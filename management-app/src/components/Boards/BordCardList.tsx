import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

import BoardCard from './BoardCard';
import { IElement } from './AddBoardModal';

export default function BoardCardList() {
  return (
    <Box sx={{ width: '100%', maxWidth: 250, bgcolor: 'background.paper' }}>
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Название" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Пока ничего" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
      <Divider />
      <Button variant="text" fullWidth>
        Добавить задачу
      </Button>
    </Box>
  );
}
