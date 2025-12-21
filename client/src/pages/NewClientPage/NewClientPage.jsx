import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addClientAsync } from '../../store/features/clients.js';

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
      <h1>New client page</h1>
      <ClientAddForm onFinish={handleAddClient} />
    </div>
  );
}

export default NewClientPage;
