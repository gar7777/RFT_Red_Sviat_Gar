import * as React from 'react';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Typography } from '@mui/material';

export default function ToggleButtons() {
  const [lang, setLang] = React.useState('ru');

  const handleChange = (event: React.SyntheticEvent, newLang: string) => {
    setLang(newLang);
  };

  return (
    <ToggleButtonGroup value={lang} exclusive onChange={handleChange}>
      <ToggleButton value="ru">
        <Typography sx={{ color: 'white' }}>RU</Typography>
      </ToggleButton>
      <ToggleButton value="en">
        <Typography sx={{ color: 'white' }}>EN</Typography>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
