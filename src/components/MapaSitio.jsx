// Importa el componente de navegación principal
import Menu from "./Menu";
// Importa el componente Link para navegación interna sin recargar la página
import { Link } from 'react-router-dom';

function MapaSitio() {
    return (
        <>
            {/* Renderiza el menú de navegación */}
            <Menu />

            {/* Contenedor principal centrado con margen superior */}
            <div className="mt-5 centrar">
                <div className="w_50">
                    {/* Lista ordenada con estilo Bootstrap */}
                    <ol className="list-group list-group-numbered w-100">
                        {/* Enlace a la sección de tareas */}
                        <li className="list-group-item">
                            <Link to="/list-task">Tareas</Link>
                        </li>

                        {/* Enlace a la sección de categorías */}
                        <li className="list-group-item">
                            <Link to="/list-class">Categorías</Link>
                        </li>

                        {/* Enlace a la sección de reportes */}
                        <li className="list-group-item">
                            <Link to="/reportes">Reportes</Link>
                        </li>

                        {/* Enlace a la sección actual (Mapa del sitio) */}
                        <li className="list-group-item">
                            <Link to="/mapa-sitio" aria-disabled="true">Mapa del sitio</Link>
                        </li>
                    </ol>
                </div>
            </div>
        </>
    );
}

export default MapaSitio;
