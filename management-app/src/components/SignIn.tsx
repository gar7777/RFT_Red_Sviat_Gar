import React from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Button, CssBaseline, Typography, Container, TextField, Box } from '@mui/material';
import formStyles from '../scss/Form.module.scss';
import typographyStyles from '../scss/Typography.module.scss';
import mainStyles from '../scss/MainContainer.module.scss';
//import { logInUser } from '../store/authorization/thunks/authorization.thunks';
import { useAppDispatch, useAppSelector } from '../store/hooks';
//import { loginUser } from '../store/authorization/auth.slice';
import { setTokenToLS } from '../utilities/getToken';
import { loadUser } from '../store/user/thunks/loadUser.thunks';
import { signIn } from '../store/authorization/thunks/authorization.thunks';
import { RootState } from '../store/store';
import { loginUser } from '../store/authorization/auth.slice';

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const formSubmit = async (data: FieldValues) => {
    const { login, password } = data;
    await dispatch(signIn({ login, password }));
    reset();
    navigate('/boards');
    dispatch(loadUser());
  };

  return (
    <Container component="main" maxWidth="xs" className={mainStyles.mainContainer}>
      <CssBaseline />
      <Box className={formStyles.formContainer}>
        <Typography component="h2" variant="h4" className={typographyStyles.h2}>
          Sign In
        </Typography>
        <Box component="form" onSubmit={handleSubmit(formSubmit)} sx={{ mt: 1 }}>
          <Box className={formStyles.labelWrapper}>
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
              required
              fullWidth
              type="password"
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
          <Typography component="p" align="center">
            Do not have an account? <Link to="/signup">Sign Up</Link>
          </Typography>
          <Button variant="contained" type="submit" fullWidth>
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default SignIn;
