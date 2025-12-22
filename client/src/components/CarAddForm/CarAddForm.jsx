import React from 'react';
import { Form, Input, InputNumber, Switch, Row, Col } from 'antd';

import './CarAddForm.scss';

function CarAddForm(props) {
  return (
    <>
      <Form
        form={props.form}
        name="basic"
        initialValues={{
          remember: true,
          available: true
        }}
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
        <Form.Item
          label="Car image"
          name="image"
          rules={[{ message: 'Please add car image url!' }]}
        >
          <Input placeholder="Add car image URL" />
        </Form.Item>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="Price"
              name="price"
              rules={[
                {
                required: true,
                message: 'Please input the price!'
                },
                {
                  type: 'number',
                  min: 1,
                  message: 'Price must be bigger than 0 !'
                }
              ]}
            >
              <InputNumber placeholder="Price of a car" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Year"
              name="year"
              rules={[
                {
                  required: true,
                  message: 'Please input the year!'
                },
                {
                  type: 'number',
                  min: 1900,
                  message: 'Year must be greater than 1900 !'
                }
              ]}
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
              <Switch checkedChildren="YES" unCheckedChildren="NO" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default CarAddForm;