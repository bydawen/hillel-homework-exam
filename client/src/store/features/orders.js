import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
  ordersItems: [],
  loading: false,
}

const ORDERS_URL = 'http://localhost:3000/orders';

export const getOrdersAsync = createAsyncThunk(
  'orders/getOrders',
  async () => {
    const result = await axios.get(ORDERS_URL);
    return result.data;
  }
);

export const addOrderAsync = createAsyncThunk(
  'orders/addOrder',
  async (order) => {
    const result = await axios.post(ORDERS_URL, order);
    return result.data;
  }
);

export const editOrderAsync = createAsyncThunk(
  'orders/editOrder',
  async (order) => {
    const result = await axios.put(`${ORDERS_URL}/${order.id}`, order);
    return result.data;
  }
)

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getOrdersAsync.fulfilled, (state, action) => {
      state.ordersItems = action.payload;
    });

    builder.addCase(addOrderAsync.fulfilled, (state, action) => {
      state.ordersItems.push(action.payload);
    });

    builder.addCase(editOrderAsync.fulfilled, (state, action) => {
      const orderIndex = state.ordersItems.findIndex(order => order.id === action.payload.id);
      state.ordersItems[orderIndex] = action.payload;
    });
  }
});

export default ordersSlice.reducer;
