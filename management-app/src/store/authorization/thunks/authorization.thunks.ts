import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from '../../../constants/api';
import { SIGN_IN, SIGN_UP } from '../actions/authorization.actions';

type UserCreate = {
  name?: string;
  login: string;
  password?: string;
};

export const signIn = createAsyncThunk(SIGN_UP, async (user: UserCreate) => {
  const url = `${API_URL}/signin`;
  const data = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  const json = await data.json();
  return json;
});

export const signUp = createAsyncThunk(SIGN_IN, async (user: UserCreate) => {
  const url = `${API_URL}/signup`;
  const data = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  const json = await data.json();

  return json.token;
});
