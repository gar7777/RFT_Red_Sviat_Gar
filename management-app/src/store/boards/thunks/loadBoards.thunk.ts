import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL, TOKEN } from '../../../constants/api';
import { CREATE_BOARDS, LOAD_BOARDS } from '../actions/boards.action';
import { TBoardCreate } from '../types/boards.type';

export const loadBoards = createAsyncThunk(LOAD_BOARDS, async () => {
  const url = `${API_URL}/boards`;
  const data = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  const json = await data.json();

  return json;
});

export const createBoard = createAsyncThunk(CREATE_BOARDS, async (dataBoard: TBoardCreate) => {
  const url = `${API_URL}/boards`;
  const data = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify(dataBoard),
  });
  const json = await data.json();

  return json;
});
