import React, { useState, useEffect } from 'react';
import { CssBaseline, Stack, Button, Box } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AddColumnModal from './AddColumnModal';
// import AddTaskModal from './AddTaskModal';
// import { IData, ITask } from '../../types/board-types';
import Column from './Column';
import styles from './Board.module.scss';
import { useParams } from 'react-router';
import { IBoard } from '../../store/boards/types/boards.type';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/store';
import { createColumn, loadColumns, deleteColumn } from '../../store/columns/thunks/columns.thunks';
import { IColumn, IDeleteColumn, ICreateColumn } from '../../store/columns/types/columns.type';

function Board() {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { boards } = useAppSelector((state: RootState) => state.boards);
  const currentBoard = boards.find((board: IBoard) => board.id === params.board);

  const boardId = currentBoard?.id || localStorage.getItem('currentBoard') || '';

  const [addColumnModal, setAddColumnModal] = useState(false);
  // const [addTaskModal, setAddTaskModal] = useState(false);
  // const [currentColumnId, setCurrenColumnId] = useState('');

  useEffect(() => {
    dispatch(loadColumns(boardId));
    return () => {
      localStorage.setItem('currentBoard', boardId);
    };
  }, []);

  const handleAddColumn = (): void => {
    setAddColumnModal(true);
  };

  const { columns } = useAppSelector((state) => state.columns);

  const addColumn = async ({ title }: IColumn) => {
    const columnData: ICreateColumn = {
      title: title,
      boardId: boardId,
    };
    await dispatch(createColumn(columnData));
    await dispatch(loadColumns(boardId));
    setAddColumnModal(false);
  };

  const handleDeleteColumn = async (id: string): Promise<void> => {
    const deleteData: IDeleteColumn = {
      id: id,
      boardId: boardId,
    };
    await dispatch(deleteColumn(deleteData));
    await dispatch(loadColumns(boardId));
  };

  const closeColumnModal = (): void => {
    setAddColumnModal(false);
  };

  // const closeTaskModal = (): void => {
  //   setAddTaskModal(false);
  // };

  // const handleAddTask = (id: string): void => {
  //   setAddTaskModal(true);
  //   setCurrenColumnId(id);
  // };

  return (
    <>
      <CssBaseline />
      <Stack className={styles.board_name__wrapper} direction="row">
        <h2 style={{ marginTop: '0.3rem', marginRight: '2rem' }}>{currentBoard?.title}</h2>
        <Button onClick={handleAddColumn}>
          <AddBoxIcon /> ADD NEW COLUMN
        </Button>
      </Stack>
      <Box component="main" maxWidth="xs" className={styles['board__main-container']}>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'start' }}>
          {columns.map(({ id, title }) => (
            <Column
              key={id}
              id={id}
              title={title}
              // tasks={tasks}
              // handleAddTask={handleAddTask}
              handleDeleteColumn={handleDeleteColumn}
            />
          ))}
        </Stack>
        {addColumnModal && (
          <AddColumnModal addColumn={addColumn} closeColumnModal={closeColumnModal} />
        )}
        {/* {addTaskModal && <AddTaskModal addTask={addTask} closeTaskModal={closeTaskModal} />} */}
      </Box>
    </>
  );
}

export default Board;
