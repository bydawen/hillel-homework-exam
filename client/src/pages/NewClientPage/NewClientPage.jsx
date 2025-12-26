import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addClientAsync } from '../../store/features/clients.js';
import { Card, Typography } from 'antd';

import ClientAddForm from '../../components/ClientAddForm/ClientAddForm.jsx';

function NewClientPage(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddClient = (values) => {
    dispatch(addClientAsync(values));
    navigate('/clients');
  };

  return (
    <div>
      <div className="header-holder">
        <h1>New client page</h1>
        <Typography.Text type="secondary">
          Please fill in the information below to register a new client in the system.
        </Typography.Text>
      </div>
      <Card
        style={{ width: '100%', maxWidth: 800, alignSelf: 'flex-start' }}
      >
        <ClientAddForm onFinish={handleAddClient} />
      </Card>
    </div>
  );
}

export default NewClientPage;
