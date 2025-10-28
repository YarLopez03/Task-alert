// Importa el hook useState para manejar el estado local
import { useState } from "react";
// Importa el componente de navegación
import Menu from "./Menu";

function Reportes() {
    // Lista fija de tareas (simula datos que podrían venir de una API o localStorage)
    const tareas = [
        {
            id: 1,
            categoria: 1,
            tarea: 'Tarea 1',
            fechaInicio: '2025-01-01',
            fechaFin: '2025-01-31'
        },
        {
            id: 2,
            categoria: 2,
            tarea: 'Tarea 2',
            fechaInicio: '2025-02-01',
            fechaFin: '2025-02-28'
        },
        {
            id: 3,
            categoria: 3,
            tarea: 'Tarea 3',
            fechaInicio: '2025-03-01',
            fechaFin: '2025-03-31'
        },
        {
            id: 4,
            categoria: 3,
            tarea: 'Tarea 4',
            fechaInicio: '2025-04-01',
            fechaFin: '2025-04-30'
        },
    ];

    // Estado que contiene las tareas que se mostrarán (filtradas o todas)
    const [tareasMostrar, setTareasMostrar] = useState(tareas);

    // Lista fija de categorías disponibles
    const listCategoria = [
        { id: 1, nombre: 'Categoria 1', diasAlerta: 4 },
        { id: 2, nombre: 'Categoria 2', diasAlerta: 4 },
        { id: 3, nombre: 'Categoria 3', diasAlerta: 4 },
    ];

    // Función para filtrar tareas por categoría
    const filtar = (idCategria) => {
        if (idCategria === 0) {
            setTareasMostrar(tareas); // Mostrar todas si se selecciona "0"
        } else {
            setTareasMostrar(tareas.filter(t => t.categoria === idCategria));
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
                            onChange={(e) => filtar(parseInt(e.target.value))}
                        >
                            <option value="0">Seleccione una categoría</option>
                            {listCategoria.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.nombre}
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
                    <div className="col-1 border bg-primary text-white p-1 d-none d-lg-block">
                        <p className="centrar">Fecha Inicio</p>
                    </div>
                    <div className="col-1 border bg-primary text-white p-1 d-none d-lg-block">
                        <p className="centrar">Fecha Fin</p>
                    </div>
                </div>

                {/* Renderizado dinámico de tareas filtradas */}
                {tareasMostrar.map((tarea, indice) => {
                    const categoria = listCategoria.find(cat => cat.id === tarea.categoria);
                    return (
                        <div className="row ms-2 me-2" key={tarea.id}>
                            <div className="col-1 border bg-white p-1 position-relative">
                                <p className="centrar">{indice + 1}</p>
                            </div>
                            <div className="col-2 border bg-white p-1 d-none d-lg-block position-relative">
                                <p className="centrar">{categoria.nombre}</p>
                            </div>
                            <div className="col-6 col-md border bg-white p-1 position-relative">
                                <p className="centrar">{tarea.tarea}</p>
                            </div>
                            <div className="col-1 border bg-white p-1 position-relative d-none d-lg-block">
                                <p className="centrar">{tarea.fechaInicio}</p>
                            </div>
                            <div className="col-1 col-lg-1 border bg-white position-relative d-none d-lg-block">
                                <p className="centrar">{tarea.fechaFin}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default Reportes;
