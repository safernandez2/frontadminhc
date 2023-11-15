import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import FormAddHabitacion from './FormAddHabitacion';

const ModalAddHabitacion: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        + Agregar habitación 
      </Button>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <FormAddHabitacion/>
      </Modal>
    </>
  );
};

export default ModalAddHabitacion;