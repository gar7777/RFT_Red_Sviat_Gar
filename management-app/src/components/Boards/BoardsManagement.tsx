import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import BoardCard from './BoardCard';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { AddBoard } from './AddBoard';
import AddBoardModal from './AddBoardModal';
import SearchBoard from './SearchBoard';
import styles from './Boards.module.scss';
import typographyStyles from '../../scss/Typography.module.scss';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loadBoards } from '../../store/boards/thunks/loadBoards.thunk';
import { RootState } from '../../store/store';
import { IBoard } from '../../store/boards/types/boards.type';
import { i18n } from '../../features/i18n';

export default function BoardsManagement() {
  const [open, setOpen] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [currentBoard, setCurrentBoard] = React.useState<IBoard | null>(null);
  const [boardsToShow, setBoardsToShow] = React.useState<IBoard[]>([]);

  const { boards, searchQuery, filteredBoards } = useAppSelector(
    (state: RootState) => state.boards
  );
  const { lang } = useAppSelector((state) => state.lang);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(loadBoards());
  }, [dispatch]);

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
      <Container className={styles.container}>
        <Box className={styles.searchContainer}>
          <h1 className={typographyStyles.h1} style={{ marginBottom: '0' }}>
            {i18n[lang].boards}
          </h1>
          <SearchBoard />
        </Box>
        <Box className={styles.boardsContainer}>
          <Box className={styles.gridContainer}>
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
                <h3>{i18n[lang].clickToAddABoard}</h3>
              </Grid>
            )}

            <Grid item xs={3}>
              <AddBoard setOpen={setOpen} setIsEditing={setIsEditing} />
            </Grid>
          </Box>
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
