import { Button, Card } from '@mui/material';
import React from 'react';
// import { ITask } from '../../types/board-types';
// import Task from './Task';
import AddCardIcon from '@mui/icons-material/AddCard';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import styles from './Column.module.scss';

interface IProps {
  id: string;
  title: string;
  // tasks: ITask[];
  // handleAddTask: (id: string) => void;
  handleDeleteColumn: (id: string) => void;
}

function Column({ id, title, handleDeleteColumn }: IProps) {
  return (
    <Card variant="outlined" className={styles.column}>
      <h2>{title}</h2>
      <ModeEditIcon />
      {/* <Box className={styles.tasks_wrapper}>
        {tasks.map(({ id, title, description }) => (
          <Task key={id} title={title} description={description} />
        ))}
      </Box> */}
      <Button
      // onClick={() => handleAddTask(id)}
      >
        <AddCardIcon /> ADD NEW TASK
      </Button>
      <Button>
        <DeleteForeverIcon onClick={() => handleDeleteColumn(id)} />
      </Button>
    </Card>
  );
}

export default Column;
