import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginAsync } from '../../store/features/authorization.js';

import { Form, Input, Button, Alert } from 'antd';

function AuthorizationPage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginError = useSelector(state => state.authorization.loginError);

  const handleLogin = (values) => {
    dispatch(loginAsync(values))
    .unwrap()
    .then(() => {
      navigate('/main');
    })
    .catch((error) => {
      console.log('Auth failed', error);
    });
  };

  return (
    <Form
      onFinish={handleLogin}
    >
      <Form.Item
        name="login"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password placeholder="Password" />
      </Form.Item>
      {loginError &&
        <Alert title="Wrong login or password" type="error" />
      }
      <Button type="primary" htmlType="submit">
        Login
      </Button>
    </Form>
  );
}

export default AuthorizationPage;
