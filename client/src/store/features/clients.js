import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
  clientsItems: [],
  loading: false,
}

const CLIENTS_URL = 'http://localhost:3000/clients';

export const getClientsAsync = createAsyncThunk(
  'clients/getClients',
  async () => {
    const result = await axios.get(CLIENTS_URL);
    return result.data;
  }
);

export const addClientAsync = createAsyncThunk(
  'clients/addClient',
  async (client) => {
    const result = await axios.post(CLIENTS_URL, client);
    return result.data;
  }
);

const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getClientsAsync.fulfilled, (state, action) => {
      state.clientsItems = action.payload;
    });

    builder.addCase(addClientAsync.fulfilled, (state, action) => {
      state.clientsItems.push(action.payload);
    });
  }
});

export default clientsSlice.reducer;
