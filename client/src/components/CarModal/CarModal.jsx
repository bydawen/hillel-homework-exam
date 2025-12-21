import React, { useState, useEffect } from 'react';
import { Modal, Form } from 'antd';
import CarAddForm from "../CarAddForm/CarAddForm.jsx";

function CarModal({ isModalOpen, handleOk, handleCancel, currentCar }) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (isModalOpen) {
      if (currentCar) {
        form.setFieldsValue(currentCar);
      } else {
        form.resetFields();
      }
    }
  }, [isModalOpen, currentCar, form]);

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      console.log('new car data', values);
      handleOk(values);
      form.resetFields();
    } catch (error) {
      console.log('error', error);
    }
  }

  return (
    <Modal
      title={currentCar ? 'Edit car' : 'Add new car'}
      open={isModalOpen}
      onOk={handleModalOk}
      onCancel={handleCancel}
      afterClose={() => form.resetFields()}
    >
      <CarAddForm form={form} />
    </Modal>
  );
}

export default CarModal;
