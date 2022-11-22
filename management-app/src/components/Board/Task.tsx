import { Card, Button } from '@mui/material';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { setCurrentTask } from '../../store/tasks/reducers/tasks.slice';
import { IUpdatetaskData } from '../../store/tasks/types/tasks.types';
import { IUsersLoad } from '../../store/user/types/user.types';
import taskStyles from './Task.module.scss';

interface IProps {
  title: string;
  description: string;
  id: string;
  order: number;
  setDeleteTaskModal: Dispatch<SetStateAction<boolean>>;
  setUpdateTaskModal: Dispatch<SetStateAction<boolean>>;
}

function Task({ id, title, description, order, setDeleteTaskModal, setUpdateTaskModal }: IProps) {
  const dispatch = useAppDispatch();
  const [currentUser, setCurrentUser] = useState<IUsersLoad | null>(null);
  const updateCurrentTaskData: IUpdatetaskData = {
    id,
    title,
    description,
    order: order,
    userId: currentUser?.id,
  };

  return (
    <Card className={taskStyles.task__container}>
      <h2>{title}</h2>
      <p>{description}</p>
      <Button
        onClick={() => {
          setUpdateTaskModal(true);
          dispatch(setCurrentTask(updateCurrentTaskData));
        }}
      >
        Update
      </Button>
      <Button
        onClick={() => {
          setDeleteTaskModal(true);
          dispatch(setCurrentTask(updateCurrentTaskData));
        }}
      >
        Delete
      </Button>
    </Card>
  );
}

export default Task;
