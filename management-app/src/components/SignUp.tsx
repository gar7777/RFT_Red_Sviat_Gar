import React from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Button, CssBaseline, Typography, Container, TextField, Box } from '@mui/material';
import formStyles from '../scss/Form.module.scss';
import typographyStyles from '../scss/Typography.module.scss';
import mainStyles from './Main/Main.module.scss';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { signUp } from '../store/authorization/thunks/authorization.thunks';
import { i18n } from '../features/i18n';

function SignUp() {
  const { lang } = useAppSelector((state) => state.lang);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const formSubmit = async (data: FieldValues) => {
    const { name, login, password } = data;
    await dispatch(signUp({ name, login, password }));
    reset();
    navigate('/signin');
  };

  return (
    <>
      <CssBaseline />
      <div className={mainStyles.mainContainer}>
        <Box className={formStyles.formContainer}>
          <Typography component="h2" variant="h4" className={typographyStyles.h2}>
            {i18n[lang].signUp}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(formSubmit)}
            sx={{ mt: 1 }}
            className={formStyles.form}
          >
            <Box className={formStyles.labelWrapper}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label={i18n[lang].name}
                {...register('name', {
                  required: 'Please, enter your name',
                  minLength: { value: 2, message: 'Name must be more than 2 symbols' },
                })}
                autoComplete="Name"
                autoFocus
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
                required
                fullWidth
                id="login"
                label={i18n[lang].login}
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
                id="password"
                label={i18n[lang].password}
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
              {i18n[lang].haveAccount} <Link to="/signin">{i18n[lang].signIn}</Link>
            </Typography>
            <Button variant="contained" type="submit" fullWidth>
              {i18n[lang].signUp}
            </Button>
          </Box>
        </Box>
      </div>
    </>
  );
}

export default SignUp;
