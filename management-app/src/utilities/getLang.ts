import { LANG } from '../constants/ls';
import { getLocalStorage, setLocalStorage } from './localStorage';

export const getLangfromLS = () => {
  return getLocalStorage(LANG);
};

export const setLangToLs = (value: string) => {
  return setLocalStorage(LANG, value);
};
