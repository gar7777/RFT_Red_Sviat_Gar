import { Box, Dialog, Divider, IconButton, Modal, Typography } from '@mui/material';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { i18n } from '../../../features/i18n';
import formStyles from '../../../scss/Form.module.scss';
import typographyStyles from '../../../scss/Typography.module.scss';
import styles from './TaskDetailed.module.scss';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { loadUsers } from '../../../store/user/thunks/loadUser.thunks';

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
    <Modal
      open={taskDetailedOpen}
      onClose={() => setTaskDetailedOpen(false)}
      className={styles.modal}
    >
      <Box className={styles.paper}>
        <Box>
          <Typography component="h3" className={styles.h3}>
            {title}
          </Typography>
          <Divider />
          <Typography component="p" className={styles.p}>
            {description}
          </Typography>
        </Box>
        <Typography component="h4" className={styles.h4}>
          {i18n[lang].responcablePerson}: {userName}
        </Typography>
      </Box>
    </Modal>
  );
}

export default TaskDetailed;
