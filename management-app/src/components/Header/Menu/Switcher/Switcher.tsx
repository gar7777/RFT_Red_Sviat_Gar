import React, { useEffect, useState } from 'react';
import { enLang, ruLang, setLangToLs } from '../../../../utilities/getLang';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { setLang } from '../../../../store/i18n/reducers/lang.slice';
import styles from './Switcher.module.scss';
import { Language } from '@mui/icons-material';

export default function Switcher() {
  const dispatch = useAppDispatch();
  const { lang } = useAppSelector((state) => state.lang);
  const [isChecked, setIsChecked] = useState(lang === ruLang);

  useEffect(() => {
    dispatch(setLang(!isChecked ? enLang : ruLang));
    setLangToLs(!isChecked ? enLang : ruLang);
  }, [isChecked]);

  return (
    <div className={styles.container}>
      <Language fontSize="medium" className={styles.iconLang} />
      <div className={styles.lang}>{enLang}</div>
      <label className={styles.switch}>
        <input
          type="checkbox"
          name="switcher"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
        />
        <span className={[styles.slider, styles.round].join(' ')} />
      </label>
      <div className={styles.lang}>{ruLang}</div>
    </div>
  );
}
