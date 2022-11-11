import { Box, Container, Grid, Link } from '@mui/material';
import React from 'react';
import styles from './Footer.module.scss';

function Footer() {
  return (
    <footer className={styles.Footer}>
      <Box className={styles.container}>
        <Box className={styles.itemContainer}>
          <Link href="https://rs.school/">
            <Box className={styles.iconRss}></Box>
          </Link>
        </Box>
        <Box className={styles.linksContainer}>
          <Box className={styles.itemContainer}>
            <Box className={styles.iconGithub}></Box>
            <Link sx={{ color: 'white' }} href="https://github.com/gar7777" target="blank">
              Gar7777
            </Link>
          </Box>
          <Box className={styles.itemContainer}>
            <Box className={styles.iconGithub}></Box>
            <Link sx={{ color: 'white' }} href="https://github.com/MatsurSviat" target="blank">
              MatsurSviat
            </Link>
          </Box>
          <Box className={styles.itemContainer}>
            <Box className={styles.iconGithub}></Box>
            <Link
              sx={{ color: 'white' }}
              href="https://github.com/Kseniya-Korolchuk"
              target="blank"
            >
              Redwood
            </Link>
          </Box>
        </Box>
        <Box>&copy; 2022</Box>
      </Box>
    </footer>
  );
}

export default Footer;
