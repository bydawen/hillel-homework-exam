import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
  token: localStorage.getItem('token'),
  loginError: null,
};

const LOGIN_URL = 'http://localhost:3000/login';

export const loginAsync = createAsyncThunk(
  'authorization/login',
  async (authData) => {
    const result = await axios.post(LOGIN_URL, authData);
    return result.data;
  }
);

const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    logout: state => {
      localStorage.removeItem('token');
      state.token = null;
    }
  },
  extraReducers: builder => {
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      localStorage.setItem('token', action.payload.token);
      state.token = action.payload.token;
    });

    builder.addCase(loginAsync.rejected, (state, action) => {
      state.loginError = action.error.message;
    });
  }
});

export const { logout } = authorizationSlice.actions;
export default authorizationSlice.reducer;
