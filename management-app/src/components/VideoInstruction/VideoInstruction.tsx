import { Container, Typography, Card, CardMedia, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React from 'react';
import { Link } from 'react-router-dom';
import { i18n } from '../../features/i18n';
import { useAppSelector } from '../../store/hooks';
import typographyStyles from '../../scss/Typography.module.scss';
import layoutStyles from '../../scss/layout.module.scss';
import styles from './VideoInstruction.module.scss';
import mainStyles from '../Main/Main.module.scss';

function VideoInstruction() {
  const { lang } = useAppSelector((state) => state.lang);

  return (
    <div className={mainStyles.mainContainer}>
      <Container>
        <Link to="/">
          <ArrowBackIcon fontSize="large" style={{ paddingTop: '2rem' }} />
        </Link>
        <Typography align="center" mb="1rem" variant="h1" className={typographyStyles.h1}>
          {i18n[lang].videoTutorial}
        </Typography>
        <Box>
          <iframe
            width="100%"
            height="600"
            src={'https://www.youtube.com/embed/qHoL8Qs8D30'}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            sandbox="allow-forms allow-scripts allow-pointer-lock allow-same-origin allow-top-navigation allow-presentation"
            allowFullScreen
            title="Embedded youtube"
          />
        </Box>
      </Container>
    </div>
  );
}

export default VideoInstruction;
