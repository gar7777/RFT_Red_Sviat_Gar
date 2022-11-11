import React from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import {
  mainContainerStyles,
  formContainerStyles,
  labelWrapperStyles,
  validatedInputStyles,
  validationAlertStyles,
  h2Styles,
} from '../constants/mui-styles';

function SignUp() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const formSubmit = (data: FieldValues) => {
    console.log(data);
    reset();
  };

  return (
    <Container component="main" maxWidth="xs" sx={mainContainerStyles}>
      <CssBaseline />
      <Box sx={formContainerStyles}>
        <Typography component="h2" variant="h4" style={h2Styles}>
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit(formSubmit)} sx={{ mt: 1 }}>
          <Box sx={labelWrapperStyles}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              {...register('name', {
                required: 'Please, enter your name',
                minLength: { value: 2, message: 'Name must be more than 2 symbols' },
              })}
              autoComplete="Name"
              autoFocus
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
              required
              fullWidth
              id="login"
              label="Login"
              {...register('login', {
                required: 'Please, enter login',
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
              required
              fullWidth
              id="password"
              label="Password"
              {...register('password', {
                required: 'Please, enter password',
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
          <Typography component="p" align="center">
            Already have an account? <Link to="/signin">Sign In</Link>
          </Typography>
          <Button variant="contained" type="submit" fullWidth>
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default SignUp;
