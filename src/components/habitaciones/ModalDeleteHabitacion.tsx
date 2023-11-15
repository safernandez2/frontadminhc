import React from 'react';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Modal, Space } from 'antd';
import axios from 'axios';

const { confirm } = Modal;

interface ModalDeleteHabitacionProps {
  habitacionid: number;
  onDeleteSuccess: () => void;
}

const ModalDeleteHabitacion: React.FC<ModalDeleteHabitacionProps> = ({ habitacionid, onDeleteSuccess }) => {
  const showDeleteConfirm = () => {
    confirm({
      title: '¿Está seguro de eliminar esta habitación?',
      icon: <ExclamationCircleFilled />,
      content: 'Esta acción no se puede deshacer.',
      okText: 'Sí',
      okType: 'danger',
      cancelText: 'No',
      onOk: handleDelete,
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:3000/habitaciones/delete/${habitacionid}`);
      
      if (response.status === 200) {
        console.log('Habitación eliminada correctamente');
        onDeleteSuccess(); // Llamar a la función de éxito después de la eliminación
      } else {
        console.error('Error al eliminar la habitación');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  return (
    <Space wrap>
      <Button onClick={showDeleteConfirm} type="dashed">
        Eliminar
      </Button>
    </Space>
  );
};

export default ModalDeleteHabitacion;
