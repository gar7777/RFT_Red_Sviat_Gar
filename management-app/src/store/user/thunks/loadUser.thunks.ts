import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from '../../../constants/api';
import { getTokenFromLS } from '../../../utilities/getToken';
import decodeJwt from '../../../utilities/jwtDecode';
import { DELETE_USER, LOAD_USER, UPDATE_USER, LOAD_USERS } from '../actions/user.actions';
import { IUser } from '../types/user.types';

export const loadUser = createAsyncThunk(LOAD_USER, async () => {
  const token = getTokenFromLS();
  const id = decodeJwt(token as string);
  const url = `${API_URL}/users/${id}`;
  const data = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const json = await data.json();
  return json;
});

export const loadUsers = createAsyncThunk(LOAD_USERS, async () => {
  const token = getTokenFromLS();
  const url = `${API_URL}/users`;
  const data = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const json = await data.json();
  return json;
});

export const deleteUser = createAsyncThunk(DELETE_USER, async () => {
  const token = getTokenFromLS();
  const id = decodeJwt(token as string);
  const url = `${API_URL}/users/${id}`;
  const data = await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const json = await data.json();
  return json;
});

export const updateUser = createAsyncThunk(UPDATE_USER, async (userUpdate: IUser) => {
  const token = getTokenFromLS();
  const id = decodeJwt(token as string);
  const { name, login, password } = userUpdate;
  const url = `${API_URL}/users/${id}`;
  const data = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, login, password }),
  });
  const json = await data.json();

  return json;
});
