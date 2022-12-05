import { API_URL } from '../constants/api';
import { ITaskCreateData, ITaskGetData } from '../store/tasks/types/tasks.types';
import { getTokenFromLS } from '../utilities/getToken';

export const addNewTaskInColumn = async (taskCreateData: ITaskCreateData) => {
  const { boardId, columnId, title, description, userId } = taskCreateData;
  const url = `${API_URL}/boards/${boardId}/columns/${columnId}/tasks`;
  const body = {
    title: title,
    description: description,
    userId: userId,
  };
  const data = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${getTokenFromLS()}`,
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(body),
  });
  const json = await data.json();

  return json;
};

export const getTaskById = async (taskGetData: ITaskGetData) => {
  const { boardId, columnId, taskId } = taskGetData;
  const url = `${API_URL}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`;
  const data = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${getTokenFromLS()}`,
    },
  });
  const json = await data.json();

  return json;
};
