import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from '../../../constants/api';
import { getTokenFromLS } from '../../../utilities/getToken';
import { CREATE_TASK, DELETE_TASK, LOAD_TASKS, UPDATE_TASK } from '../actions/tasks.actions';
import { IDeleteTask } from '../types/tasks.types';
// import { ICreateColumn, IDeleteColumn, IUpdateColumn } from '../types/columns.type';

interface ITaskCreateData {
  boardId: string;
  columnId: string;
  title: string;
  description: string;
}

interface ITaskLoadData {
  boardId: string;
  columnId: string;
}

export const loadTasks = createAsyncThunk(
  LOAD_TASKS,
  async ({ boardId, columnId }: ITaskLoadData) => {
    const url = `${API_URL}/boards/${boardId}/columns/${columnId}/tasks`;
    const data = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getTokenFromLS()}`,
      },
    });
    const json = await data.json();
    return json;
  }
);

export const createTask = createAsyncThunk(CREATE_TASK, async (taskCreateData: ITaskCreateData) => {
  const { boardId, columnId, title, description } = taskCreateData;
  const url = `${API_URL}/boards/${boardId}/columns/${columnId}/tasks`;
  const body = {
    title: title,
    description: description,
    userId: 'eecbc190-e7b6-4605-8626-939f490c47f4',
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
});

export const deleteTask = createAsyncThunk(
  DELETE_TASK,
  async ({ boardId, columnId, taskId }: IDeleteTask) => {
    const url = `${API_URL}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`;
    const data = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${getTokenFromLS()}`,
      },
    });
    const json = await data.json();

    return json;
  }
);

// export const updateColumn = createAsyncThunk(
//   UPDATE_TASK,
//   async ({ title, boardId, order, columnId }: IUpdateColumn) => {
//     const url = `${API_URL}/boards/${boardId}/columns/${columnId}`;
//     const body = {
//       title: title,
//       order: order,
//     };
//     console.log(body);
//     console.log(url);
//     console.log(JSON.stringify(body));
//     const data = await fetch(url, {
//       method: 'PUT',
//       headers: {
//         'Content-type': 'application/json',
//         Authorization: `Bearer ${getTokenFromLS}`,
//       },
//       body: JSON.stringify(body),
//     });
//     const json = await data.json();
//     return json;
//   }
// );
