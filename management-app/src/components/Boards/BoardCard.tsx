import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { BoardCardButtons } from './BoardCardButtons';
interface IBoardCard {
  title: string;
  description: string;
  id: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function BoardCard({ title, description, id, setOpen, setIsEditing }: IBoardCard) {
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
      <BoardCardButtons id={id} setOpen={setOpen} setIsEditing={setIsEditing} />
    </Card>
  );
}
