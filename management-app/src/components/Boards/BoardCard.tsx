import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { BoardCardButtons } from './BoardCardButtons';
import { IBoard } from '../../store/boards/types/boards.type';
import styles from '../../components/Boards/Boards.module.scss';
import { Box } from '@mui/system';
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
    <Card className={styles.card}>
      <Link to={`/boards/${id}`} style={{ textDecoration: 'none' }}>
        <CardContent>
          <Typography gutterBottom variant="h4" component="div" className={styles.cardTitle}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" className={styles.cardDescr}>
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
