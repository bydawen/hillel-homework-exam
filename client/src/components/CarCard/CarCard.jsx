import React from 'react';
import { Card, Popconfirm  } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { deleteCarAsync } from '../../store/features/cars.js';

const { Meta } = Card;

function CarCard({ messageApi, carId, carBrand, carModel, carYear, carPrice, carImage, available, editCar }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteCarAsync(carId));
    messageApi.success('Car deleted successfully!');
  }

  const handleEdit = () => {
    editCar();
  }

  return (
    <>
      <Card
        hoverable
        cover={<img src={carImage} alt={carBrand + ' ' + carModel} />}
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
        <Meta title={carBrand + ' ' + carModel} description={`$${carPrice} | ${carYear} | ${available ? 'Available' : 'Sold'}`} />
      </Card>
    </>
  );
}

export default CarCard;
