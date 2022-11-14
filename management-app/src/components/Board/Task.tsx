import { Card } from '@mui/material';
import React from 'react';
import taskStyles from './Task.module.scss';

interface IProps {
  title: string;
  description: string;
}

function Task({ title, description }: IProps) {
  return (
    <Card className={taskStyles.task__container}>
      <h2>{title}</h2>
      <p>{description}</p>
    </Card>
  );
}

export default Task;
