import React, { useState } from 'react';
import { CssBaseline, Container, Stack } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AddColumnModal from './AddColumnModal';
import AddTaskModal from './AddTaskModal';
import { IData, ITask } from '../../types/board-types';
import Column from './Column';

interface IBoard {
  id: string;
  title: string;
  description: string;
  tasks: ITask[];
}

function Board() {
  const [columns, setColumns] = useState<IBoard[]>([]);
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

  const handleAddTask = (id: string): void => {
    setAddTaskModal(true);
    setCurrenColumnId(id);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Stack direction="row" spacing={2}>
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
        <AddBoxIcon onClick={handleAddColumn} />
      </Stack>
      {addColumnModal && (
        <AddColumnModal addColumn={addColumn} closeColumnModal={closeColumnModal} />
      )}
      {addTaskModal && <AddTaskModal addTask={addTask} />}
    </Container>
  );
}

export default Board;
