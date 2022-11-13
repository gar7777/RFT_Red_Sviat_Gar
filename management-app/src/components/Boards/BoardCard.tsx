import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { IElement } from './AddBoardModal';
import { IBoard } from '../../store/boards/types/boards.type';

interface IBoardCard {
  title: string;
  description: string;
}

export default function BoardCard({ title, description }: IBoardCard) {
  return (
    <Card sx={{ maxWidth: 250 }}>
      <Link to="/boards/board" style={{ textDecoration: 'none' }}>
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </Link>
      <CardActions>
        <Button size="small">Edit</Button>
        <Button size="small">Delete</Button>
      </CardActions>
    </Card>
  );
}
