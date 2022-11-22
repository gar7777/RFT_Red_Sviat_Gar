import React, { ChangeEvent, useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Button, CssBaseline, Typography, Container, TextField, Box } from '@mui/material';
import formStyles from '../../scss/Form.module.scss';
import typographyStyles from '../../scss/Typography.module.scss';
import mainStyles from '../../scss/MainContainer.module.scss';
import { deleteUser, loadUser, updateUser } from '../../store/user/thunks/loadUser.thunks';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logoutUser } from '../../store/authorization/reducers/auth.slice';
import { setTokenToLS } from '../../utilities/getToken';
import { useNavigate } from 'react-router';
import { RootState } from '../../store/store';
import { setEmptyUser } from '../../store/user/reducers/user.slice';
import { l18n } from '../../features/l18n';
import ConfirmModal from '../ConfirmModal';

function Profile() {
  const { lang } = useAppSelector((state: RootState) => state.lang);
  const { user } = useAppSelector((state: RootState) => state.user);
  const { name, login } = user;
  const navigate = useNavigate();
  const [isDirty, setIsDirty] = useState(false);
  const [nameValue, setNameValue] = useState(name);
  const [loginValue, setLoginValue] = useState(login);
  const dispatch = useAppDispatch();
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);
  const [updateConfirmModal, setUpdateConfirmModal] = useState(false);

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

  const formSubmit = async (data: FieldValues) => {
    await dispatch(
      updateUser({
        name: data.name,
        login: data.login,
        password: data.password,
      })
    );
    await dispatch(loadUser());
    closeUpdateModal();
    navigate('/boards');
  };

  const handleDeleteProfile = async () => {
    await dispatch(deleteUser());
    dispatch(logoutUser());
    setTokenToLS('');
    dispatch(setEmptyUser());
    closeDeleteModal();
    navigate('/');
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNameValue(event.target.value);
  };

  const handleLoginChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLoginValue(event.target.value);
  };

  const closeDeleteModal = () => {
    setDeleteConfirmModal(false);
  };

  const closeUpdateModal = () => {
    setUpdateConfirmModal(false);
  };

  return (
    <Container component="main" maxWidth="xs" className={mainStyles.mainContainer}>
      <CssBaseline />
      <Box className={formStyles.formContainer}>
        <Typography component="h2" variant="h4" className={typographyStyles.h2}>
          {l18n[lang].profile}
        </Typography>
        <Box component="form" sx={{ mt: 1 }}>
          <Box className={formStyles.labelWrapper}>
            <TextField
              type="input"
              margin="normal"
              fullWidth
              id="name"
              label={l18n[lang].name}
              value={nameValue}
              {...register('name', {
                minLength: { value: 2, message: 'Name must be more than 2 symbols' },
              })}
              autoComplete="Name"
              className={formStyles.validatedInput}
              onChange={handleNameChange}
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
              label={l18n[lang].login}
              value={loginValue}
              {...register('login', {
                minLength: { value: 3, message: 'Login must be more than 3 symbols' },
              })}
              autoComplete="Login"
              className={formStyles.validatedInput}
              onChange={handleLoginChange}
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
              label={l18n[lang].password}
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
            type="button"
            fullWidth
            disabled={!isDirty}
            sx={{ marginBottom: '10px' }}
            onClick={() => setUpdateConfirmModal(true)}
          >
            {l18n[lang].updateProfile}
          </Button>
          <Button
            variant="contained"
            type="button"
            fullWidth
            disabled={!isDirty}
            onClick={() => setDeleteConfirmModal(true)}
          >
            {l18n[lang].deleteProfile}
          </Button>
          {updateConfirmModal && (
            <ConfirmModal
              confirm={handleSubmit(formSubmit)}
              deny={closeUpdateModal}
              isOpen={updateConfirmModal}
              type={l18n[lang].profile}
              title=""
              action={l18n[lang].updateS}
            />
          )}
          {deleteConfirmModal && (
            <ConfirmModal
              confirm={handleDeleteProfile}
              deny={closeDeleteModal}
              isOpen={deleteConfirmModal}
              type={l18n[lang].profile}
              title=""
              action={l18n[lang].deleteS}
            />
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default Profile;
