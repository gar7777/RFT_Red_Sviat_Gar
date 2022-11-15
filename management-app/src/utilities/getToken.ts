import { KEY } from '../store/authorization/api/api';
import { getLocalStorage } from './localStorage';

export const getToken = () => {
  return getLocalStorage(KEY);
};
