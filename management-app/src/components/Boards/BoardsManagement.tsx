import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import BoardCard from './BoardCard';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { AddBoard } from './AddBoard';
import AddBoardModal, { IElement } from './AddBoardModal';
import SearchBoard from './SearchBoard';
import './style.css';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loadBoards } from '../../store/boards/thunks/loadBoards.thunk';
import { RootState } from '../../store/store';

export default function BoardsManagement() {
  const [open, setOpen] = React.useState(false);

  const { boards } = useAppSelector((state: RootState) => state.boards);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(loadBoards());
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl" className="board-container">
        <h1
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '5px',
          }}
        >
          Boards
        </h1>
        <SearchBoard />
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            {boards.length !== 0 ? (
              boards.map((board) => (
                <Grid item xs={3} key={board.id}>
                  <BoardCard title={board.title} description={board.description} />
                </Grid>
              ))
            ) : (
              <Grid item xs={3}>
                <h3>Click to add a task</h3>
              </Grid>
            )}

            <Grid item xs={3}>
              <AddBoard setOpen={setOpen} />
            </Grid>
          </Grid>
        </Box>
        <AddBoardModal open={open} setOpen={setOpen} />
      </Container>
    </React.Fragment>
  );
}
