import React, { useState } from 'react';
import { CssBaseline, Stack, Button, Box } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AddColumnModal from './AddColumnModal';
import AddTaskModal from './AddTaskModal';
import { IData, ITask } from '../../types/board-types';
import Column from './Column';
import styles from './Board.module.scss';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { IBoardsState } from '../../store/boards/types/boardsState.type';
import { IBoard } from '../../store/boards/types/boards.type';
import { useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/store';

interface IBoard2 {
  id: string;
  title: string;
  description: string;
  tasks: ITask[];
}

function Board() {
  const params = useParams();
  const { boards } = useAppSelector((state: RootState) => state.boards);
  const currentBoard = boards.find((board: IBoard) => board.id === params.board);
  const [columns, setColumns] = useState<IBoard2[]>([]);
  const [addColumnModal, setAddColumnModal] = useState(false);
  const [addTaskModal, setAddTaskModal] = useState(false);
  const [currentColumnId, setCurrenColumnId] = useState('');

  const handleAddColumn = (): void => {
    setAddColumnModal(true);
  };

  const addColumn = ({ title, description }: IData): void => {
    const id = Date.now().toString();
    setColumns([...columns, { id: id, title: title, description: description, tasks: [] }]);
    setAddColumnModal(false);
  };

  const addTask = ({ title, description }: IData): void => {
    const currentColumn = columns.find(({ id }) => id === currentColumnId);
    const id = Date.now().toString();
    const currentTask = { title: title, description: description, id: id };
    currentColumn?.tasks.push(currentTask);
    setColumns([...columns]);
    setAddTaskModal(false);
  };

  const deleteColumn = (id: string): void => {
    setColumns(columns.filter((column) => column.id !== id));
  };

  const closeColumnModal = (): void => {
    setAddColumnModal(false);
  };

  const closeTaskModal = (): void => {
    setAddTaskModal(false);
  };

  const handleAddTask = (id: string): void => {
    setAddTaskModal(true);
    setCurrenColumnId(id);
  };

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
          {columns.map(({ id, title, description, tasks }) => (
            <Column
              key={id}
              id={id}
              title={title}
              description={description}
              tasks={tasks}
              handleAddTask={handleAddTask}
              deleteColumn={deleteColumn}
            />
          ))}
        </Stack>
        {addColumnModal && (
          <AddColumnModal addColumn={addColumn} closeColumnModal={closeColumnModal} />
        )}
        {addTaskModal && <AddTaskModal addTask={addTask} closeTaskModal={closeTaskModal} />}
      </Box>
    </>
  );
}

export default Board;
