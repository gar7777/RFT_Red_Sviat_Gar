import {
  Box,
  Button,
  Dialog,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import { i18n } from '../../features/i18n';
import { IFormData } from '../../store/columns/types/columns.type';
import formStyles from '../../scss/Form.module.scss';
import typographyStyles from '../../scss/Typography.module.scss';
import CloseIcon from '@mui/icons-material/Close';

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
          {userId}
        </Typography>
      </Box>
    </Dialog>
  );
}

export default TaskDetailed;
