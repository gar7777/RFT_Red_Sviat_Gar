import { Card } from '@mui/material';
import React from 'react';

interface IProps {
  title: string;
  description: string;
}

function Task({ title, description }: IProps) {
  return (
    <Card>
      <h2>{title}</h2>
      <p>{description}</p>
    </Card>
  );
}

export default Task;
