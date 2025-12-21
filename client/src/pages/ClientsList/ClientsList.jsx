import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getClientsAsync } from "../../store/features/clients.js";
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table } from 'antd';

function ClientsList(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clients = useSelector(state => state.clients.clientsItems);

  const handleNavigateNewClient = () => {
    navigate(`/new-client`);
  }

  useEffect(() => {
    dispatch(getClientsAsync());
  }, [dispatch])

  const columns = [
    {
      title: 'Full Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email address',
      dataIndex: 'email',
      key: 'email',
    },
  ]

  return (
    <div>
      <h1>
        Clients List
      </h1>
      <Button type="primary" onClick={handleNavigateNewClient}>
        Add new client
      </Button>

      <div>
        <Table
          columns={columns}
          dataSource={clients}
          rowKey="id"
          onRow={(clientItem) => ({
            onClick: () => navigate(`/clients/${clientItem.id}`),
          })}
        />
      </div>
    </div>
  );
}

export default ClientsList;
