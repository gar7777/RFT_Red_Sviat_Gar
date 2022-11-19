import { Card } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import taskStyles from './Task.module.scss';

interface IProps {
  title: string;
  description: string;
  id: string;
  setDeleteTaskModal: Dispatch<SetStateAction<boolean>>;
  setUpdateTaskModal: Dispatch<SetStateAction<boolean>>;
  setDeletedTaskId: Dispatch<SetStateAction<string>>;
}

function Task({
  id,
  title,
  description,
  setDeleteTaskModal,
  setUpdateTaskModal,
  setDeletedTaskId,
}: IProps) {
  return (
    <Card className={taskStyles.task__container}>
      <h2>{title}</h2>
      <p>{description}</p>
      <button onClick={() => setUpdateTaskModal(true)}>Update</button>
      <button
        onClick={() => {
          setDeleteTaskModal(true);
          setDeletedTaskId(id);
        }}
      >
        Delete
      </button>
    </Card>
  );
}

export default Task;
