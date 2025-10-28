// Importa React para poder usar JSX y componentes
import React from 'react';
// Importa ReactDOM para renderizar la aplicación en el DOM
import ReactDOM from 'react-dom/client';
// Importa BrowserRouter para habilitar el enrutamiento con React Router
import { BrowserRouter } from 'react-router-dom';
// Importa el componente principal de la aplicación
import App from './App';
// Importa los estilos globales
import './index.css';

// Renderiza la aplicación dentro del elemento con id "root"
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Habilita el enrutamiento en toda la app */}
    <BrowserRouter>
      {/* Componente raíz de la aplicación */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
