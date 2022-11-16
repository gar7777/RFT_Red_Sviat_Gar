import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from '../../../constants/api';
import { getTokenFromLS } from '../../../utilities/getToken';
import {
  CREATE_COLUMN,
  DELETE_COLUMN,
  LOAD_COLUMNS,
  // UPDATE_COLUMN,
} from '../actions/columns.actions';
import { ICreateColumn, IDeleteColumn } from '../types/columns.type';

export const loadColumns = createAsyncThunk(LOAD_COLUMNS, async (boardId: string) => {
  const url = `${API_URL}/boards/${boardId}/columns`;
  const data = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getTokenFromLS()}`,
    },
  });
  const json = await data.json();

  return json;
});

export const createColumn = createAsyncThunk(
  CREATE_COLUMN,
  async ({ title, boardId }: ICreateColumn) => {
    const url = `${API_URL}/boards/${boardId}/columns`;
    const body = {
      title: title,
    };
    const data = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${getTokenFromLS()}`,
      },
      body: JSON.stringify(body),
    });
    const json = await data.json();

    return json;
  }
);

export const deleteColumn = createAsyncThunk(
  DELETE_COLUMN,
  async ({ id, boardId }: IDeleteColumn) => {
    const url = `${API_URL}/boards/${boardId}/columns/${id}`;
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

// export const updateColumn = createAsyncThunk(UPDATE_COLUMN, async (boardUpdate: IBoard) => {
//   const { id, title, description } = boardUpdate;
//   const url = `${API_URL}/boards/${id}`;
//   const data = await fetch(url, {
//     method: 'PUT',
//     headers: {
//       'Content-type': 'application/json',
//       Authorization: `Bearer ${getTokenFromLS}`,
//     },
//     body: JSON.stringify({ title, description }),
//   });
//   const json = await data.json();

//   console.log(boardUpdate);

//   return json;
// });
