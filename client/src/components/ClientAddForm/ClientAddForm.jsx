import React from 'react';
import { Form, Input, Button } from 'antd';

import './ClientAddForm.scss';

function ClientAddForm(props) {
  const phonePattern = /^\+380\d{9}$/;

  return (
    <Form
      form={props.form}
      onFinish={props.onFinish}
      name="basic"
      initialValues={{ remember: true }}
      layout="vertical"
      autoComplete="off"
    >
      <Form.Item
        label="Client name"
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
        <Input maxLength={13} size="large" placeholder="Phone number" />
      </Form.Item>
      <Form.Item
        label="Client email"
        name="email"
        rules={[{ message: 'Please enter the client email address!', type: 'email' }]}
      >
        <Input size="large" placeholder="Email address" />
      </Form.Item>
      <Button type="primary" htmlType="submit">Save client</Button>
    </Form>
  );
}

export default ClientAddForm;