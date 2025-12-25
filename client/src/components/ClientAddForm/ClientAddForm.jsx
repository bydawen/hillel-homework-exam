import React from 'react';
import { Form, Input, Button } from 'antd';
import {PHONE_PATTERN, PHONE_PREFIX} from '../../common/patterns.js';

import './ClientAddForm.scss';

function ClientAddForm(props) {

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
        initialValue={PHONE_PREFIX}
        rules={[
          {
            required: true,
            message: 'Please enter the phone number!',
          },
          {
            pattern: PHONE_PATTERN,
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