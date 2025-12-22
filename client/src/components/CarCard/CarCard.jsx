import React from 'react';
import { Card, Popconfirm, Badge } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { deleteCarAsync } from '../../store/features/cars.js';
import { CARS_STATUS } from "../../common/carsStatus.js";

import './CarCard.scss';

function CarCard({ messageApi, carId, carBrand, carModel, carYear, carPrice, carImage, available, isCheckout, editCar }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteCarAsync(carId));
    messageApi.success('Car deleted successfully!');
  }

  const handleEdit = () => {
    editCar();
  }

  const { Meta } = Card;

  return (
    <>
      <Badge.Ribbon
        text={isCheckout ? CARS_STATUS.CHECKOUT : available ? CARS_STATUS.AVAILABLE : CARS_STATUS.SOLD}
        color={isCheckout ? 'blue' : available ? 'green' : 'red'}
      >
        <Card
          hoverable
          cover={<img src={carImage} alt={carBrand + ' ' + carModel} />}
          className="car-card"
          actions={[
            <EditOutlined style={{ color: "lightblue" }} onClick={handleEdit} key="edit" />,
            <Popconfirm
              title={`Delete ${carBrand} ${carModel}?`}
              description="Are you sure to delete this car?"
              onConfirm={handleDelete}
              okText="Yes"
              cancelText="No"
              key="delete"
            >
              <DeleteOutlined style={{ color: 'red' }} />
            </Popconfirm>
          ]}
        >
          <Meta
            title={carBrand + ' ' + carModel}
            description={`$${carPrice} | ${carYear}`}
          />

        </Card>
      </Badge.Ribbon>
    </>
  );
}

export default CarCard;
