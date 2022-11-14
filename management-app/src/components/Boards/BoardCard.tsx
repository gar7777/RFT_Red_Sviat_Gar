import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { BoardCardButtons } from './BoardCardButtons';
import { IBoard } from '../../store/boards/types/boards.type';
interface IBoardCard {
  title: string | undefined;
  description: string | undefined;
  id: string | undefined;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentBoard: React.Dispatch<React.SetStateAction<IBoard | null>>;
}

export default function BoardCard({
  title,
  description,
  id,
  setOpen,
  setIsEditing,
  setCurrentBoard,
}: IBoardCard) {
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
      <BoardCardButtons
        id={id}
        setOpen={setOpen}
        setIsEditing={setIsEditing}
        setCurrentBoard={setCurrentBoard}
        title={title}
        description={description}
      />
    </Card>
  );
}
