import React, { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Button, CssBaseline, Typography, Container, TextField, Box } from '@mui/material';
import formStyles from './scss/Form.module.scss';
import typographyStyles from './scss/Typography.module.scss';
import mainStyles from './scss/MainContainer.module.scss';
import { deleteUser, updateUser } from '../store/user/thunks/loadUser.thunks';
import { useAppDispatch } from '../store/hooks';
import { logoutUser } from '../store/authorization/auth.slice';
import { setTokenToLS } from '../utilities/getToken';
import { useNavigate } from 'react-router';

function Profile() {
  const navigate = useNavigate();
  const [isDirty, setIsDirty] = useState(false);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const subscription = watch((value) => {
      const formValues = Object.values(value);
      if (formValues.every((item) => !item)) {
        setIsDirty(false);
      } else {
        setIsDirty(true);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const formSubmit = async (data: FieldValues) => {
    await dispatch(
      updateUser({
        name: data.name,
        login: data.login,
        password: data.password,
      })
    );
  };

  const deleteHandler = async () => {
    await dispatch(deleteUser());
    dispatch(logoutUser());
    setTokenToLS('');
    reset();
    navigate('/');
  };

  return (
    <Container component="main" maxWidth="xs" className={mainStyles.mainContainer}>
      <CssBaseline />
      <Box className={formStyles.formContainer}>
        <Typography component="h2" variant="h4" className={typographyStyles.h2}>
          Profile
        </Typography>
        <Box component="form" sx={{ mt: 1 }}>
          <Box className={formStyles.labelWrapper}>
            <TextField
              margin="normal"
              fullWidth
              id="name"
              label="Name"
              {...register('name', {
                minLength: { value: 2, message: 'Name must be more than 2 symbols' },
              })}
              autoComplete="Name"
              className={formStyles.validatedInput}
            />
            {errors.name && (
              <Typography
                component="p"
                align="center"
                variant="caption"
                className={formStyles.validationAlert}
              >
                {errors.name.message as string}
              </Typography>
            )}
          </Box>
          <Box className={formStyles.labelWrapper}>
            <TextField
              margin="normal"
              fullWidth
              id="login"
              label="Login"
              {...register('login', {
                minLength: { value: 3, message: 'Login must be more than 3 symbols' },
              })}
              autoComplete="Login"
              className={formStyles.validatedInput}
            />
            {errors.login && (
              <Typography
                component="p"
                align="center"
                variant="caption"
                className={formStyles.validationAlert}
              >
                {errors.login.message as string}
              </Typography>
            )}
          </Box>
          <Box className={formStyles.labelWrapper}>
            <TextField
              margin="normal"
              fullWidth
              id="password"
              label="Password"
              {...register('password', {
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                  message: 'Eight characters, at least one letter and one number',
                },
              })}
              autoComplete="Password"
              className={formStyles.validatedInput}
            />
            {errors.password && (
              <Typography
                component="p"
                align="center"
                variant="caption"
                className={formStyles.validationAlert}
              >
                {errors.password.message as string}
              </Typography>
            )}
          </Box>
          <Button
            variant="contained"
            type="submit"
            fullWidth
            disabled={!isDirty}
            sx={{ marginBottom: '10px' }}
            onClick={handleSubmit(formSubmit)}
          >
            Update Profile
          </Button>
          <Button
            variant="contained"
            type="button"
            fullWidth
            disabled={!isDirty}
            onClick={deleteHandler}
          >
            Delete Profile
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Profile;
