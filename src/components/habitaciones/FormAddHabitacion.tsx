import React from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';

const FormAddHabitacion: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      // Validar que la capacidad sea un número válido
      const capacidadValue = parseInt(values.capacidad, 10);
      if (isNaN(capacidadValue)) {
        throw new Error('La capacidad debe ser un número válido');
      }

      values.capacidad = capacidadValue;

      await axios.post('http://localhost:3000/habitaciones/add', values);
      console.log('Habitación agregada correctamente');
      message.success('Habitación agregada correctamente');
      form.resetFields();
    } catch (error) {
      console.error('Error al agregar habitación', error);
      message.error('Error al agregar habitación');
    }
  };

  const handleClick = async () => {
    try {
      // Validar todos los campos antes de enviar
      await form.validateFields();
      const values = form.getFieldsValue();
      await onFinish(values);
    } catch (error) {
      console.error('Error al validar campos', error);
    }
  };

  return (
    <Form form={form} name="form_item_path" layout="vertical" onFinish={onFinish}>
      <Form.Item name="nombreHabitacion" label="Nombre de la Habitación" rules={[{ required: true, message: 'Ingrese el nombre de la habitación' }]}>
        <Input />
      </Form.Item>

      <Form.Item name="descripcion" label="Descripción">
        <Input />
      </Form.Item>

      <Form.Item name="capacidad" label="Capacidad" rules={[
        { required: true, message: 'Ingrese la capacidad de la habitación' },
        // Agregar regla personalizada para validar que es un número
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (isNaN(parseInt(value, 10))) {
              return Promise.reject('La capacidad debe ser un número válido');
            }
            return Promise.resolve();
          },
        }),
      ]}>
        <Input type="number" />
      </Form.Item>

      <Button type="primary" onClick={handleClick}>
        Agregar Habitación
      </Button>
    </Form>
  );
};

export default FormAddHabitacion;
