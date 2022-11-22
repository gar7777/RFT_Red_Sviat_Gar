import { Groups } from '@mui/icons-material';
import { Box, Container, Divider, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import { l18n } from '../../features/l18n';
import { useAppSelector } from '../../store/hooks';
import styles from './WelcomePage.module.scss';

function WelcomePage() {
  const { lang } = useAppSelector((state) => state.lang);

  return (
    <div className={styles.WelcomePage}>
      <Container sx={{ maxWidth: '1280px' }}>
        <h1 className={styles.h1}>{l18n[lang].mainHeading}</h1>
        <Grid
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
                {l18n[lang].member} 1
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box className={styles.memberBox}>
              <Groups fontSize="large" />
              <Typography variant="h5" sx={{ marginLeft: '20px' }}>
                {l18n[lang].member} 2
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box className={styles.memberBox}>
              <Groups fontSize="large" />
              <Typography variant="h5" sx={{ marginLeft: '20px' }}>
                {l18n[lang].member} 3
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default WelcomePage;
