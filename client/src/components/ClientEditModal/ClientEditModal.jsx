import React, { useEffect } from 'react';
import { Modal, Form, Input } from 'antd';

function ClientEditModal({ isModalOpen, handleOk, handleCancel, currentClient }) {
  const [form] = Form.useForm();
  const phonePattern = /^\+380\d{9}$/;

  useEffect(() => {
    if (currentClient) {
      form.setFieldsValue(currentClient);
    } else {
      form.resetFields();
    }
  }, [currentClient, form]);

  return (
    <Modal
      title={currentClient ? `Edit ${currentClient.name}` : "Edit Client"}
      open={isModalOpen}
      onOk={form.submit}
      onCancel={handleCancel}
    >
      <Form form={form} layout="vertical" onFinish={handleOk}>
        <Form.Item
          label="Edit name"
          name="name"
          rules={[{ required: true, message: 'Please enter the client name!' }]}
        >
          <Input size="large" placeholder="Client name" />
        </Form.Item>
        <Form.Item
          label="Phone number"
          name="phone"
          initialValue={'+380'}
          rules={[
            {
              required: true,
              message: 'Please enter the phone number!',
            },
            {
              pattern: phonePattern,
              message: 'Invalid phone number!',
            }
          ]}
        >
          <Input maxLength={13} size="large" placeholder="Edit client phone" />
        </Form.Item>
        <Form.Item
          label="Client email"
          name="email"
          rules={[{ message: 'Please enter the client email address!', type: 'email' }]}
        >
          <Input size="large" placeholder="Edit email address" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ClientEditModal;
