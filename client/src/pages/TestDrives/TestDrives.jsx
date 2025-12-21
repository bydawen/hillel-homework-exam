import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table } from 'antd';
import { PlusSquareOutlined } from '@ant-design/icons';
import { getTestDrivesAsync, editTestDriveAsync } from "../../store/features/testDrives.js";
import { getClientsAsync } from "../../store/features/clients.js";
import { getCarsAsync } from "../../store/features/cars.js";
import TestDriveModal from "../../components/TestDriveModal/TestDriveModal.jsx";

function TestDrives() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const testDrives = useSelector(state => state.testDrives.testDrivesItems);
  const clients = useSelector(state => state.clients.clientsItems);
  const cars = useSelector(state => state.cars.carsItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTestDrive, setSelectedTestDrive] = useState(null);

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

  const carsFiler = cars.map(car => ({ text: `${car.brand} ${car.model}`, value: car.id }));
  const clientsFiler = clients.map(client => ({ text: client.name, value: client.id }));

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

  const columns = [
    {
      title: 'Status',
      dataIndex: 'testDriveStatus',
      key: 'testDriveStatus',
      filters: [
        { text: 'New', value: 'NEW' },
        { text: 'Pass', value: 'PASS' },
        { text: 'Canceled', value: 'CANCELED' },
      ],
      onFilter: (value, testDrive) => testDrive.testDriveStatus.includes(value),
      sorter: (a, b) => a.testDriveStatus.length - b.testDriveStatus.length,
    },
    {
      title: 'Car',
      dataIndex: 'carId',
      key: 'carId',
      filters: carsFiler,
      filterSearch: true,
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
      title: 'Test drive verdict',
      key: 'testDriveVerdict',
      render: (_, item) => (
        item.testDriveStatus === 'NEW' ? (
          <Button type="primary" onClick={() => showTestDriveModal(item)}>
            Confirm test drive
          </Button>
        ) : (
          'DONE'
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
      <Table columns={columns} dataSource={testDrives} rowKey="id" />
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
