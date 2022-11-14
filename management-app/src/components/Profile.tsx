import React, { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Button, CssBaseline, Typography, Container, TextField, Box } from '@mui/material';
import formStyles from './scss/Form.module.scss';
import typographyStyles from './scss/Typography.module.scss';
import mainStyles from './scss/MainContainer.module.scss';

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
    <Container component="main" maxWidth="xs" className={mainStyles.mainContainer}>
      <CssBaseline />
      <Box className={formStyles.formContainer}>
        <Typography component="h2" variant="h4" className={typographyStyles.h2}>
          Profile
        </Typography>
        <Box component="form" onSubmit={handleSubmit(formSubmit)} sx={{ mt: 1 }}>
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
          <Button variant="contained" type="submit" fullWidth disabled={!isDirty}>
            Update Profile
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Profile;
