// ModalEditHabitacion.tsx
import React, { useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';

interface ModalEditHabitacionProps {
  habitacionid: number;
  onEditSuccess: () => void;
}

const ModalEditHabitacion: React.FC<ModalEditHabitacionProps> = ({ habitacionid, onEditSuccess }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    const obtenerDatosHabitacion = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/habitaciones/${habitacionid}`);
        const habitacion = response.data;

        // Establecer los valores iniciales del formulario
        form.setFieldsValue({
          nombreHabitacion: habitacion.nombre_habitacion,
          descripcion: habitacion.descripcion,
          capacidad: habitacion.capacidad,
        });
      } catch (error) {
        console.error('Error al obtener datos de habitación para editar:', error);
      }
    };

    // Llama a la función al cargar el componente
    obtenerDatosHabitacion();
  }, [habitacionid, form]);

  const onFinish = async (values: any) => {
    try {
      const response = await axios.put(`http://localhost:3000/habitaciones/edit/${habitacionid}`, values);

      if (response.status === 200) {
        console.log('Habitación editada correctamente');
        message.success('Habitación editada correctamente');
        onEditSuccess();
      } else {
        console.error('Error al editar habitación');
        message.error('Error al editar habitación');
      }
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
