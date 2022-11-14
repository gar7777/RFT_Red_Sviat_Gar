import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import EditIcon from '@mui/icons-material/Edit';
import BoardCardList from './BordCardList';

export default function CardDetail() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl">
        <Stack direction="row" spacing={2}>
          <h3>Название карточки</h3>
          <Button variant="outlined" endIcon={<DeleteIcon />} size="small">
            Удалить
          </Button>
          <Button variant="contained" endIcon={<AddIcon />} size="small">
            Добавить
          </Button>
          <Button variant="contained" endIcon={<EditIcon />} size="small">
            Изменить
          </Button>
        </Stack>
        <BoardCardList />
      </Container>
    </React.Fragment>
  );
}
