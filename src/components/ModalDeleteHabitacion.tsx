import React from 'react';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Modal, Space } from 'antd';
import * as habitacionesApi from '../services/habitacionesApi';

const { confirm } = Modal;

interface ModalDeleteHabitacionProps {
  habitacionid: number;
  onDeleteSuccess: () => void;
}

const ModalDeleteHabitacion: React.FC<ModalDeleteHabitacionProps> = ({ habitacionid, onDeleteSuccess }) => {
  const showDeleteConfirm = () => {
    confirm({
      title: '¿Está seguro de eliminar esta habitación lklkl?',
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
      await habitacionesApi.deleteHabitacion(habitacionid);
      console.log('Habitación eliminada correctamente');
      onDeleteSuccess(); // Llamar a la función de éxito después de la eliminación
    } catch (error: any) {
      console.error('Error al eliminar la habitación:', error.message);
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
