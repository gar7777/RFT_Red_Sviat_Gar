import React, { SyntheticEvent, useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Typography } from '@mui/material';

export default function ToggleButtons() {
  const [lang, setLang] = useState('ru');

  const handleChange = (event: SyntheticEvent, newLang: string) => {
    if (event) {
      setLang(newLang);
    }
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
