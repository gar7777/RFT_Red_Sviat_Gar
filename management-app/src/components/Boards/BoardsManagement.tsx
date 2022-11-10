import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import BoardCard from './BoardCard';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { AddBoard } from './AddBoard';
import AddBoardModal from './AddBoardModal';

export default function BoardsManagement() {
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl">
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Grid item xs={3}>
              <BoardCard />
            </Grid>
            <Grid item xs={3}>
              <BoardCard />
            </Grid>
            <Grid item xs={3}>
              <BoardCard />
            </Grid>
            <Grid item xs={3}>
              <BoardCard />
            </Grid>
            <Grid item xs={3}>
              <BoardCard />
            </Grid>
            <Grid item xs={3}>
              <AddBoard setOpen={setOpen} />
            </Grid>
          </Grid>
        </Box>
        <AddBoardModal open={open} setOpen={setOpen} />
      </Container>
    </React.Fragment>
  );
}
