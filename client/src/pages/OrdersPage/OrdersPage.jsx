import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Select, Button } from 'antd';
import { PlusSquareOutlined } from '@ant-design/icons';
import { getOrdersAsync } from "../../store/features/orders.js";
import { getClientsAsync } from "../../store/features/clients.js";
import { getCarsAsync } from "../../store/features/cars.js";
import { editOrderAsync } from "../../store/features/orders.js";

function OrdersPage(props) {
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
        { text: 'New', value: 'NEW' },
        { text: 'Completed', value: 'COMPLETED' },
      ],
      onFilter: (value, order) => order.orderStatus.includes(value),
      sorter: (a, b) => a.orderStatus.length - b.orderStatus.length,
      render: (text, order) => (
        <Select
          defaultValue={text}
          style={{ width: 120 }}
          options={[
            { value: 'NEW', label: 'New' },
            { value: 'COMPLETED', label: 'Completed'}
          ]}
          onChange={(newStatus) => {
            const updatedOrder = {...order, orderStatus: newStatus};
            dispatch(editOrderAsync(updatedOrder));
          }}
        />
      )
    },
  ];

  const handleNavigateNewOrder = () => {
    navigate(`/new-order`);
  }

  return (
    <div>
      <h1>Orders Page</h1>
      <Button onClick={handleNavigateNewOrder} type="primary">
        Create new order
        <PlusSquareOutlined />
      </Button>
      <div>
        <Table columns={columns} dataSource={orders} rowKey="id" />
      </div>
    </div>
  );
}

export default OrdersPage;
