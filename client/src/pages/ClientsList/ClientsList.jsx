import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getClientsAsync, editClientAsync } from "../../store/features/clients.js";
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table } from 'antd';
import { PlusSquareOutlined, EditOutlined } from "@ant-design/icons";
import ClientEditModal from "../../components/ClientEditModal/ClientEditModal.jsx";

function ClientsList(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clients = useSelector(state => state.clients.clientsItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedClient, setEditedClient] = useState(null);

  const handleNavigateNewClient = () => {
    navigate(`/new-client`);
  }

  useEffect(() => {
    dispatch(getClientsAsync());
  }, [dispatch]);

  const handleEditClient = (client) => {
    setEditedClient(client);
    setIsModalOpen(true);
  };

  const handleOk = (updatedClient) => {
    if (editedClient) {
      const editedClientData = { ...editedClient, ...updatedClient };
      dispatch(editClientAsync(editedClientData));
      setIsModalOpen(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
    {
      title: 'Edit',
      dataIndex: 'edit',
      key: 'edit',
      render: (_, client) => (
        <Button
          shape="circle"
          icon={<EditOutlined />}
          onClick={(e) => {
            e.stopPropagation();
            handleEditClient(client);
          }}
        />
      ),
    },
  ];

  return (
    <div>
      <div className="header-holder">
        <h1>
          Clients List
        </h1>
        <Button type="primary" onClick={handleNavigateNewClient}>
          Add new client
          <PlusSquareOutlined />
        </Button>
      </div>

      <div>
        <Table
          columns={columns}
          dataSource={clients}
          rowKey="id"
          onRow={(clientItem) => ({
            onClick: () => navigate(`/clients/${clientItem.id}`),
          })}
        />

        <ClientEditModal isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} currentClient={editedClient} />
      </div>
    </div>
  );
}

export default ClientsList;
