import React from 'react';
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
import {
  mainContainerStyles,
  formContainerStyles,
  labelWrapperStyles,
  validatedInputStyles,
  validationAlertStyles,
  h2Styles,
} from '../constants/mui-styles';

function Board() {
  return (
    <Container component="main" maxWidth="xs" sx={mainContainerStyles}>
      <CssBaseline />
      <Box>
        <Card>
          <h2>Task name</h2>
          <Button>
            <AddCardIcon /> ADD NEW TASK
          </Button>
        </Card>
      </Box>
    </Container>
  );
}

export default Board;
