import React, { SyntheticEvent, useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Typography } from '@mui/material';
import { getLangfromLS, setLangToLs } from '../../../utilities/getLang';

export default function ToggleButtons() {
  const [, setLang] = useState('');

  const langValue = () => {
    return getLangfromLS()?.length ? (getLangfromLS() as string) : 'ru';
  };

  const handleChange = (event: SyntheticEvent, newLang: string) => {
    if (event) {
      setLang(newLang);
      setLangToLs(newLang);
    }
  };

  return (
    <ToggleButtonGroup value={langValue()} exclusive onChange={handleChange}>
      <ToggleButton value="ru">
        <Typography sx={{ color: 'white' }}>RU</Typography>
      </ToggleButton>
      <ToggleButton value="en">
        <Typography sx={{ color: 'white' }}>EN</Typography>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
