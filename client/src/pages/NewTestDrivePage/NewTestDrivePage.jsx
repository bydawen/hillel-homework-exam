import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Button, Select, Row, Col, DatePicker, Card, Typography } from 'antd';
import { getClientsAsync } from "../../store/features/clients.js";
import { getCarsAsync } from '../../store/features/cars.js';
import { addTestDriveAsync } from '../../store/features/testDrives.js';
import { TEST_DRIVES_STATUS } from "../../common/testDrivesStatus.js";
import dayjs from 'dayjs';

function NewTestDrivePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clients = useSelector(state => state.clients.clientsItems);
  const cars = useSelector(state => state.cars.carsItems);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    dispatch(getClientsAsync());
    dispatch(getCarsAsync());
  }, [dispatch]);

  const handleCreateTestDrive = () => {
    const testDrive = {
      clientId: selectedClient,
      carId: selectedCar,
      testDriveDate: selectedDate,
      testDriveStatus: TEST_DRIVES_STATUS.NEW,
    }

    dispatch(addTestDriveAsync(testDrive));
    navigate('/test-drives');
  }

  const availableCars = cars.filter(car => car.available);

  return (
    <div>
      <div className="header-holder">
        <h1>
          Create new test drive
        </h1>
        <Typography.Text type="secondary">
          To assign test drive, choose the client and the car from the catalog. Also, specify the date of the test drive.
        </Typography.Text>
      </div>

      <Card
        style={{ width: '100%', alignSelf: 'flex-start' }}
      >
        <Row gutter={[0, 16]}>
          <Col span={24}>
            <Select
              style={{ width: '100%' }}
              showSearch={{ optionFilterProp: 'label' }}
              placeholder="Select client for test drive"
              onChange={setSelectedClient}
              options={clients.map(client => ({
                value: client.id,
                label: `${client.name} ${client.phone}`
              }))}
            />
          </Col>
          <Col span={24}>
            <Select
              style={{ width: '100%' }}
              showSearch={{ optionFilterProp: 'label' }}
              placeholder="Select car for test drive"
              onChange={setSelectedCar}
              options={availableCars.map(car => ({
                value: car.id,
                label: `${car.brand} ${car.model} ($${car.price})`
              }))}
            />
          </Col>
          <Col span={24}>
            <DatePicker
              style={{ width: '100%' }}
              onChange={(date, dateString) => setSelectedDate(dateString)}
              disabledDate={(current) => {
                return current && current < dayjs().startOf('day');
              }}
            />
          </Col>
          <Col span={24}>
            <Button type="primary" onClick={handleCreateTestDrive} disabled={!selectedClient || !selectedCar || !selectedDate}>
              Save test drive
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default NewTestDrivePage;
