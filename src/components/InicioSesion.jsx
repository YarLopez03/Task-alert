// Importa el hook useNavigate para redireccionar entre rutas
import { useNavigate } from 'react-router-dom';
// Importa los hooks useState y useEffect para manejar estado y efectos secundarios
import { useState, useEffect } from 'react';

function InicioSesion() {
    // Hook para redireccionar programáticamente
    const navigate = useNavigate();

    // Estados locales para capturar el usuario y contraseña del formulario
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // 🔁 Verifica si ya hay sesión iniciada al cargar el componente
    useEffect(() => {
        const user = localStorage.getItem('userName'); // Busca si hay un usuario guardado en localStorage
        if (user) {
            navigate('/list-task'); // Si existe, redirige automáticamente a la página de tareas
        }
    }, [navigate]); // Se ejecuta una sola vez al montar el componente

    // Función que se ejecuta al iniciar sesión
    const inicioSesion = () => {
        localStorage.setItem('userName', username); // Guarda el nombre de usuario en localStorage
        navigate('/list-task'); // Redirige a la página de tareas
    };

    return (
        <div className="w-100 login">
            <div className="centrar h-100">
                <div className="p-4 bg-login rounded w-30">
                    {/* Título del formulario */}
                    <div className="centrar color-title">
                        <h1>INICIAR SESIÓN</h1>
                    </div>

                    {/* Formulario de inicio de sesión */}
                    <form className="mt-4 inicio-form needs-validation" id="inicio-form" action={inicioSesion}>
                        {/* Campo de usuario */}
                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control inputLogin1"
                                placeholder="nombre.apellido"
                                name="username"
                                required
                                onChange={(e) => setUsername(e.target.value)} // Actualiza el estado con el valor ingresado
                            />
                            <label>Usuario</label>
                        </div>

                        {/* Campo de contraseña */}
                        <div className="form-floating inputLogin2">
                            <input
                                type="password"
                                className="form-control inputLogin2"
                                placeholder="Password"
                                name="password"
                                required
                                onChange={(e) => setPassword(e.target.value)} // Actualiza el estado con el valor ingresado
                            />
                            <label>Contraseña</label>
                        </div>

                        {/* Mensaje de error oculto por defecto */}
                        <div className="alert alert-danger mt-3 d-none" id="error" role="alert">
                            Error al iniciar sesión. Por favor confirme las credenciales. Si el problema persiste,
                            comuníquese con el equipo de sistemas.
                        </div>

                        {/* Botón para enviar el formulario */}
                        <div className="row align-items-center mt-3">
                            <div className="col-12 centrar">
                                <button className="btn btn-success">iniciar sesión</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default InicioSesion;
