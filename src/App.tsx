import React from 'react';
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import MenuComponent from './components/MenuComponent';
import HabitacionesTable from './components/habitaciones/HabitacionesTable';

const App = () => {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex' }}>
        {/* Renderiza el menú */}
        <MenuComponent />

        {/* Configura las rutas */}
        <Route>
          <Route path="/listhabitaciones" component={HabitacionesTable} />
          {/* Agrega más rutas según sea necesario */}
        </Route>
      </div>
    </BrowserRouter>
  );
};


export default App;
