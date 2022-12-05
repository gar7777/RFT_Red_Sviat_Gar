import React from 'react';
import styles from './Team.module.scss';
import mainStyles from '../Main/Main.module.scss';
import { Link, Paper } from '@mui/material';
import { Box } from '@mui/system';
import { i18n } from '../../features/i18n';
import { useAppSelector } from '../../store/hooks';

const Team = () => {
  const { lang } = useAppSelector((state) => state.lang);

  return (
    <Box className={mainStyles.mainContainer}>
      <Box className={styles.contentWrapper}>
        <Paper className={styles.paper}>
          <Paper className={[styles.picture, styles.pictureGr].join(' ')}></Paper>
          <Box className={styles.infoWrapper}>
            <Box className={styles.ghWrapper}>
              <Box className={styles.iconGithub}></Box>
              <Link className={styles.linkGithub} href="https://github.com/gar7777" target="blank">
                <h3 className={styles.name}>{i18n[lang].gar}</h3>
              </Link>
            </Box>
            <h3 className={styles.role}>{i18n[lang].teamLead}</h3>
            <ul>
              <li className={styles.h4}>{i18n[lang].routing}</li>
              <li className={styles.h4}>{i18n[lang].dndTask}</li>
              <li className={styles.h4}>{i18n[lang].columnsPage}</li>
              <li className={styles.h4}>{i18n[lang].video}</li>
            </ul>
          </Box>
        </Paper>
        <Paper className={styles.paper}>
          <Paper className={[styles.picture, styles.pictureSv].join(' ')}></Paper>
          <Box className={styles.infoWrapper}>
            <Box className={styles.ghWrapper}>
              <Box className={styles.iconGithub}></Box>
              <Link
                className={styles.linkGithub}
                href="https://github.com/MatsurSviat"
                target="blank"
              >
                <h3 className={styles.name}>{i18n[lang].sviat}</h3>
              </Link>
            </Box>
            <h3 className={styles.role}>{i18n[lang].developer}</h3>
            <ul>
              <li className={styles.h4}>{i18n[lang].globalToast}</li>
              <li className={styles.h4}>{i18n[lang].redux}</li>
              <li className={styles.h4}>{i18n[lang].boardsPage}</li>
              <li className={styles.h4}>{i18n[lang].boardsSearch}</li>
              <li className={styles.h4}>{i18n[lang].page404}</li>
              <li className={styles.h4}>{i18n[lang].dndColumns}</li>
            </ul>
          </Box>
        </Paper>
        <Paper className={styles.paper}>
          <Paper className={[styles.picture, styles.pictureKs].join(' ')}></Paper>
          <Box className={styles.infoWrapper}>
            <Box className={styles.ghWrapper}>
              <Box className={styles.iconGithub}></Box>
              <Link
                className={styles.linkGithub}
                href="https://github.com/Kseniya-Korolchuk"
                target="blank"
              >
                <h3 className={styles.name}>{i18n[lang].kseniya}</h3>
              </Link>
            </Box>
            <h3 className={styles.role}>{i18n[lang].developer}</h3>
            <ul>
              <li className={styles.h4}>{i18n[lang].apiDeploy}</li>
              <li className={styles.h4}>{i18n[lang].authorization}</li>
              <li className={styles.h4}>{i18n[lang].i18n}</li>
              <li className={styles.h4}>{i18n[lang].header}</li>
              <li className={styles.h4}>{i18n[lang].footer}</li>
              <li className={styles.h4}>{i18n[lang].burger}</li>
              <li className={styles.h4}>{i18n[lang].mainPagetext}</li>
              <li className={styles.h4}>{i18n[lang].aboutTeamPage}</li>
              <li className={styles.h4}>{i18n[lang].styles}</li>
              <li className={styles.h4}>{i18n[lang].adaptivity}</li>
            </ul>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Team;

/*
 <Box className={styles.contentWrapper}>
        {teamInfo.length &&
          teamInfo.map((item) => (
            <MemberCard
              key={item.name as string}
              picture={item.picture}
              name={item.name}
              role={item.role}
              description={item.description}
            />
          ))}
      </Box>*/
