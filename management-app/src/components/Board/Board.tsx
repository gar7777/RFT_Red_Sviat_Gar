import React, { useState } from 'react';
import {
  Button,
  CssBaseline,
  Typography,
  Container,
  TextField,
  Box,
  Grid,
  Card,
  CardActionArea,
} from '@mui/material';
import AddCardIcon from '@mui/icons-material/AddCard';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AddColumnModal from './AddColumnModal';
import AddTaskModal from './AddTaskModal';
import { IData } from '../../types/board-types';
import Task from './Task';

interface ITask {
  id: string;
  title: string;
  description: string;
  userId?: string;
}

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

  const handleAddTask = (id: string): void => {
    setAddTaskModal(true);
    setCurrenColumnId(id);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box>
        {columns.map(({ id, title, description, tasks }) => (
          <Card key={id}>
            <h2>{title}</h2>
            <p>{description}</p>
            {tasks.map(({ id, title, description }) => (
              <Task key={id} title={title} description={description} />
            ))}
            <Button onClick={() => handleAddTask(id)}>
              <AddCardIcon /> ADD NEW TASK
            </Button>
            <Button>
              <DeleteForeverIcon onClick={() => deleteColumn(id)} />
            </Button>
          </Card>
        ))}
        <AddBoxIcon onClick={handleAddColumn} />
      </Box>
      {addColumnModal && <AddColumnModal addColumn={addColumn} />}
      {addTaskModal && <AddTaskModal addTask={addTask} />}
    </Container>
  );
}

export default Board;
