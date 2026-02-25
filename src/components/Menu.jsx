import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Menu() {

    const navigate = useNavigate();

    const [userEmail, setUserEmail] = useState(null);

    useEffect(() => {
        const userId = localStorage.getItem('user_id');
        const email = localStorage.getItem('userEmail');

        // 🔐 Si no hay sesión → redirige
        if (!userId) {
            navigate('/');
        } else {
            setUserEmail(email);
        }

    }, [navigate]);

    const cerrarSesion = () => {
        localStorage.removeItem('user_id');
        localStorage.removeItem('userEmail');
        navigate('/');
    };

    return (
        <header className="navbar-light header-static">
            <nav className="navbar navbar-expand-lg">
                <div className="container">

                    <Link className="navbar-brand" to="/list-task">
                        TASK ALERT
                    </Link>

                    <button
                        className="navbar-toggler ms-auto"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarCollapse"
                        aria-controls="navbarCollapse"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="text-body h6 d-none d-sm-inline-block">Menu</span>
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <ul className="navbar-nav navbar-nav-scroll mx-auto">

                            <li className="nav-item me-3">
                                <Link className="nav-link link-dark" to="/list-task">
                                    Tareas
                                </Link>
                            </li>

                            <li className="nav-item me-3">
                                <Link className="nav-link link-dark" to="/list-class">
                                    Categorías
                                </Link>
                            </li>

                            <li className="nav-item me-3">
                                <Link className="nav-link link-dark" to="/reportes">
                                    Reportes
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link link-dark" to="/mapa-sitio">
                                    Mapa del sitio
                                </Link>
                            </li>

                        </ul>
                    </div>

                    {/* Usuario */}
                    <div className="nav flex-nowrap align-items-center">
                        <div className="nav-item dropdown dropdown-toggle-icon-none nav-search">
                            <a
                                className="nav-link link-dark"
                                role="button"
                                data-bs-toggle="dropdown"
                            >
                                <i className="bi bi-person-circle"></i> {userEmail}
                            </a>

                            <div className="dropdown-menu dropdown-menu-end shadow rounded p-2">
                                <button
                                    className="btn btn-sm mb-0 mx-2"
                                    onClick={cerrarSesion}
                                >
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