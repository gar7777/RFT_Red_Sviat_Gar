import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import BoardCard from './BoardCard';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { AddBoard } from './AddBoard';
import AddBoardModal, { IElement } from './AddBoardModal';

export default function BoardsManagement() {
  const [open, setOpen] = React.useState(false);
  const [inputText, setInputText] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [todos, setTodos] = React.useState<IElement[]>([]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl">
        <h1
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '5px',
          }}
        >
          План заданий
        </h1>
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            {todos.length !== 0 ? (
              todos.map((todo) => (
                <Grid item xs={3} key={todo.id}>
                  <BoardCard
                    title={todo.title}
                    description={todo.description}
                    todos={todos}
                    setTodos={setTodos}
                    todo={todo}
                    setOpen={setOpen}
                  />
                </Grid>
              ))
            ) : (
              <Grid item xs={3}>
                <h3>Нажмите на крестик, чтобы добавить задание</h3>
              </Grid>
            )}

            <Grid item xs={3}>
              <AddBoard setOpen={setOpen} />
            </Grid>
          </Grid>
        </Box>
        <AddBoardModal
          open={open}
          setOpen={setOpen}
          setInputText={setInputText}
          todos={todos}
          setTodos={setTodos}
          inputText={inputText}
          description={description}
          setDescription={setDescription}
        />
      </Container>
    </React.Fragment>
  );
}
