import { Groups } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Box, Button, Card, Container, Divider, Grid, Paper, Typography } from '@mui/material';
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
      <Container className={styles.welcomePageMainContainer}>
        <Typography variant="h1" className={typographyStyles.h1}>
          {i18n[lang].mainHeading}
        </Typography>
        <Grid
          direction="row"
          container
          sx={{ justifyContent: 'space-between', marginBottom: '8rem', marginTop: '3rem' }}
        >
          <Box component="div" className={styles.welcomePageTextContainer}>
            <Typography className={styles.welcomePageText}>{i18n[lang].mainPageText}</Typography>
          </Box>
          <Paper className={styles.welcomePageImage}></Paper>
        </Grid>
        <Grid container sx={{ justifyContent: 'center', gap: '1rem' }}>
          <Link to="/video-instruction">
            <Button variant="contained">
              <PlayCircleIcon sx={{ marginRight: '0.5rem' }} />
              {i18n[lang].videoTutorial}
            </Button>
          </Link>
          <Button variant="contained">
            <PeopleAltIcon sx={{ marginRight: '0.5rem' }} />
            {i18n[lang].teamMembers}
          </Button>
        </Grid>
        {/* <Grid
          container
          spacing={{ xs: 1, md: 4 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          sx={{ marginBottom: '50px' }}
        >
          <Grid item xs={3}>
            <Paper elevation={3} sx={{ padding: '15px' }}>
              <h3 className={styles.h3}>Lorem ipsum dolor sit amet consectetur</h3>
              <Divider />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum recusandae eveniet
                commodi sunt suscipit soluta, adipisci voluptas aperiam libero labore voluptates
                unde debitis mollitia aliquid ab, non rem blanditiis ea!
              </p>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper elevation={3} sx={{ padding: '15px' }}>
              <h3 className={styles.h3}>Lorem ipsum dolor sit amet consectetur</h3>
              <Divider />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum recusandae eveniet
                commodi sunt suscipit soluta, adipisci voluptas aperiam libero labore voluptates
                unde debitis mollitia aliquid ab, non rem blanditiis ea!
              </p>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper elevation={3} sx={{ padding: '15px' }}>
              <h3 className={styles.h3}>Lorem ipsum dolor sit amet consectetur</h3>
              <Divider />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum recusandae eveniet
                commodi sunt suscipit soluta, adipisci voluptas aperiam libero labore voluptates
                unde debitis mollitia aliquid ab, non rem blanditiis ea!
              </p>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper elevation={3} sx={{ padding: '15px' }}>
              <h3 className={styles.h3}>Lorem ipsum dolor sit amet consectetur</h3>
              <Divider />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum recusandae eveniet
                commodi sunt suscipit soluta, adipisci voluptas aperiam libero labore voluptates
                unde debitis mollitia aliquid ab, non rem blanditiis ea!
              </p>
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={{ xs: 1, md: 4 }} columns={12} direction="row">
          <Grid item xs={4}>
            <Box className={styles.memberBox}>
              <Groups fontSize="large" />
              <Typography variant="h5" sx={{ marginLeft: '20px' }}>
                {i18n[lang].member} 1
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box className={styles.memberBox}>
              <Groups fontSize="large" />
              <Typography variant="h5" sx={{ marginLeft: '20px' }}>
                {i18n[lang].member} 2
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box className={styles.memberBox}>
              <Groups fontSize="large" />
              <Typography variant="h5" sx={{ marginLeft: '20px' }}>
                {i18n[lang].member} 3
              </Typography>
            </Box>
          </Grid>
        </Grid> */}
      </Container>
    </div>
  );
}

export default WelcomePage;
