import React from 'react';
import {Input, InputNumber, Select, Col, Row} from "antd";

function CarFilters({ filter, setFilter }) {
  return (
    <Row gutter={16}>
      <Col span={6}>
        <Input value={filter.brand} onChange={(e) => setFilter({...filter, brand: e.target.value})} allowClear placeholder="by brand" />
      </Col>
      <Col span={6}>
        <Input value={filter.model} onChange={(e) => setFilter({...filter, model: e.target.value})} allowClear placeholder="by model" />
      </Col>
      <Col span={6}>
        <InputNumber value={filter.year} onChange={(value) => setFilter({...filter, year: value})} style={{ width: '100%' }} placeholder="by year" />
      </Col>
      <Col span={6}>
        <Select
          value={filter.available}
          onChange={(value) => setFilter({...filter, available: value ?? null})}
          allowClear
          placeholder="Availability"
          style={{ width: '100%' }}
          options={[
            { value: true, label: 'Yes' },
            { value: false, label: 'No' },
          ]}
        />
      </Col>
    </Row>
  );
}

export default CarFilters;