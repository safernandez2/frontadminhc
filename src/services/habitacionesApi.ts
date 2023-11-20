import axios, { AxiosResponse } from 'axios';

export const habitacionesApiUrl = 'http://localhost:3000/habitaciones';

export interface Habitacion {
  habitacionid: number;
  nombreHabitacion: string;
  descripcion: string;
  capacidad: number;
  disponible: boolean;
}

export const fetchHabitaciones = async (): Promise<Habitacion[]> => {
    const response: AxiosResponse<Habitacion[]> = await axios.get(habitacionesApiUrl);
    return response.data;
  };
export const createHabitacion = async (habitacion: Habitacion): Promise<Habitacion> => {
  const response: AxiosResponse<Habitacion> = await axios.post(habitacionesApiUrl, habitacion);
  return response.data;
};

export const fetchHabitacion = async (habitacionid: number): Promise<Habitacion> => {
    const url = `${habitacionesApiUrl}/${habitacionid}`;
    const response: AxiosResponse<Habitacion> = await axios.get(url);
    return response.data;
  };
  
export const updateHabitacion = async (habitacionid: number, habitacion: Habitacion): Promise<Habitacion> => {
  const url = `${habitacionesApiUrl}/${habitacionid}`;
  const response: AxiosResponse<Habitacion> = await axios.put(url, habitacion);
  return response.data;
};

export const deleteHabitacion = async (habitacionid: number): Promise<void> => {
  const url = `${habitacionesApiUrl}/${habitacionid}`;
  await axios.delete(url);
};
