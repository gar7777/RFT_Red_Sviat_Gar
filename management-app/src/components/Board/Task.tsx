import { Card } from '@mui/material';
import { taskStyles } from '../../constants/mui-styles';
import React from 'react';

interface IProps {
  title: string;
  description: string;
}

function Task({ title, description }: IProps) {
  return (
    <Card sx={taskStyles}>
      <h2>{title}</h2>
      <p>{description}</p>
    </Card>
  );
}

export default Task;
