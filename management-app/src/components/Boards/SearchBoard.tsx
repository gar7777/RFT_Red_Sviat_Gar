import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';

export default function SearchBoard() {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 3, width: '40ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <Stack spacing={1} direction="row">
        <TextField label="Search" variant="outlined" size="medium" />
        <IconButton type="submit" color="primary" size="large">
          <SearchIcon />
        </IconButton>
      </Stack>
    </Box>
  );
}
