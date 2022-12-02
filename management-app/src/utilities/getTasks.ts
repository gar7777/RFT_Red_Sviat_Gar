import { API_URL } from '../constants/api';
import { getTokenFromLS } from './getToken';

export const getTasks = async (boardId: string, columnId: string) => {
  const url = `${API_URL}/boards/${boardId}/columns/${columnId}/tasks`;
  try {
    const data = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getTokenFromLS()}`,
      },
    });
    const json = await data.json();
    // setTasks(json);
    return json;
  } catch (error) {
    console.log(error);
  }
};
