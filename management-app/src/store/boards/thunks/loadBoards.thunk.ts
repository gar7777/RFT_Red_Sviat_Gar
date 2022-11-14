import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL, TOKEN } from '../../../constants/api';
import { CREATE_BOARD, DELETE_BOARD, LOAD_BOARDS, UPDATE_BOARD } from '../actions/boards.action';
import { IBoard, TBoardCreate } from '../types/boards.type';

export const loadBoards = createAsyncThunk(LOAD_BOARDS, async () => {
  const url = `${API_URL}/boards`;
  const data = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  const json = await data.json();

  return json;
});

export const createBoard = createAsyncThunk(CREATE_BOARD, async (dataBoard: TBoardCreate) => {
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

export const deleteBoard = createAsyncThunk(DELETE_BOARD, async (id: IBoard['id']) => {
  const url = `${API_URL}/boards/${id}`;
  const data = await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  const json = await data.json();

  return json;
});

export const updateBoard = createAsyncThunk(UPDATE_BOARD, async (boardUpdate: IBoard) => {
  console.log(boardUpdate);

  const { id, title, description } = boardUpdate;
  const url = `${API_URL}/boards/${id}`;
  const data = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({ title, description }),
  });
  const json = await data.json();

  console.log(boardUpdate);

  return json;
});
