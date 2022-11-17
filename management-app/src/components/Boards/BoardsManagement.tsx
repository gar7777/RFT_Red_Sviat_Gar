import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import BoardCard from './BoardCard';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { AddBoard } from './AddBoard';
import AddBoardModal from './AddBoardModal';
import SearchBoard from './SearchBoard';
import './style.css';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loadBoards } from '../../store/boards/thunks/loadBoards.thunk';
import { RootState } from '../../store/store';
import { IBoard } from '../../store/boards/types/boards.type';

export default function BoardsManagement() {
  const [open, setOpen] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [currentBoard, setCurrentBoard] = React.useState<IBoard | null>(null);
  const [boardsToShow, setBoardsToShow] = React.useState<IBoard[]>([]);

  const { boards, searchQuery, filteredBoards } = useAppSelector(
    (state: RootState) => state.boards
  );

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(loadBoards());
  }, []);

  React.useEffect(() => {
    if (searchQuery.length > 0) {
      setBoardsToShow(filteredBoards);
    } else {
      setBoardsToShow(boards);
    }
  }, [searchQuery, filteredBoards, boards]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl" className="board-container">
        <Box
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '5px',
          }}
        >
          <h1>Boards</h1>
          <SearchBoard />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 1, md: 2 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            {boardsToShow.length !== 0 ? (
              boardsToShow.map((board) => (
                <Grid item xs={3} key={board.id}>
                  <BoardCard
                    title={board.title}
                    description={board.description}
                    id={board.id}
                    setOpen={setOpen}
                    setIsEditing={setIsEditing}
                    setCurrentBoard={setCurrentBoard}
                  />
                </Grid>
              ))
            ) : (
              <Grid item xs={3}>
                <h3>Click to add a task</h3>
              </Grid>
            )}

            <Grid item xs={3}>
              <AddBoard setOpen={setOpen} setIsEditing={setIsEditing} />
            </Grid>
          </Grid>
        </Box>
        <AddBoardModal
          open={open}
          setOpen={setOpen}
          isEditing={isEditing}
          currentBoard={currentBoard}
        />
      </Container>
    </React.Fragment>
  );
}
