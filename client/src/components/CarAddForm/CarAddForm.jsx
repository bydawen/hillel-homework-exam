import React from 'react';
import { Form, Input, InputNumber, Switch, Row, Col } from 'antd';

import './CarAddForm.scss';

function CarAddForm(props) {
  return (
    <>
      <Form
        form={props.form}
        name="basic"
        initialValues={{ remember: true }}
        layout="vertical"
        autoComplete="off"
      >
        <Form.Item
          label="Brand"
          name="brand"
          rules={[{ required: true, message: 'Please input the brand!' }]}
        >
          <Input placeholder="Enter brand of a car" />
        </Form.Item>
        <Form.Item
          label="Model"
          name="model"
          rules={[{ required: true, message: 'Please input the model!' }]}
        >
          <Input placeholder="Enter model of a car" />
        </Form.Item>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: 'Please input the price!' }]}
            >
              <InputNumber placeholder="Price of a car" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Year"
              name="year"
              rules={[{ required: true, message: 'Please input the year!' }]}
            >
              <InputNumber placeholder="Year of a car" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Availability"
              name="available"
              rules={[{ required: true, message: 'Please select availability!' }]}
              valuePropName="checked"
            >
              <Switch checkedChildren="YES" unCheckedChildren="NO" defaultChecked />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default CarAddForm;