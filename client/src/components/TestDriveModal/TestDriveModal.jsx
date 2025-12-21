import React, { useState, useEffect } from 'react';
import { Modal, Typography, Select, Row, Col } from 'antd';

const { Text } = Typography;

function TestDriveModal({ isModalOpen, handleOk, handleCancel, selectedTestDrive, clients, cars }) {
  const [testDriveStatus, settestDriveStatus] = useState(null);

  const testDriveClient = selectedTestDrive?.clientId ? clients.find(client => client.id === selectedTestDrive.clientId)?.name : '';
  const testDriveCar = selectedTestDrive?.carId ? cars.find(car => car.id === selectedTestDrive.carId)?.brand + ' ' + cars.find(car => car.id === selectedTestDrive.carId)?.model : '';

  const handleModalOk = () => {
    const updatedTestDrive = {
      ...selectedTestDrive,
      testDriveStatus,
    }
    handleOk(updatedTestDrive);
    settestDriveStatus(null);
  }

  const handleModalCancel = () => {
    handleCancel();
    settestDriveStatus(null);
  }

  return (
    <Modal
      title="Test drive results"
      open={isModalOpen}
      onOk={handleModalOk}
      onCancel={handleModalCancel}
    >
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Text>
            <b>Name of the client:</b>
            <br/>
            {testDriveClient}
          </Text>
          <Text>
            <b>Test drive car:</b>
            <br/>
            {testDriveCar}
          </Text>
        </Col>
        <Col span={24}>
          <Select
            placeholder="Result of test drive?"
            style={{ width: '100%' }}
            options={[
              { value: 'PASS', label: 'Pass' },
              { value: 'CANCELED', label: 'Canceled' },
            ]}
            onChange={(value) => settestDriveStatus(value ?? null)}
          />
        </Col>
      </Row>

    </Modal>
  );
}

export default TestDriveModal;