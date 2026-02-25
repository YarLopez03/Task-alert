// Importa el hook useState para manejar el estado local
import { useState } from "react";
// Importa el componente de navegación
import Menu from "./Menu";
import {
    getTasksByUser,
    getTasksByUserAndCategory
} from "../services/taskService";
import { getCategoriesByUser } from "../services/categoryService"
import { useEffect } from "react";


function Reportes() {
    const userId = localStorage.getItem('user_id');
    // Lista fija de tareas
    const [tareas, setTareas] = useState([]);

    useEffect(() => {
        listarTareas();
    }, []);

    const listarTareas = async (idCategria) => {
        try {
            if (idCategria && idCategria != 0 ) {
                const response = await getTasksByUserAndCategory(userId, idCategria);
                setTareas(response.data);
            }else{
                const response = await getTasksByUser(userId);
                setTareas(response.data);
            }
        } catch (error) {
            console.error("Error al listar tareas:", error);
        }
    };

    // Lista fija de categorías disponibles
    const [listCategoria, setCategoria] = useState([]);

    useEffect(() => {
        listarCategoria();
    }, []);

    const listarCategoria = async () => {
        try {
            const response = await getCategoriesByUser(userId);
            setCategoria(response.data);
        } catch (error) {
            console.error("Error al listar categorias:", error);
        }
    };

    return (
        <>
            {/* Menú de navegación */}
            <Menu />

            <div className="container p-0">
                {/* Selector de categoría */}
                <div className="col col-md-6 mt-5 ms-2">
                    <div className="form-floating">
                        <select
                            className="form-select"
                            id="categoria"
                            onChange={(e) => listarTareas(parseInt(e.target.value))}
                        >
                            <option value="0">Seleccione una categoría</option>
                            {listCategoria.map((cat) => (
                                <option key={cat.ID} value={cat.ID}>
                                    {cat.CATEGORYNAME}
                                </option>
                            ))}
                        </select>
                        <label>Categoría</label>
                    </div>
                </div>

                {/* Encabezado de la tabla */}
                <div className="row mt-5 ms-2 me-2">
                    <div className="col-1 border bg-primary text-white p-1">
                        <p className="centrar">ID</p>
                    </div>
                    <div className="col col-lg-2 border bg-primary text-white p-1">
                        <p className="centrar">Categoría</p>
                    </div>
                    <div className="col-6 col-md border bg-primary text-white p-1">
                        <p className="centrar">Tarea</p>
                    </div>
                    <div className="col-2 border bg-primary text-white p-1 d-none d-lg-block">
                        <p className="centrar">Fecha Inicio</p>
                    </div>
                    <div className="col-2 border bg-primary text-white p-1 d-none d-lg-block">
                        <p className="centrar">Fecha Fin</p>
                    </div>
                </div>

                {/* Renderizado dinámico de tareas filtradas */}
                {tareas.map((tarea, indice) => {
                    const categoria = listCategoria.find(cat => cat.ID === tarea.CATEGORIES_ID);
                    return (
                        <div className="row ms-2 me-2" key={tarea.ID}>
                            <div className="col-1 border bg-white p-1 position-relative">
                                <p className="centrar">{indice + 1}</p>
                            </div>
                            <div className="col-2 border bg-white p-1 d-none d-lg-block position-relative">
                                <p className="centrar">{categoria ? categoria.CATEGORYNAME : "Sin categoría"}</p>
                            </div>
                            <div className="col-6 col-md border bg-white p-1 position-relative">
                                <p className="centrar">{tarea.TASKNAME}</p>
                            </div>
                            <div className="col-2 border bg-white p-1 position-relative d-none d-lg-block">
                                <p className="centrar">{tarea.STARTDAY}</p>
                            </div>
                            <div className="col-2 border bg-white position-relative d-none d-lg-block">
                                <p className="centrar">{tarea.ENDDAY}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default Reportes;
