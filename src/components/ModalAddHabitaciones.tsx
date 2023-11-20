import React from 'react';
import { Form, Input, Button, message, Modal } from 'antd';
import * as habitacionesApi from '../services/habitacionesApi';

interface ModalAddHabitacionProps {
  visible: boolean;
  onCancel: () => void;
  onAddSuccess: () => void;
}

const ModalAddHabitacion: React.FC<ModalAddHabitacionProps> = ({visible, onCancel, onAddSuccess }) => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      await habitacionesApi.createHabitacion(values);
      console.log('Habitación agregada correctamente');
      message.success('Habitación agregada correctamente');
      onAddSuccess(); // Puedes agregar más lógica aquí, como recargar la lista de habitaciones, etc.
    } catch (error) {
      console.error('Error al agregar habitación:', error);
      // Puedes manejar el error de acuerdo a tus necesidades
      message.error('Error al agregar habitación');
    }
  };

  return (
    <Modal
      title="Agregar Habitación"
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
    <Form form={form} name="form_add_habitacion" layout="vertical" onFinish={onFinish}>
      <Form.Item name="nombreHabitacion" label="Nombre de la Habitación" rules={[{ required: true, message: 'Ingrese el nombre de la habitación' }]}>
        <Input />
      </Form.Item>

      <Form.Item name="descripcion" label="Descripción" rules={[{ required: true, message: 'Ingrese la descripcion de la habitación' }]}>
        <Input />
      </Form.Item>

      <Form.Item name="capacidad" label="Capacidad" rules={[{ required: true, message: 'Ingrese la capacidad de la habitación' }]}>
        <Input type="number" />
      </Form.Item>

      <Button type="primary" htmlType="submit">
        Agregar Habitación
      </Button>
    </Form>
    </Modal>
  );
};

export default ModalAddHabitacion;
