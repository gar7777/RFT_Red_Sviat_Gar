import React, { useState } from 'react';
import {
  Button,
  CssBaseline,
  Typography,
  Container,
  TextField,
  Box,
  Grid,
  Card,
  CardActionArea,
} from '@mui/material';
import AddCardIcon from '@mui/icons-material/AddCard';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AddColumnModal from './AddColumnModal';

interface IBoard {
  id?: string;
  title: string;
  description: string;
}

function Board() {
  const [boards, setBoards] = useState<IBoard[]>([]);
  const [addColumnModal, setAddColumnModal] = useState(false);

  const handleAddColumn = (): void => {
    setAddColumnModal(true);
  };

  const addColumn = ({ title, description }: IBoard): void => {
    const id = Date.now().toString();
    console.log({ id: id, title: title, description: description });
    setBoards([...boards, { id: id, title: title, description: description }]);
    setAddColumnModal(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box>
        {boards.map(({ id, title, description }) => (
          <Card key={id}>
            <h2>{title}</h2>
            <p>{description}</p>
            <Button>
              <AddCardIcon /> ADD NEW TASK
            </Button>
            <Button>
              <DeleteForeverIcon />
            </Button>
          </Card>
        ))}
        <AddBoxIcon onClick={handleAddColumn} />
      </Box>
      {addColumnModal && <AddColumnModal addColumn={addColumn} />}
    </Container>
  );
}

export default Board;
