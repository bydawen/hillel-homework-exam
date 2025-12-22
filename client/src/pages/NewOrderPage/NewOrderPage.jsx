import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getClientsAsync } from "../../store/features/clients.js";
import { getCarsAsync } from '../../store/features/cars.js';
import { getOrdersAsync, addOrderAsync } from '../../store/features/orders.js';
import { Button, Select, Row, Col } from 'antd';
import { ORDERS_STATUS } from "../../common/ordersStatus.js";

import './NewOrderPage.scss';

function NewOrderPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clients = useSelector(state => state.clients.clientsItems);
  const cars = useSelector(state => state.cars.carsItems);
  const orders = useSelector(state => state.orders.ordersItems);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);

  useEffect(() => {
    dispatch(getClientsAsync());
    dispatch(getCarsAsync());
    dispatch(getOrdersAsync());
  }, [dispatch]);

  const availableCars = cars.filter(car => car.available && !orders.some(order => order.carId === car.id && order.orderStatus === ORDERS_STATUS.NEW));

  const carOptions = availableCars.map(car => ({
    value: car.id,
    label: `${car.brand} ${car.model} $${car.price}`
  }));

  const clientOptions = clients.map(client => ({
    value: client.id,
    label: `${client.name} ${client.phone}`
  }));

  const handleCreateOrder = () => {
    const order = {
      clientId: selectedClient,
      carId: selectedCar,
      orderStatus: ORDERS_STATUS.NEW,
      date: new Date().toISOString().slice(0, 10),
    }
    dispatch(addOrderAsync(order));
    navigate('/orders');
  }

  return (
    <div>
      <h1>
        Create new order
      </h1>
      <Row gutter={[0, 16]}>
        <Col span={24}>
          <Select
            showSearch={{ optionFilterProp: 'label' }}
            placeholder="Select client"
            onChange={setSelectedClient}
            options={clientOptions}
            style={{ width: '100%' }}
          />
        </Col>
        <Col span={24}>
          <Select
            showSearch={{ optionFilterProp: 'label' }}
            placeholder="Select car"
            onChange={setSelectedCar}
            options={carOptions}
            style={{ width: '100%' }}
          />
        </Col>
        <Col span={24}>
          <Button onClick={handleCreateOrder} type="primary" disabled={!selectedClient || !selectedCar}>
            Create order
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default NewOrderPage;
