import { Link } from 'react-router-dom';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import { i18n } from '../../features/i18n';
import { useAppSelector } from '../../store/hooks';
import styles from './WelcomePage.module.scss';
import typographyStyles from '../../scss/Typography.module.scss';
import stylesLayout from '../../scss/layout.module.scss';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

function WelcomePage() {
  const { lang } = useAppSelector((state) => state.lang);

  return (
    <div className={stylesLayout.mainContainer}>
      <div className={styles.contentWrapper}>
        <Typography variant="h1" className={typographyStyles.h1}>
          {i18n[lang].mainHeading}
        </Typography>
        <Grid direction="row" container className={styles.gridContainer}>
          <Box component="div" className={styles.welcomePageTextContainer}>
            <Typography className={styles.welcomePageText}>{i18n[lang].mainPageText}</Typography>
            <Grid container className={styles.buttonsContainer}>
              <Link to="/video-instruction">
                <Button variant="contained" className={styles.btn}>
                  <PlayCircleIcon sx={{ marginRight: '0.5rem' }} />
                  {i18n[lang].videoTutorial}
                </Button>
              </Link>
              <Button variant="contained" className={styles.btn}>
                <PeopleAltIcon sx={{ marginRight: '0.5rem' }} />
                {i18n[lang].teamMembers}
              </Button>
            </Grid>
          </Box>
          <Paper className={styles.welcomePageImage}></Paper>
        </Grid>
      </div>
    </div>
  );
}

export default WelcomePage;
