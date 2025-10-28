// Importa los estilos CSS globales para la aplicación
import './App.css';

// Importa los componentes necesarios de React Router para definir rutas
import { Routes, Route } from 'react-router-dom';

// Importa los componentes que se mostrarán en cada ruta
import InicioSesion from './components/InicioSesion.jsx';
import ListTask from './components/ListTask.jsx';
import ListClass from './components/ListClass.jsx';
import Reportes from './components/Reportes.jsx';
import MapaSitio from './components/MapaSitio.jsx';

// Componente principal de la aplicación
function App() {
  return (
    // Define las rutas de la aplicación usando <Routes> y <Route>
    <Routes>
      {/* Ruta raíz que muestra el componente de inicio de sesión */}
      <Route path="/" element={<InicioSesion />} />

      {/* Ruta para listar tareas */}
      <Route path="/list-task" element={<ListTask />} />

      {/* Ruta para listar clases */}
      <Route path="/list-class" element={<ListClass />} />

      {/* Ruta para ver reportes */}
      <Route path="/reportes" element={<Reportes />} />

      {/* Ruta para ver el mapa del sitio */}
      <Route path="/mapa-sitio" element={<MapaSitio />} />
    </Routes>
  );
}

// Exporta el componente App para que pueda ser usado en otros archivos
export default App;

