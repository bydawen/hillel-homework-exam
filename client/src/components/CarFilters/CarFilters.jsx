import React from 'react';
import { Input, InputNumber, Select, Col, Row, Button } from "antd";
import {ClearOutlined} from "@ant-design/icons";

import './CarFilters.scss';

function CarFilters({ filter, setFilter }) {
  const clearFilters = () => setFilter({
    brand: '',
    model: '',
    year: null,
    available: null,
  });

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
      <Col span={5}>
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
      <Col span={1}>
        <Button
          className="clear-filters-btn"
          onClick={clearFilters}
          type="default"
          shape="circle"
          icon={<ClearOutlined />}
          disabled={!filter.brand && !filter.model && !filter.year && filter.available === null}
        />
      </Col>
    </Row>
  );
}

export default CarFilters;
