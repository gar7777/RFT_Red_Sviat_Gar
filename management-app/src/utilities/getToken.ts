import { TOKEN } from '../constants/ls';
import { getLocalStorage, setLocalStorage } from './localStorage';

export const getTokenFromLS = () => {
  return getLocalStorage(TOKEN);
};

export const setTokenToLS = (value: string) => {
  return setLocalStorage(TOKEN, value);
};
