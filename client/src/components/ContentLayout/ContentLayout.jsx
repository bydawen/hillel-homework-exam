import React from 'react';
import { Outlet } from 'react-router-dom';
import { Row, Col } from 'antd';
import Navigation from "../Navigation/Navigation.jsx";

function ContentLayout() {
  return (
    <Row gutter={[16, 0]}>
      <Col xs={6} className="navigation">
        <Navigation />
      </Col>
      <Col xs={18} className="content">
        <div className="main">
          <Outlet />
        </div>
      </Col>
    </Row>
  );
}

export default ContentLayout;
