// Importa los componentes necesarios para navegación
import { Link, useNavigate } from 'react-router-dom';
// Importa el hook useEffect para ejecutar lógica al montar el componente
import { useEffect } from 'react';

function Menu() {
    // Obtiene el nombre de usuario desde localStorage
    var userName = localStorage.getItem('userName');

    // Hook para redireccionar programáticamente
    const navigate = useNavigate();

    // Verifica si hay sesión iniciada al cargar el menú
    useEffect(() => {
        if (!userName) {
            navigate('/'); // Si no hay usuario, redirige al inicio de sesión
        }
    }, [navigate]);

    // Función para cerrar sesión
    const cerrarSesion = () => {
        localStorage.clear(); // Limpia todos los datos guardados
        navigate('/');        // Redirige al inicio de sesión
    };

    return (
        <header className="navbar-light header-static">
            <nav className="navbar navbar-expand-lg">
                <div className="container">
                    {/* Logo o nombre de la app */}
                    <Link className="navbar-brand" to="/list-task">
                        TASK ALERT
                    </Link>

                    {/* Botón para mostrar/ocultar el menú en pantallas pequeñas */}
                    <button className="navbar-toggler ms-auto" type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarCollapse"
                        aria-controls="navbarCollapse" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="text-body h6 d-none d-sm-inline-block">Menu</span>
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Menú principal */}
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <ul className="navbar-nav navbar-nav-scroll mx-auto">
                            {/* Enlace a tareas */}
                            <li className="nav-item me-3">
                                <Link className="nav-link link-dark" to="/list-task" id="ListTask">
                                    Tareas
                                </Link>
                            </li>

                            {/* Enlace a categorías */}
                            <li className="nav-item me-3">
                                <Link className="nav-link link-dark" to="/list-class" id="ListClass">
                                    Categorías
                                </Link>
                            </li>

                            {/* Enlace a reportes */}
                            <li className="nav-item me-3">
                                <Link className="nav-link link-dark" to="/reportes" id="Reportes">
                                    Reportes
                                </Link>
                            </li>

                            {/* Enlace al mapa del sitio */}
                            <li className="nav-item">
                                <Link className="nav-link link-dark" to="/mapa-sitio" id="mapa">
                                    Mapa del sitio
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Menú de usuario con opción para cerrar sesión */}
                    <div className="nav flex-nowrap align-items-center">
                        <div className="nav-item dropdown dropdown-toggle-icon-none nav-search">
                            <a className="nav-link link-dark" role="button"
                                id="navSearch" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                <i className="bi bi-person-circle"></i> {userName}
                            </a>
                            <div className="dropdown-menu dropdown-menu-end shadow rounded p-2"
                                aria-labelledby="navSearch">
                                <button className="btn btn-sm mb-0 mx-2" onClick={cerrarSesion}>
                                    Cerrar sesión
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Menu;
