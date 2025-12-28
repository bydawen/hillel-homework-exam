import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Select, Button, Tag, Space } from 'antd';
import { PlusSquareOutlined, DeleteOutlined } from '@ant-design/icons';
import { getOrdersAsync, deleteOrderAsync } from "../../store/features/orders.js";
import { getClientsAsync } from "../../store/features/clients.js";
import { getCarsAsync, editCarAsync } from "../../store/features/cars.js";
import { editOrderAsync } from "../../store/features/orders.js";
import { ORDERS_STATUS } from "../../common/ordersStatus.js";

import './OrdersPage.scss';

function OrdersPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orders = useSelector(state => state.orders.ordersItems);
  const clients = useSelector(state => state.clients.clientsItems);
  const cars = useSelector(state => state.cars.carsItems);

  useEffect(() => {
    dispatch(getOrdersAsync());
    dispatch(getClientsAsync());
    dispatch(getCarsAsync());
  }, [dispatch]);

  const handleDeleteOrder = (orderId) => {
    dispatch(deleteOrderAsync(orderId));
  };

  const columns = [
    {
      title: 'Client',
      dataIndex: 'clientId',
      render: (clientId) => clients.find(client => client.id === clientId)?.name
    },
    {
      title: 'Car',
      dataIndex: 'carId',
      render: (carId) => {
        const car = cars.find(car => car.id === carId);
        return car ? `${car.brand} ${car.model}` : '---';
      }
    },
    {
      title: 'Order date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Status',
      dataIndex: 'orderStatus',
      key: 'orderStatus',
      filters: [
        { text: 'New', value: ORDERS_STATUS.NEW },
        { text: 'Completed', value: ORDERS_STATUS.COMPLETED },
        { text: 'Canceled', value: ORDERS_STATUS.CANCELED },
      ],
      onFilter: (value, order) => order.orderStatus.includes(value),
      sorter: (a, b) => a.orderStatus.length - b.orderStatus.length,
      render: (text, order) => (
        <Space size="middle">
          <Select
            className="order-status-select"
            defaultValue={text}
            options={[
              { value: ORDERS_STATUS.NEW, label: <Tag style={{ width: '90px' }} color="blue">{ORDERS_STATUS.NEW}</Tag> },
              { value: ORDERS_STATUS.COMPLETED , label: <Tag style={{ width: '90px' }} color="green">{ORDERS_STATUS.COMPLETED}</Tag> },
              { value: ORDERS_STATUS.CANCELED , label: <Tag style={{ width: '90px' }} color="red">{ORDERS_STATUS.CANCELED}</Tag> }
            ]}
            onChange={(newStatus) => {
              const updatedOrder = {...order, orderStatus: newStatus};
              dispatch(editOrderAsync(updatedOrder));

              const orderedCar = cars.find(car => car.id === order.carId);
              if (orderedCar) {
                const isAvailable = newStatus === ORDERS_STATUS.CANCELED;
                const buyedCar = {...orderedCar, available: isAvailable};
                dispatch(editCarAsync(buyedCar));
              }
            }}
          />
          {order.orderStatus === ORDERS_STATUS.CANCELED && (
            <Button
              onClick={() => handleDeleteOrder(order.id)}
              type="primary"
              shape="circle"
              icon={<DeleteOutlined />}
            />
          )}
        </Space>
      )
    },
  ];

  const handleNavigateNewOrder = () => {
    navigate(`/new-order`);
  }

  return (
    <div>
      <div className="header-holder">
        <h1>Orders Page</h1>
        <Button onClick={handleNavigateNewOrder} type="primary">
          Create new order
          <PlusSquareOutlined />
        </Button>
      </div>
      <div>
        <Table columns={columns} dataSource={orders} rowKey="id" />
      </div>
    </div>
  );
}

export default OrdersPage;
