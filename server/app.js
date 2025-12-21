import express, { response } from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import { carsData } from './mockData/cars.js';
import { clientsData } from './mockData/clients.js';
import { ordersData } from './mockData/orders.js';
import { testDrivesData } from './mockData/testDrives.js';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/cars', (request, response) => {
  return response.json(carsData);
});

app.post('/cars', (request, response) => {
  const newCar = {
    id: uuidv4(),
    ...request.body,
  };

  carsData.push(newCar);
  return response.json(newCar);
});

app.delete('/cars/:carId', (request, response) => {
  const carId = request.params.carId;
  const carIndex = carsData.findIndex(car => car.id === carId);

  if (carIndex !== -1) {
    carsData.splice(carIndex, 1);
    return response.json({ message: 'Car deleted'});
  } else {
    return response.status(404).json({ message: 'Car not found'});
  }
});

app.put('/cars/:carId', (request, response) => {
  const carId = request.params.carId;
  const carIndex = carsData.findIndex(car => car.id === carId);

  if (carIndex !== -1) {
    const updatedCar = { ...request.body, id: carId };
    carsData[carIndex] = updatedCar;
    return response.json(updatedCar);
  } else {
    return response.status(404).json({ message: 'Car not found'});
  }
});

app.get('/clients', (request, response) => {
  return response.json(clientsData);
});

app.post('/clients', (request, response) => {
  const newClient = {
    id: uuidv4(),
    ...request.body,
  };

  clientsData.push(newClient);
  return response.json(newClient);
});

app.get('/orders', (request, response) => {
  return response.json(ordersData);
});

app.post('/orders', (request, response) => {
  const newOrder = {
    id: uuidv4(),
    ...request.body,
  };

  ordersData.push(newOrder);
  return response.json(newOrder);
});

app.put('/orders/:orderId', (request, response) => {
  const orderId = request.params.orderId;
  const orderIndex = ordersData.findIndex(order => order.id === orderId);

  if (orderIndex !== -1) {
    const updatedOrder = { ...request.body, id: orderId };
    ordersData[orderIndex] = updatedOrder;
    return response.json(updatedOrder);
  } else {
    return response.status(404).json({ message: 'Order not found'});
  }
});

app.get('/test-drives', (request, response) => {
  return response.json(testDrivesData);
});

app.post('/test-drives', (request, response) => {
  const newTestDrive = {
    id: uuidv4(),
    ...request.body,
  };

  testDrivesData.push(newTestDrive);
  return response.json(newTestDrive);
});

app.put('/test-drives/:testDriveId', (request, response) => {
  const testDriveId = request.params.testDriveId;
  const testDriveIndex = testDrivesData.findIndex(testDrive => testDrive.id === testDriveId);

  if (testDriveIndex !== -1) {
    const updatedTestDrive = { ...request.body, id: testDriveId };
    testDrivesData[testDriveIndex] = updatedTestDrive;
    return response.json(updatedTestDrive);
  } else {
    return response.status(404).json({ message: 'Test drive not found'});
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
