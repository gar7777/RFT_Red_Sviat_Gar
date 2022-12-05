import { PropaneSharp } from '@mui/icons-material';
import { Link, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import styles from './Team.module.scss';
import { i18n } from '../../features/i18n';
import { getLangfromLS } from '../../utilities/getLang';

type MemberCardProp = {
  picture: string;
  name: string;
  role: string;
  description: string;
};

const MemberCard = (props: MemberCardProp) => {
  const lang = getLangfromLS();
  const { name } = props;

  return (
    <Paper className={styles.paper}>
      <Paper className={styles.picture} sx={{ src: `url(${props.picture})` }}></Paper>
      <Box className={styles.infoWrapper}>
        <h3 className={styles.name}></h3>
        <h4 className={styles.h4}></h4>
        <h4 className={styles.h4}></h4>
        <Box className={styles.ghWrapper}>
          <Box className={styles.iconGithub}></Box>
          <Link className={styles.linkGithub}></Link>
        </Box>
      </Box>
    </Paper>
  );
};

export default MemberCard;
