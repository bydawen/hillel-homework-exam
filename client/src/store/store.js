import { configureStore } from '@reduxjs/toolkit';
import carsReducer from './features/cars';
import clientsReducer from './features/clients';
import ordersReducer from './features/orders';
import testDrivesReducer from './features/testDrives';
import authorizationReducer from './features/authorization';

export const store = configureStore({
  reducer: {
    cars: carsReducer,
    clients: clientsReducer,
    orders: ordersReducer,
    testDrives: testDrivesReducer,
    authorization: authorizationReducer,
  },
});
