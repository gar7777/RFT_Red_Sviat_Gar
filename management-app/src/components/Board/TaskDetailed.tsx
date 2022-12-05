import { Box, Dialog, IconButton, Typography } from '@mui/material';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { i18n } from '../../features/i18n';
import formStyles from '../../scss/Form.module.scss';
import typographyStyles from '../../scss/Typography.module.scss';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loadUsers } from '../../store/user/thunks/loadUser.thunks';

interface IProps {
  setTaskDetailedOpen: Dispatch<SetStateAction<boolean>>;
  taskDetailedOpen: boolean;
  title: string;
  description: string;
  userId: string;
}

function TaskDetailed({
  taskDetailedOpen,
  setTaskDetailedOpen,
  title,
  description,
  userId,
}: IProps) {
  const { lang } = useAppSelector((state) => state.lang);
  const { users } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    dispatch(loadUsers());
    if (users) {
      const [currentUser] = users.filter((user) => user.id === userId);
      setUserName(currentUser.name as string);
    }
  }, []);

  return (
    <Dialog open={taskDetailedOpen} onClose={() => setTaskDetailedOpen(false)}>
      <Box className={formStyles.formContainer}>
        <IconButton sx={{ alignSelf: 'end' }} onClick={() => setTaskDetailedOpen(false)}>
          <CloseIcon />
        </IconButton>
        <Typography component="h2" variant="h4" className={typographyStyles.h2}>
          {title}
        </Typography>
        <Typography component="h4" variant="h6" className={typographyStyles.h3}>
          {description}
        </Typography>
        <Typography component="p" variant="h6" className={typographyStyles.h4}>
          {i18n[lang].responcablePerson}: {userName}
        </Typography>
      </Box>
    </Dialog>
  );
}

export default TaskDetailed;
