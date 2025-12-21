import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
  testDrivesItems: [],
  loading: false,
}

const TEST_DRIVES_URL = 'http://localhost:3000/test-drives';

export const getTestDrivesAsync = createAsyncThunk(
  'testDrives/getTestDrives',
  async () => {
    const result = await axios.get(TEST_DRIVES_URL);
    return result.data;
  }
);

export const addTestDriveAsync = createAsyncThunk(
  'testDrives/addTestDrive',
  async (testDrive) => {
    const result = await axios.post(TEST_DRIVES_URL, testDrive);
    return result.data;
  }
);

export const editTestDriveAsync = createAsyncThunk(
  'testDrives/editTestDrive',
  async (testDrive) => {
    const result = await axios.put(`${TEST_DRIVES_URL}/${testDrive.id}`, testDrive);
    return result.data;
  }
);

const testDrivesSlice = createSlice({
  name: 'testDrives',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getTestDrivesAsync.fulfilled, (state, action) => {
      state.testDrivesItems = action.payload;
    });

    builder.addCase(addTestDriveAsync.fulfilled, (state, action) => {
      state.testDrivesItems.push(action.payload);
    });

    builder.addCase(editTestDriveAsync.fulfilled, (state, action) => {
      const testDriveIndex = state.testDrivesItems.findIndex(testDrive => testDrive.id === action.payload.id);
      state.testDrivesItems[testDriveIndex] = action.payload;
    });
  }
});

export default testDrivesSlice.reducer;
