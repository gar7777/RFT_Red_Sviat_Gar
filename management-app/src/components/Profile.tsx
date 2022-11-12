import React, { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Button, CssBaseline, Typography, Container, TextField, Box } from '@mui/material';
import {
  mainContainerStyles,
  formContainerStyles,
  labelWrapperStyles,
  validatedInputStyles,
  validationAlertStyles,
  h2Styles,
} from '../constants/mui-styles';

function Profile() {
  const [isDirty, setIsDirty] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
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

  const formSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <Container component="main" maxWidth="xs" sx={mainContainerStyles}>
      <CssBaseline />
      <Box sx={formContainerStyles}>
        <Typography component="h2" variant="h4" sx={h2Styles}>
          Profile
        </Typography>
        <Box component="form" onSubmit={handleSubmit(formSubmit)} sx={{ mt: 1 }}>
          <Box sx={labelWrapperStyles}>
            <TextField
              margin="normal"
              fullWidth
              id="name"
              label="Name"
              {...register('name', {
                minLength: { value: 2, message: 'Name must be more than 2 symbols' },
              })}
              autoComplete="Name"
              sx={validatedInputStyles}
            />
            {errors.name && (
              <Typography component="p" align="center" variant="caption" sx={validationAlertStyles}>
                {errors.name.message as string}
              </Typography>
            )}
          </Box>
          <Box sx={labelWrapperStyles}>
            <TextField
              margin="normal"
              fullWidth
              id="login"
              label="Login"
              {...register('login', {
                minLength: { value: 3, message: 'Login must be more than 3 symbols' },
              })}
              autoComplete="Login"
              sx={validatedInputStyles}
            />
            {errors.login && (
              <Typography component="p" align="center" variant="caption" sx={validationAlertStyles}>
                {errors.login.message as string}
              </Typography>
            )}
          </Box>
          <Box sx={labelWrapperStyles}>
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
              sx={validatedInputStyles}
            />
            {errors.password && (
              <Typography component="p" align="center" variant="caption" sx={validationAlertStyles}>
                {errors.password.message as string}
              </Typography>
            )}
          </Box>
          <Button variant="contained" type="submit" fullWidth disabled={!isDirty}>
            Update Profile
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Profile;
