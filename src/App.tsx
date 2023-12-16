import React from 'react';
import './App.css';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import HabitacionesTable from './pages/Habitaciones';
import RootLayout from './layouts/RootLayout';
import { Home } from './pages/Home';
import ReservasTable from './pages/Reservas';

const router = createBrowserRouter(
  createRoutesFromElements(
  <Route path="/" element={<RootLayout />}>
      <Route index element = {<Home/>}/>
      <Route path='habitaciones' element={<HabitacionesTable/>} />
      <Route path='reservas' element={<ReservasTable/>}/>

  </Route>
))

function App() {
  return (
   <RouterProvider router={router}></RouterProvider>
  );
};


export default App;
