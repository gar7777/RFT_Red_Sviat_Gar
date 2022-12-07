import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setSearchQuery, searchByTitle } from '../../store/boards/reducers/boards.slice';
import { i18n } from '../../features/i18n';
import styles from '../Boards/Boards.module.scss';

export default function SearchBoard() {
  const { lang } = useAppSelector((state) => state.lang);
  const dispatch = useAppDispatch();

  const { register } = useForm();

  return (
    <Box component="form" noValidate autoComplete="off" className={styles.inputContainer}>
      <Stack spacing={1} direction="row">
        <TextField
          id="search"
          label={i18n[lang].search}
          variant="outlined"
          size="small"
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
