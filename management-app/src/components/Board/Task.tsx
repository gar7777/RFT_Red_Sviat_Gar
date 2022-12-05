import { i18n } from '../../features/i18n';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Card, Button, Typography } from '@mui/material';
import React, { Dispatch, SetStateAction, SyntheticEvent, useState } from 'react';
import { setCurrentTask } from '../../store/tasks/reducers/tasks.slice';
import { IUpdatetaskData } from '../../store/tasks/types/tasks.types';
// import { IUsersLoad } from '../../store/user/types/user.types';
import taskStyles from './Task.module.scss';
import { Draggable } from 'react-beautiful-dnd';
import TaskDetailed from './TaskDetailed';

interface IProps {
  title: string;
  description: string;
  id: string;
  order: number;
  index: number;
  userId: string;
  setDeleteTaskModal: Dispatch<SetStateAction<boolean>>;
  setUpdateTaskModal: Dispatch<SetStateAction<boolean>>;
  setUpdatedUser: Dispatch<SetStateAction<string | undefined>>;
}

function Task({
  id,
  title,
  description,
  order,
  userId,
  setDeleteTaskModal,
  setUpdateTaskModal,
  setUpdatedUser,
  index,
}: IProps) {
  const dispatch = useAppDispatch();
  const { lang } = useAppSelector((state) => state.lang);
  // const { user } = useAppSelector((state) => state.user);
  const [taskDetailedOpen, setTaskDetailedOpen] = useState(false);

  const updateCurrentTaskData: IUpdatetaskData = {
    id,
    title,
    description,
    order: order,
    userId: userId,
  };

  const handleUpdateTask = (e: SyntheticEvent) => {
    e.stopPropagation();
    setUpdateTaskModal(true);
    setUpdatedUser(userId);
    dispatch(setCurrentTask(updateCurrentTaskData));
  };

  const handleDeleteTask = (e: SyntheticEvent) => {
    e.stopPropagation();
    setDeleteTaskModal(true);
    dispatch(setCurrentTask(updateCurrentTaskData));
  };

  const handleDetailedTask = () => {
    setTaskDetailedOpen(true);
  };

  return (
    <>
      <Draggable draggableId={id} index={index}>
        {(provided) => (
          <Card
            className={taskStyles.task__container}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            onClick={handleDetailedTask}
          >
            <Typography className={taskStyles.task__h2}>{title}</Typography>
            <p>{description}</p>
            <Button onClick={handleUpdateTask}>{i18n[lang].update}</Button>
            <Button onClick={handleDeleteTask}>{i18n[lang].delete}</Button>
          </Card>
        )}
      </Draggable>
      {taskDetailedOpen && (
        <TaskDetailed
          setTaskDetailedOpen={setTaskDetailedOpen}
          title={title}
          description={description}
          userId={userId}
          taskDetailedOpen={taskDetailedOpen}
        />
      )}
    </>
  );
}

export default Task;
