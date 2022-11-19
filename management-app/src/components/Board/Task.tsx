import { Card } from '@mui/material';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { setCurrentTask } from '../../store/tasks/reducers/tasks.slice';
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
  const dispatch = useAppDispatch();
  return (
    <Card className={taskStyles.task__container}>
      <h2>{title}</h2>
      <p>{description}</p>
      <button
        onClick={() => {
          setUpdateTaskModal(true);
          dispatch(
            setCurrentTask({
              id,
              title,
              description,
            })
          );
        }}
      >
        Update
      </button>
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
