import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Result, Button } from 'antd';

function EmptyPage() {
  const navigate = useNavigate();

  const handleBackToMain = () => {
    navigate('/main');
  };

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button type="primary" onClick={handleBackToMain}>Back to Main Page</Button>}
    />
  );
}

export default EmptyPage;
