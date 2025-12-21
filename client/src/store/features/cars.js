import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
  carsItems: [],
  loading: false,
}

const CARS_URL = 'http://localhost:3000/cars';

export const getCarsAsync = createAsyncThunk(
  'cars/getCars',
  async () => {
    const result = await axios.get(CARS_URL);
    return result.data;
  }
);

export const addCarAsync = createAsyncThunk(
  'cars/addCar',
  async (car) => {
    const result = await axios.post(CARS_URL, car);
    return result.data;
  }
);

export const deleteCarAsync = createAsyncThunk(
  'cars/deleteCar',
  async (carId) => {
    await axios.delete(`${CARS_URL}/${carId}`);
    return carId;
  }
);

export const editCarAsync = createAsyncThunk(
  'cars/editCar',
  async (car) => {
    const result = await axios.put(`${CARS_URL}/${car.id}`, car);
    return result.data;
  }
);

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getCarsAsync.fulfilled, (state, action) => {
      state.carsItems = action.payload;
    });

    builder.addCase(addCarAsync.fulfilled, (state, action) => {
      state.carsItems.push(action.payload);
    });

    builder.addCase(deleteCarAsync.fulfilled, (state, action) => {
      state.carsItems = state.carsItems.filter(car => car.id !== action.payload);
    });

    builder.addCase(editCarAsync.fulfilled, (state, action) => {
      const carIndex = state.carsItems.findIndex(car => car.id === action.payload.id);
      state.carsItems[carIndex] = action.payload;
    });
  }
});

export default carsSlice.reducer;
