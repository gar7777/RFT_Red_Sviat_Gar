import { Container, Typography, Card, CardMedia, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React from 'react';
import { Link } from 'react-router-dom';
import { i18n } from '../features/i18n';
import { useAppSelector } from '../store/hooks';
import typographyStyles from '../scss/Typography.module.scss';
import layoutStyles from '../scss/layout.module.scss';

function VideoInstruction() {
  const { lang } = useAppSelector((state) => state.lang);

  return (
    <div className={layoutStyles.mainContainer}>
      <Container sx={{ maxWidth: '1280px', height: '80vh' }}>
        <Link to="/">
          <ArrowBackIcon fontSize="large" style={{ paddingTop: '2rem' }} />
        </Link>
        <Typography align="center" mb="1rem" variant="h1" className={typographyStyles.h1}>
          {i18n[lang].videoTutorial}
        </Typography>
        <Box component="div" sx={{ display: 'flex', justifyContent: 'center' }}>
          <iframe
            width="854"
            height="480"
            src={'https://www.youtube.com/embed/WrZTxA_X1AQ'}
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
