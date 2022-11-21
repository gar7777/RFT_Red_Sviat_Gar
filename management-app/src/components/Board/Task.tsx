import { Card, Button } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { setCurrentTask } from '../../store/tasks/reducers/tasks.slice';
import taskStyles from './Task.module.scss';

interface IProps {
  title: string;
  description: string;
  id: string;
  setDeleteTaskModal: Dispatch<SetStateAction<boolean>>;
  setUpdateTaskModal: Dispatch<SetStateAction<boolean>>;
}

function Task({ id, title, description, setDeleteTaskModal, setUpdateTaskModal }: IProps) {
  const dispatch = useAppDispatch();
  return (
    <Card className={taskStyles.task__container}>
      <h2>{title}</h2>
      <p>{description}</p>
      <Button
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
      </Button>
      <Button
        onClick={() => {
          setDeleteTaskModal(true);
          dispatch(
            setCurrentTask({
              id,
              title,
              description,
            })
          );
        }}
      >
        Delete
      </Button>
    </Card>
  );
}

export default Task;
