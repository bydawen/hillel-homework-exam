import React from 'react';
import { useState, useEffect } from 'react';
import {getCarsAsync, addCarAsync, editCarAsync} from '../../store/features/cars.js';
import { useDispatch, useSelector } from 'react-redux';
import { Result, Row, Col, Button, message } from 'antd';
import CarCard from "../../components/CarCard/CarCard.jsx";
import CarModal from "../../components/CarModal/CarModal.jsx";
import CarFilters from "../../components/CarFilters/CarFilters.jsx";

function CarsCatalog(props) {
  const dispatch = useDispatch();
  const cars = useSelector(state => state.cars.carsItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editCar, setEditCarId] = useState(null);
  const [filter, setFilter] = useState({
    brand: '',
    model: '',
    year: '',
    available: null,
  });

  const [messageApi, contextHolder] = message.useMessage();

  const showModal = () => {
    setEditCarId(null);
    setIsModalOpen(true);
  };

  const handleOk = (newCarData) => {
    if (editCar) {
      const editedCarData = { ...newCarData, id: editCar.id };
      dispatch(editCarAsync(editedCarData));
    } else {
      dispatch(addCarAsync(newCarData));
    }

    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleEditCar = (car) => {
    setEditCarId(car);
    setIsModalOpen(true);
  }

  const showFilteredCars = cars.filter(car => {
    const byBrand = (car.brand || '').toLowerCase().includes(filter.brand.toLowerCase());
    const byModel = (car.model || '').toLowerCase().includes(filter.model.toLowerCase());
    const byYear = (!filter.year || car.year === filter.year);
    const byAvailable = (filter.available === null || car.available === filter.available);

    return byBrand && byModel && byYear && byAvailable;
  });

  useEffect(() => {
    dispatch(getCarsAsync());
  }, [dispatch]);

  return (
    <div>
      {contextHolder}

      <Button type="primary" onClick={showModal}>
        Add new car
      </Button>

      <CarFilters filter={filter} setFilter={setFilter} />

      <Row gutter={[16, 16]}>
        {showFilteredCars.length === 0 && (
          <Col span={24}>
            <Result
              status="warning"
              title="No results found!"
            />
          </Col>
        )}

        {showFilteredCars.map(car => (
          <Col span={8} key={car.id}>
            <CarCard
              carId={car.id}
              carBrand={car.brand}
              carModel={car.model}
              carYear={car.year}
              carPrice={car.price}
              carImage={car.image}
              available={car.available}
              messageApi={messageApi}
              editCar={() => handleEditCar(car)}
            />
          </Col>
        ))}
      </Row>

      <CarModal isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} currentCar={editCar} />

    </div>
  );
}

export default CarsCatalog;
