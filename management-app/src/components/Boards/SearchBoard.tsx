import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setSearchQuery, searchByTitle } from '../../store/boards/reducers/boards.slice';
import { l18n } from '../../features/l18n';

export default function SearchBoard() {
  const { lang } = useAppSelector((state) => state.lang);
  const dispatch = useAppDispatch();

  const { register } = useForm();

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
        <TextField
          id="search"
          label={l18n[lang].search}
          variant="outlined"
          size="medium"
          {...register('search', {
            onChange: (e) => {
              dispatch(setSearchQuery(e.target.value));
              dispatch(searchByTitle());
            },
          })}
        />
      </Stack>
    </Box>
  );
}
