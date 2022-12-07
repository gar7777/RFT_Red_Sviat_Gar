import { LANG } from '../constants/ls';
import { getLocalStorage, setLocalStorage } from './localStorage';

export type CurrentLang = 'RU' | 'EN';
export const ruLang = 'RU';
export const enLang = 'EN';

export const getLangfromLS = (): CurrentLang => {
  const lang = getLocalStorage(LANG);
  return lang ? (lang as CurrentLang) : 'RU';
};

export const setLangToLs = (value: CurrentLang) => {
  return setLocalStorage(LANG, value);
};
