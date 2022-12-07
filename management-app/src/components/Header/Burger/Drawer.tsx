import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Header from '../Header';
import { Menu } from '@mui/icons-material';
import styles from './Drawer.module.scss';
import UserToolbar from '../Toolbar/Toolbar';

type Anchor = 'left';

export default function TemporaryDrawer() {
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === 'left' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <UserToolbar />
    </Box>
  );

  return (
    <div>
      {
        <React.Fragment>
          <Button onClick={toggleDrawer('left', true)}>
            <Menu className={styles.iconMenu} />
          </Button>
          <Drawer
            anchor="left"
            open={state['left']}
            onClose={toggleDrawer('left', false)}
            className={styles.drawer}
          >
            {list('left')}
          </Drawer>
        </React.Fragment>
      }
    </div>
  );
}
