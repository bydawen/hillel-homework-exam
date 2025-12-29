import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Result, Card, Tabs, Tag } from "antd";
import { getClientsAsync } from "../../store/features/clients.js";
import { getOrdersAsync } from "../../store/features/orders.js";
import { getCarsAsync } from "../../store/features/cars.js";
import { getTestDrivesAsync } from "../../store/features/testDrives.js";
import { TEST_DRIVES_STATUS } from "../../common/testDrivesStatus.js";
import { ORDERS_STATUS } from "../../common/ordersStatus.js";

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
  console.log(clientOrders);

  useEffect(() => {
    dispatch(getClientsAsync(clientId));
    dispatch(getOrdersAsync());
    dispatch(getCarsAsync());
    dispatch(getTestDrivesAsync());
  }, [dispatch, clientId]);

  const statusColor = (status) => {
    switch (status) {
      case ORDERS_STATUS.COMPLETED:
      case TEST_DRIVES_STATUS.DONE:
      case TEST_DRIVES_STATUS.PASS:
        return 'success';

      case ORDERS_STATUS.CANCELED:
      case TEST_DRIVES_STATUS.CANCELED:
        return 'error';

      case ORDERS_STATUS.NEW:
      case TEST_DRIVES_STATUS.NEW:
        return 'blue';

      default:
        return 'default';
    }
  };

  const items = [
    {
      key: '1',
      label: 'Orders',
      children: clientOrders.length === 0 ? (
        <Result
          status="warning"
          title="This client has no orders yet!"
        />
      ) : (
        <ul className="client-info-list">
          {clientOrders.map(order => {
            const orderCar = cars.find(car => car.id === order.carId);

            if (!order) {
              return (
                <li key={order.id}>
                  <Result
                    status="error"
                    title="No client found!"
                  />
                </li>
              )
            }

            return (
              <li key={order.id}>
                <p>
                  <b>Order ID: </b>
                  {order.id}
                </p>
                <p>
                  {orderCar?.brand} {orderCar?.model}
                </p>
                <p>
                  <b>Price: </b>
                  {orderCar?.price}$
                </p>
                <p>
                  <b>STATUS: </b>
                  <br/>
                  <Tag color={statusColor(order.orderStatus)} key={order.orderStatus}>
                    {order.orderStatus}
                  </Tag>
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
      children: testDrives.length === 0 ? (
        <Result
          status="warning"
          title="There is no test drives for this client yet!"
        />
      ) : (
        <ul className="client-info-list">
          {testDrives.map(testDrive => {
            const testDriveCar = cars.find(car => car.id === testDrive.carId);

            return (
              <li key={testDrive.id}>
                <p>
                  <b>STATUS:</b>
                  <br/>
                  <Tag color={statusColor(testDrive.testDriveStatus)} key={testDrive.testDriveStatus}>
                    {testDrive.testDriveStatus}
                  </Tag>
                </p>
                <p>
                  <b>Date of test drive: </b>
                  <br/>
                  {testDrive.testDriveDate}
                </p>
                <p>
                  <b>Test drive car:</b>
                  <br/>
                  {testDriveCar?.brand} {testDriveCar?.model}
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
      <Card className="client-info-card">
        <h1>
          Details about
          <br/>
          <b>{client.name}</b>
        </h1>
        <div>
          <p>
            <b>Name:</b> {client.name}
          </p>
          <p>
            <b>Phone:</b> {client.phone}
          </p>
          <p>
            <b>Email:</b> {client.email}</p>
        </div>
        <Tabs defaultActiveKey="1" items={items} />
      </Card>
    );
  }
}

export default ClientInfo;
