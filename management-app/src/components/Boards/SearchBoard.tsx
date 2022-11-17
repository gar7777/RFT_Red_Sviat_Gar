import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../store/hooks';
import { setSearchQuery } from '../../store/boards/reducers/boards.slice';
import { loadBoards } from '../../store/boards/thunks/loadBoards.thunk';

export default function SearchBoard() {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const formSubmit = async () => {
    await dispatch(loadBoards());
    reset();
  };

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 3, width: '40ch' },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(formSubmit)}
    >
      <Stack spacing={1} direction="row">
        <TextField
          id="search"
          label="search"
          variant="outlined"
          size="medium"
          {...register('search', {
            onChange: (e) => dispatch(setSearchQuery(e.target.value)),
          })}
        />
        <IconButton type="submit" color="primary" size="large">
          <SearchIcon />
        </IconButton>
      </Stack>
    </Box>
  );
}
