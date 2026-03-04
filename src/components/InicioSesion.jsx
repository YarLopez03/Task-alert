import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { loginUser, registerUser } from '../services/userService';

function InicioSesion() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const userId = localStorage.getItem('user_id');
        if (userId) {
            navigate('/list-task');
        }
    }, [navigate]);

    const inicioSesion = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            const response = await loginUser({
                email,
                password
            });

            const user = response.data.user;

            localStorage.setItem('user_id', user.ID);
            localStorage.setItem('userEmail', user.EMAIL);

            navigate('/list-task');

        } catch (err) {
            console.error("Error login:", err);

            // 🔥 Aquí capturamos el mensaje real del backend
            if (err.response && err.response.data && err.response.data.message) {
                setErrorMessage(err.response.data.message);
            } else {
                setErrorMessage("Error de conexión con el servidor");
            }
        }
    };

    const crearUsuario = async () => {
        setErrorMessage('');

        // Validar que los campos no estén vacíos
        if (!email || !password) {
            setErrorMessage("Por favor completa el correo y la contraseña.");
            return;
        }

        try {
            const response = await registerUser({ email, password });
            const user = response.data.user;
            localStorage.setItem('user_id', user.ID);
            localStorage.setItem('userEmail', user.EMAIL);
            navigate('/list-task');
        } catch (err) {
            console.error("Error registro:", err);
            if (err.response && err.response.data && err.response.data.message) {
                setErrorMessage(err.response.data.message);
            } else {
                setErrorMessage("Error de conexión con el servidor");
            }
        }
    };

    return (
        <div className="w-100 login">
            <div className="centrar h-100">
                <div className="p-4 bg-login rounded w-30">

                    <div className="centrar color-title">
                        <h1>INICIAR SESIÓN</h1>
                    </div>

                    <form
                        className="mt-4 inicio-form needs-validation"
                        onSubmit={inicioSesion}
                    >
                        <div className="form-floating">
                            <input
                                type="email"
                                className="form-control inputLogin1"
                                placeholder="correo@ejemplo.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label>Correo electrónico</label>
                        </div>

                        <div className="form-floating inputLogin2">
                            <input
                                type="password"
                                className="form-control inputLogin2"
                                placeholder="Password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <label>Contraseña</label>
                        </div>

                        {/* 🔥 Ahora muestra el mensaje real del backend */}
                        {errorMessage && (
                            <div className="alert alert-danger mt-3" role="alert">
                                {errorMessage}
                            </div>
                        )}

                        <div className="row align-items-center mt-3">
                            <div className="col-12 centrar">
                                <button className="btn btn-success" type="submit">
                                    Iniciar sesión
                                </button>
                            </div>
                        </div>

                        <div className="row align-items-center mt-3">
                            <div className="col-12 centrar">
                                <button className="btn btn-success" type="button" onClick={crearUsuario}>
                                    Crear usuario
                                </button>
                            </div>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    );
}

export default InicioSesion;