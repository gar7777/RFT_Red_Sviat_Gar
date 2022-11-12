import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { IElement } from './AddBoardModal';

interface IBoardCard {
  title: string;
  description: string;
  todos: IElement[];
  setTodos: React.Dispatch<React.SetStateAction<IElement[]>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  todo: IElement;
}

export default function BoardCard({
  title,
  description,
  todos,
  setTodos,
  todo,
  setOpen,
}: IBoardCard) {
  const deletHandler = () => {
    setTodos(todos.filter((el) => el.id !== todo.id));
  };
  const editHandler = () => {
    const selectedCard = todos.find((item) => item.id === todo.id);
    setOpen(true);
  };
  return (
    <Card sx={{ maxWidth: 250 }}>
      <Link to="/boards/:board" style={{ textDecoration: 'none' }}>
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
        <Button size="small" onClick={editHandler}>
          Изменить
        </Button>
        <Button size="small" onClick={deletHandler}>
          Удалить
        </Button>
      </CardActions>
    </Card>
  );
}
