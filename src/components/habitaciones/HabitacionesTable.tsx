import React, { useState, useEffect } from 'react';
import { Space, Table, Tag, Button, Modal } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import ModalAddHabitacion from './ModalAddHabitaciones';
import ModalDeleteHabitacion from './ModalDeleteHabitacion';
import ModalEditHabitacion from './ModalEditHabitacion';
import axios from 'axios';

interface DataType {
  key: string;
  habitacionid: number;
  nombre_habitacion: string;
  descripcion: string;
  capacidad: number;
  disponible: boolean;
}

const HabitacionesTable: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedHabitacionId, setSelectedHabitacionId] = useState<number | null>(null);

  // Función para obtener datos de habitaciones desde el backend
  const obtenerDatosHabitaciones = async () => {
    try {
      const response = await axios.get('http://localhost:3000/habitaciones');
      setData(response.data);
    } catch (error) {
      console.error('Error al obtener datos de habitaciones:', error);
    }
  };

  useEffect(() => {
    // Llama a la función al cargar el componente
    obtenerDatosHabitaciones();
  }, []); // El segundo parámetro [] significa que se ejecutará solo una vez al montar el componente

  const actualizarDatos = async () => {
    await obtenerDatosHabitaciones();
  };

  const handleEditClick = (habitacionId: number) => {
    setSelectedHabitacionId(habitacionId);
    setModalVisible(true);
  };

  const handleEditSuccess = () => {
    setModalVisible(false);
    // Puedes realizar otras acciones después de editar aquí si es necesario
    actualizarDatos();
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'HabitacionID',
      dataIndex: 'habitacionid',
      key: 'habitacionid',
    },
    {
      title: 'Nombre_habitacion',
      dataIndex: 'nombreHabitacion',
      key: 'nombreHabitacion',
    },
    {
      title: 'Descripcion',
      dataIndex: 'descripcion',
      key: 'descripcion',
    },
    {
      title: 'Capacidad',
      dataIndex: 'capacidad',
      key: 'capacidad',
    },
    {
      title: 'Disponible',
      dataIndex: 'disponible',
      key: 'disponible',
      render: (isDisponible) => <span>{isDisponible ? 'Disponible' : 'No disponible'}</span>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleEditClick(record.habitacionid)}>
            Editar
          </Button>
          <ModalDeleteHabitacion habitacionid={record.habitacionid} onDeleteSuccess={actualizarDatos} />
        </Space>
      ),
    },
  ];

  return (
    <>
      <ModalAddHabitacion />
      <Table columns={columns} dataSource={data} />
      {modalVisible && (
        <Modal
          title="Editar Habitación"
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={null}
        >
          <ModalEditHabitacion
            habitacionid={selectedHabitacionId || 0}
            onEditSuccess={handleEditSuccess}
          />
        </Modal>
      )}
    </>
  );
};

export default HabitacionesTable;
