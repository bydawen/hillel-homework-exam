import React from 'react';
import { Button, Result, Card } from 'antd';


function Main() {
  return (
    <div>
      <Card
        style={{ width: '100%', alignSelf: 'flex-start' }}
      >
        <Result
          status="success"
          title="Welcome to Car Salon Dashboard !"
          subTitle="Please use navigation menu to navigate through the system, to make orders, assign test-drives or view aviable cars !"
        />
      </Card>
    </div>
  );
}

export default Main;
