import { Card } from '@mui/material';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { l18n } from '../../features/l18n';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
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
  const { lang } = useAppSelector((state) => state.lang);
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
        {l18n[lang].update}
      </button>
      <button
        onClick={() => {
          setDeleteTaskModal(true);
          setDeletedTaskId(id);
        }}
      >
        {l18n[lang].delete}
      </button>
    </Card>
  );
}

export default Task;
