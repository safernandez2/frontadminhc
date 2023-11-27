// ModalEditHabitacion.tsx
import React, { useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import * as habitacionesApi from '../services/habitacionesApi';

interface ModalEditHabitacionProps {
  habitacionid: number;
  onEditSuccess: () => void;
}

const ModalEditHabitacion: React.FC<ModalEditHabitacionProps> = ({ habitacionid, onEditSuccess }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    const obtenerDatosHabitacion = async () => {
      try {
        const habitacion = await habitacionesApi.fetchHabitacion(habitacionid);
        form.setFieldsValue({
          nombreHabitacion: habitacion.nombreHabitacion,
          descripcion: habitacion.descripcion,
          capacidad: habitacion.capacidad,
        });
      } catch (error) {
        console.error('Error al obtener datos de habitación para editar:', error);
      }
    };

    obtenerDatosHabitacion();
  }, [habitacionid, form]);

  const onFinish = async (values: any) => {
    try {
      await habitacionesApi.updateHabitacion(habitacionid, values);

      console.log('Habitación editada correctamente');
      message.success('Habitación editada correctamente');
      onEditSuccess();
    } catch (error) {
      console.error('Error al editar habitación', error);
      message.error('Error al editar habitación');
    }
  };

  return (
    <Form form={form} name="form_edit_habitacion" layout="vertical" onFinish={onFinish}>
      <Form.Item name="nombreHabitacion" label="Nombre de la Habitación" rules={[{ required: true, message: 'Ingrese el nombre de la habitación' }]}>
        <Input />
      </Form.Item>

      <Form.Item name="descripcion" label="Descripción">
        <Input />
      </Form.Item>

      <Form.Item name="capacidad" label="Capacidad" rules={[{ required: true, message: 'Ingrese la capacidad de la habitación' }]}>
        <Input type="number" />
      </Form.Item>

      <Button type="primary" htmlType="submit">
        Guardar Cambios
      </Button>
    </Form>
  );
};

export default ModalEditHabitacion;