import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table, Tag } from 'antd';
import { PlusSquareOutlined, ClearOutlined } from '@ant-design/icons';
import { getTestDrivesAsync, editTestDriveAsync } from "../../store/features/testDrives.js";
import { getClientsAsync } from "../../store/features/clients.js";
import { getCarsAsync } from "../../store/features/cars.js";
import TestDriveModal from "../../components/TestDriveModal/TestDriveModal.jsx";
import { TEST_DRIVES_STATUS } from "../../common/testDrivesStatus.js";

import './TestDrives.scss';

function TestDrives() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const testDrives = useSelector(state => state.testDrives.testDrivesItems);
  const clients = useSelector(state => state.clients.clientsItems);
  const cars = useSelector(state => state.cars.carsItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTestDrive, setSelectedTestDrive] = useState(null);
  const [isFiltered, setIsFiltered] = useState({});

  const showTestDriveModal = (testDriveItem) => {
    setIsModalOpen(true);
    setSelectedTestDrive(testDriveItem);
  }

  const handleOk = (updatedTestDrive) => {
    dispatch(editTestDriveAsync(updatedTestDrive));
    setIsModalOpen(false);
  }

  const handleNavigateNewTestDrive = () => {
    navigate(`/new-test-drive`);
  }

  useEffect(() => {
    dispatch(getTestDrivesAsync());
    dispatch(getClientsAsync());
    dispatch(getCarsAsync());
  }, [dispatch]);

  const testDriveCars = new Set(testDrives.map(testDrive => testDrive.carId));
  const carsFiler = cars.filter(car => testDriveCars.has(car.id)).map(car => ({ text: `${car.brand} ${car.model}`, value: car.id }));

  const testDriveClients = new Set(testDrives.map(testDrive => testDrive.clientId));
  const clientsFiler = clients.filter(client => testDriveClients.has(client.id)).map(client => ({ text: client.name, value: client.id }));

  const carsSorter = (a, b) => {
      const carA = cars.find(car => car.id === a.carId);
      const carB = cars.find(car => car.id === b.carId);
      return carA.brand.localeCompare(carB.brand);
  };
  const clientsSorter = (a, b) => {
    const clientA = clients.find(client => client.id === a.clientId);
    const clientB = clients.find(client => client.id === b.clientId);
    return clientA.name.localeCompare(clientB.name);
  };
  const dataSorter = (a, b) => new Date(a.testDriveDate) - new Date(b.testDriveDate);

  const clearFilters = () => {
    setIsFiltered({});
  }

  const statusColor = {
    [TEST_DRIVES_STATUS.NEW]: 'blue',
    [TEST_DRIVES_STATUS.PASS]: 'green',
    [TEST_DRIVES_STATUS.CANCELED]: 'red',
    [TEST_DRIVES_STATUS.DONE]: 'gold',
  }

  const columns = [
    {
      title: 'Status',
      dataIndex: 'testDriveStatus',
      key: 'testDriveStatus',
      filteredValue: isFiltered.testDriveStatus || null,
      filters: [
        { text: TEST_DRIVES_STATUS.NEW, value: TEST_DRIVES_STATUS.NEW },
        { text: TEST_DRIVES_STATUS.PASS, value: TEST_DRIVES_STATUS.PASS },
        { text: TEST_DRIVES_STATUS.CANCELED, value: TEST_DRIVES_STATUS.CANCELED },
      ],
      onFilter: (value, testDrive) => testDrive.testDriveStatus.includes(value),
      sorter: (a, b) => a.testDriveStatus.length - b.testDriveStatus.length,
      render: (status) => {
        return (
          <Tag color={statusColor[status]} key={status}>
            {status}
          </Tag>
        )
      }
    },
    {
      title: 'Car',
      dataIndex: 'carId',
      key: 'carId',
      filters: carsFiler,
      filterSearch: true,
      filteredValue: isFiltered.carId || null,
      onFilter: (value, testDrive) => {
        return testDrive.carId === value;
      },
      sorter: carsSorter,
      render: (carId) => {
        const car = cars.find(car => car.id === carId);
        return car ? `${car.brand} ${car.model}` : '---';
      }
    },
    {
      title: 'Client',
      dataIndex: 'clientId',
      key: 'clientId',
      filters: clientsFiler,
      filterSearch: true,
      filteredValue: isFiltered.clientId || null,
      onFilter: (value, testDrive) => {
        return testDrive.clientId === value;
      },
      sorter: clientsSorter,
      render: (clientId) => clients.find(client => client.id === clientId)?.name
    },
    {
      title: 'Test drive date',
      dataIndex: 'testDriveDate',
      key: 'testDriveDate',
      sorter: dataSorter,
    },
    {
      title: (
        <div className="test-drive-verdict-header">
          Test drive verdict
          {Object.keys(isFiltered).length > 0 && (
            <Button
              onClick={clearFilters}
              shape="circle"
              icon={<ClearOutlined />}
            />
          )}
        </div>
      ),
      key: 'testDriveVerdict',
      render: (_, item) => (
        item.testDriveStatus === TEST_DRIVES_STATUS.NEW ? (
          <Button type="primary" onClick={() => showTestDriveModal(item)}>
            Confirm test drive
          </Button>
        ) : (
          <Tag color={statusColor[TEST_DRIVES_STATUS.DONE]}>
            {TEST_DRIVES_STATUS.DONE}
          </Tag>
        )
      ),
    },
  ]

  return (
    <div>
      <h1>
        Test drives page
      </h1>
      <Button onClick={handleNavigateNewTestDrive} type="primary">
        Assign new test drive
        <PlusSquareOutlined />
      </Button>
      <Table
        columns={columns}
        dataSource={testDrives}
        onChange={(pagination, filters) => setIsFiltered(filters)}
        rowKey="id"
      />
      <TestDriveModal
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={() => setIsModalOpen(false)}
        selectedTestDrive={selectedTestDrive}
        clients={clients}
        cars={cars}
      />
    </div>
  );
}

export default TestDrives;
