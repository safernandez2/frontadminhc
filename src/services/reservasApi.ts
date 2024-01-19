import axios, { AxiosResponse } from 'axios';

export const reservasApiUrl = 'http://localhost:3000/reservas';

export interface Reserva {
  reservaid:number; 
  habitacionid: number;
  nombreCliente: string;
  correoCliente: string;
  fechaInicio: Date;
  fechaFin: Date;
  estado: string;
  numeroCliente: string;
}

export const fetchReservas = async (): Promise<Reserva[]> => {
    const response: AxiosResponse<Reserva[]> = await axios.get(reservasApiUrl);
    return response.data;
  };
export const createReserva = async (data: Reserva | FormData): Promise<Reserva> => {
  const response: AxiosResponse<Reserva> = await axios.post(reservasApiUrl, data);
  return response.data;
};

export const fetchReserva = async (reservaid: number): Promise<Reserva> => {
  const url = `${reservasApiUrl}/${reservaid}`;
  const response: AxiosResponse<Reserva> = await axios.get(url);
  return response.data;
};
