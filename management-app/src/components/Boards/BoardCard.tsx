import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export default function BoardCard() {
  return (
    <Link to="/boards/:board">
      <Card sx={{ maxWidth: 250 }}>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            Наименование
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Описание
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Изменить</Button>
          <Button size="small">Удалить</Button>
        </CardActions>
      </Card>
    </Link>
  );
}
