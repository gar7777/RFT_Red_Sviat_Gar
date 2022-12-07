import React, { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Button, CssBaseline, Typography, TextField, Box, CircularProgress } from '@mui/material';
import formStyles from '../scss/Form.module.scss';
import typographyStyles from '../scss/Typography.module.scss';
import mainStyles from './Main/Main.module.scss';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loadUser } from '../store/user/thunks/loadUser.thunks';
import { signIn } from '../store/authorization/thunks/authorization.thunks';
import { i18n } from '../features/i18n';
import { getTokenFromLS } from '../utilities/getToken';
import ErrorModal from './ErrorModal';
import spinnerStyles from '../scss/Spinner.module.scss';

function SignIn() {
  const { lang } = useAppSelector((state) => state.lang);
  const { error } = useAppSelector((state) => state.auth);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.columns);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (error) {
      setIsErrorModalOpen(true);
    }
  }, [error]);

  const formSubmit = async (data: FieldValues) => {
    const { login, password } = data;
    await dispatch(signIn({ login, password }));
    reset();
    if (getTokenFromLS()) {
      navigate('/boards');
      await dispatch(loadUser());
    }
  };

  return (
    <>
      {isLoading && (
        <div className={spinnerStyles.spinner__container}>
          <CircularProgress />
        </div>
      )}
      <CssBaseline />
      <div className={mainStyles.mainContainer}>
        <Box className={formStyles.formContainer}>
          <Typography component="h2" variant="h4" className={typographyStyles.h2}>
            {i18n[lang].signIn}
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
                id="login"
                label={i18n[lang].login}
                {...register('login', {
                  required: i18n[lang].enterLogin,
                  minLength: { value: 3, message: i18n[lang].loginReq },
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
                label={i18n[lang].password}
                {...register('password', {
                  required: i18n[lang].enterPassword,
                  pattern: {
                    value: /^(?=.*[A-Za-zА-Яа-я])(?=.*\d)[A-Za-zА-Яа-я\d]{8,}$/,
                    message: i18n[lang].passwordReq,
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
              {i18n[lang].haveNoAccount} <Link to="/signup">{i18n[lang].signUp}</Link>
            </Typography>
            <Button variant="contained" type="submit" fullWidth>
              {i18n[lang].signIn}
            </Button>
          </Box>
        </Box>
        {error && (
          <ErrorModal
            error={error}
            isErrorModalOpen={isErrorModalOpen}
            setIsErrorModalOpen={setIsErrorModalOpen}
          />
        )}
      </div>
    </>
  );
}

export default SignIn;
