import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {Result} from "antd";
import { getClientsAsync } from "../../store/features/clients.js";
import { getOrdersAsync } from "../../store/features/orders.js";
import { getCarsAsync } from "../../store/features/cars.js";
import { getTestDrivesAsync } from "../../store/features/testDrives.js";
import { Tabs } from 'antd';

import './ClientInfo.scss';

function ClientInfo(props) {
  const dispatch = useDispatch();
  const { clientId } = useParams();
  const client = useSelector(state => state.clients.clientsItems.find(client => client.id === clientId));
  const cars = useSelector(state => state.cars.carsItems);
  const clientOrders = useSelector(state => state.orders.ordersItems.filter(order => order.clientId === clientId));
  const testDrives = useSelector(state => state.testDrives.testDrivesItems.filter(testDrive => testDrive.clientId === clientId));
  const isLoading = useSelector(state => state.clients.loading);
  console.log(clientId);

  useEffect(() => {
    dispatch(getClientsAsync(clientId));
    dispatch(getOrdersAsync());
    dispatch(getCarsAsync());
    dispatch(getTestDrivesAsync());
  }, [dispatch, clientId]);

  const items = [
    {
      key: '1',
      label: 'Orders',
      children: (
        <ul>
          {clientOrders.map(order => {
            const orderCar = cars.find(car => car.id === order.carId);

            return (
              <li key={order.id}>
                <p>
                  {order.id}
                </p>
                <p>
                  {orderCar?.brand} {orderCar?.model}
                </p>
                <p>
                  {order.price}
                </p>
                <p>
                  {order.orderStatus}
                </p>
              </li>
            )
          })}
        </ul>
      ),
    },
    {
      key: '2',
      label: 'Test Drives',
      children: (
        <ul>
          {testDrives.map(testDrive => {
            const testDriveCar = cars.find(car => car.id === testDrive.carId);

            return (
              <li key={testDrive.id}>
                <p>
                  {testDrive.testDriveDate}
                </p>
                <p>
                  {testDriveCar?.brand} {testDriveCar?.model}
                </p>
                <p>
                  {testDrive.testDriveStatus}
                </p>
              </li>
            )
          })}
        </ul>
      ),
    },
  ];

  if (isLoading) {
    return null
  }

  if (!client) {
    return (
      <Result
        status="error"
        title="No client found!"
      />
    )
  } else if (!isLoading) {
    return (
      <div>
        <h1>
          Details about
          <br/>
          {client.name}
        </h1>
        <div>
          <p>Name: {client.name}</p>
          <p>Phone: {client.phone}</p>
          <p>Email: {client.email}</p>
        </div>
        <Tabs defaultActiveKey="1" items={items} />
      </div>
    );
  }
}

export default ClientInfo;
