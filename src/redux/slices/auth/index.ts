import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { UserCredentials } from '../../../shared/types';
import { addNotification } from '../notifications';
import api from '../../../api';

export const fetchLogin = createAsyncThunk(
  'auth/fetchLogin',
  async (user: UserCredentials) => {
    const { data } = await api.post('/login', {
      username: user.username,
      password: user.password,
    });

    if ('access_token' in data) {
      localStorage.setItem('access_token', data.access_token);
    }

    return data;
  },
);

export const fetchRegister = createAsyncThunk(
  'auth/fetchRegister',
  async (user: UserCredentials, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await api.post(
        `/register?username=${user.username}&password=${user.password}`,
      );

      dispatch(
        addNotification({
          message: `Registration successful`,
          kind: 'success',
        }),
      );

      return data;
    } catch (error) {
      dispatch(
        addNotification({
          message: `Failed to register`,
          kind: 'error',
        }),
      );
      return rejectWithValue(error);
    }
  },
);

type AuthState = {
  isAuth: boolean;
  data: string | null;
  isLoading: boolean;
};

const initialState: AuthState = {
  isAuth: localStorage.getItem('access_token') ? true : false,
  data: localStorage.getItem('access_token'),
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
      state.isAuth = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLogin.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.data = action.payload.access_token;
      state.isAuth = true;
      state.isLoading = false;
    });

    builder.addCase(fetchLogin.rejected, (state) => {
      state.isAuth = false;
      state.isLoading = false;
    });

    builder.addCase(fetchRegister.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchRegister.fulfilled, (state) => {
      state.isLoading = false;
    });

    builder.addCase(fetchRegister.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;
