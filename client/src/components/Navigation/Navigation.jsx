import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Menu } from 'antd';
import { LogoutOutlined } from "@ant-design/icons";
import { logout } from '../../store/features/authorization.js';

function Navigation() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const menuItems = [
    {
      key: '/main',
      label: <Link to="/main">Main</Link>,
    },
    {
      key: '/cars',
      label: <Link to="/cars">Cars Catalog</Link>,
    },
    {
      key: '/clients',
      label: <Link to="/clients">Clients List</Link>,
    },
    {
      key: '/orders',
      label: <Link to="/orders">Orders</Link>,
    },
    {
      key: '/test-drives',
      label: <Link to="/test-drives">Test Drives</Link>,
    },
    {
      key: 'logout',
      label: 'Logout',
      icon: <LogoutOutlined />,
      onClick: handleLogout
    },
  ];

  return (
    <Menu
      items={menuItems}
      mode="vertical"
      style={{ width: 256 }}
    />
  );
}

export default Navigation;