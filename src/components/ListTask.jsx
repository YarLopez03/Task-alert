import Menu from "./Menu";
import { useState } from 'react'
import {
    createTask,
    getTasksByUser,
    updateTask,
    deleteTask,
    toggleTaskStatus
} from "../services/taskService";
import { getCategoriesByUser } from "../services/categoryService"
import { useEffect } from "react";

function ListTask() {

    const userId = localStorage.getItem('user_id');

    // Estado para controlar la acción actual (crear o editar)
    const [accion, setAccion] = useState('');

    // Estado para guardar el índice de la tarea seleccionada
    const [indice, setIndice] = useState('');

    // Estado para manejar los datos del formulario de tareas
    const [formData, setFormData] = useState(
        {
            TASKNAME: '',
            CATEGORIES_ID: "",
            STARTDAY: '',
            ENDDAY: ''
        }
    );


    // Estado que contiene la lista de tareas registradas

    const [tareas, setTareas] = useState([]);

    useEffect(() => {
        listarTareas();
    }, []);

    const listarTareas = async () => {
        try {
            const response = await getTasksByUser(userId);
            setTareas(response.data);
        } catch (error) {
            console.error("Error al listar tareas:", error);
        }
    };

    // Lista fija de categorías disponibles (no está en estado porque no se modifica)
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

    // Función para llenar los campos del formulario con los datos de una tarea seleccionada
    const llenarCampos = (indice) => {
        setIndice(indice);               // Guarda el índice actual
        const task = tareas[indice];     // Obtiene la tarea desde el array
        setFormData(task);               // Carga los datos en el formulario
    };

    // Función para cerrar el modal usando Bootstrap
    const cerrarModal = () => {
        const modalElement = document.getElementById('modal');
        const modalInstance =
            bootstrap.Modal.getInstance(modalElement) ||
            new bootstrap.Modal(modalElement);

        // 🔥 Quitar foco antes de cerrar
        if (document.activeElement) {
            document.activeElement.blur();
        }

        modalInstance.hide();
    };

    // Función para limpiar los campos del formulario (usado al crear una nueva tarea)
    const limpiarCampos = () => {
        const taskLimpia = {
            TASKNAME: '',
            CATEGORIES_ID: "",
            STARTDAY: '',
            ENDDAY: ''
        };
        setFormData(taskLimpia); // Reinicia el formulario con valores vacíos
    };

    // Función para guardar los datos de una tarea (crear, editar o prorrogar)
    const guardarDatos = async () => {

        // 🔥 Quitar foco del elemento activo
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }

        // 🔥 Esperar un pequeño tick para que React procese el blur
        await new Promise(resolve => setTimeout(resolve, 0));

        Swal.fire({
            text: "Seguro que desea " + accion + " la tarea",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "¡Sí, " + accion + "!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {

                    switch (accion) {

                        case 'crear':
                            const data = {
                                ...formData,
                                USERS_ID: parseInt(userId)
                            };
                            await createTask(data);
                            break;

                        case 'editar':
                            await updateTask(formData.ID, userId, formData);
                            break;

                        case 'prorrogar':
                            await toggleTaskStatus(formData.ID, userId, formData);
                            break;
                    }

                    await listarTareas();
                    cerrarModal();
                    limpiarCampos();

                } catch (error) {
                    console.error("Error al guardar:", error);
                }
            }
        });
    };

    // Función para eliminar una tarea del listado
    const eliminarTarea = (indiceEliminar) => {

        const tarea = tareas[indiceEliminar];
        Swal.fire({
            text: "¿Seguro que desea eliminar la tarea?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteTask(tarea.ID, userId);
                    await listarTareas();
                } catch (error) {
                    console.error("Error al eliminar:", error);
                }
            }
        });
    };


    return (
        <>
            {/* Componente de navegación superior */}
            <Menu />

            <div className="container p-0">
                {/* Botón para abrir el modal y crear una nueva tarea */}
                <div className="row mt-5 mb-2 ms-2 me-2">
                    <div className="col-12">
                        <button
                            className="btns btn btn-success text-white m-0"
                            data-bs-target="#modal" // Apunta al modal con ID "modal"
                            data-bs-toggle="modal"  // Activa el modal al hacer clic
                            onClick={() => {
                                setAccion('crear'); // Define la acción como "crear"
                                limpiarCampos();    // Limpia los campos del formulario
                            }}
                        >
                            +
                        </button>
                    </div>
                </div>

                {/* Encabezado de la tabla de tareas */}
                <div className="row ms-2 me-2">
                    {/* Columna de ID */}
                    <div className="col-1 border bg-primary text-white p-1">
                        <p className="centrar">ID</p>
                    </div>

                    {/* Columna de categoría (visible solo en pantallas grandes) */}
                    <div className="col-2 border bg-primary text-white p-1 d-none d-lg-block">
                        <p className="centrar">Categoría</p>
                    </div>

                    {/* Columna de nombre de la tarea */}
                    <div className="col-6 col-lg border bg-primary text-white p-1">
                        <p className="centrar">Tarea</p>
                    </div>

                    {/* Columna de fecha de inicio (visible solo en pantallas grandes) */}
                    <div className="col-1 border bg-primary text-white p-1 d-none d-lg-block">
                        <p className="centrar">Fecha Inicio</p>
                    </div>

                    {/* Columna de fecha de fin (visible solo en pantallas grandes) */}
                    <div className="col-1 border bg-primary text-white p-1 d-none d-lg-block">
                        <p className="centrar">Fecha Fin</p>
                    </div>

                    {/* Columna de acciones (editar, eliminar, etc.) */}
                    <div className="col-5 col-lg-2 border bg-primary text-white p-1">
                        <p className="centrar">Acciones</p>
                    </div>
                </div>


                {tareas.map((tarea, indice) => {
                    // Busca la categoría correspondiente por ID
                    const categoria = listCategoria.find(cat => cat.ID === tarea.CATEGORIES_ID);

                    return (
                        <div className="row ms-2 me-2" key={tarea.ID}>
                            {/* Número de fila */}
                            <div className="col-1 border bg-white p-1 position-relative">
                                <p className="centrar">{indice + 1}</p>
                            </div>

                            {/* Nombre de la categoría (solo visible en pantallas grandes) */}
                            <div className="col-2 border bg-white p-1 d-none d-lg-block position-relative">
                                <p className="centrar">{categoria ? categoria.CATEGORYNAME : "Sin categoría"}</p>
                            </div>

                            {/* Nombre de la tarea */}
                            <div className="col-6 col-md border bg-white p-1 position-relative">
                                <p className="centrar">{tarea.TASKNAME}</p>
                            </div>

                            {/* Fecha de inicio */}
                            <div className="col-1 border bg-white p-1 position-relative d-none d-lg-block">
                                <p className="centrar">{tarea.STARTDAY}</p>
                            </div>

                            {/* Fecha de fin */}
                            <div className="col-1 col-lg-1 border bg-white position-relative d-none d-lg-block">
                                <p className="centrar">{tarea.ENDDAY}</p>
                            </div>

                            {/* Botones de acción */}
                            <div className="col-5 col-lg-2 border bg-white pt-0 pe-1 pb-0 ps-1 position-relative">
                                <div className="centrar">
                                    <div className="row p-0 m-0">
                                        <div className="btn-group" role="group">
                                            {/* Editar tarea */}
                                            <button type="button" className="btn btn-success"
                                                data-bs-target="#modal" data-bs-toggle="modal"
                                                title="Editar"
                                                onClick={() => { setAccion('editar'); llenarCampos(indice); }}>
                                                <i className="bi bi-pencil-square"></i>
                                            </button>

                                            {/* Prorrogar tarea */}
                                            <button type="button" className="btn btn-warning"
                                                data-bs-target="#modal" data-bs-toggle="modal"
                                                title="Reprogramar"
                                                onClick={() => { setAccion('prorrogar'); llenarCampos(indice); }}>
                                                <i className="bi bi-calendar2-week"></i>
                                            </button>

                                            {/* Eliminar tarea */}
                                            <button type="button" className="btn btn-danger"
                                                title="Eliminar"
                                                onClick={() => { eliminarTarea(indice); }}>
                                                <i className="bi bi-x-circle"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}



                <div className="modal fade" id="modal" aria-hidden="true" tabIndex={-1}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            {/* Título dinámico según la acción */}
                            <div className="modal-header text-center">
                                <h1 className="modal-title fs-5 mayuscula">{accion} TAREA</h1>
                            </div>

                            {/* Formulario de tarea */}
                            <form id="formulario" onSubmit={(e) => {
                                e.preventDefault();
                                guardarDatos();
                            }}>
                                <div className="modal-body">
                                    {/* Selector de categoría */}
                                    <div className="mb-3">
                                        <div className="form-floating">
                                            <select className="form-select" id="CATEGORIES_ID"
                                                value={formData.CATEGORIES_ID}
                                                disabled={accion === "prorrogar"}
                                                onChange={(e) => setFormData(prev => ({ ...prev, CATEGORIES_ID: parseInt(e.target.value) }))}
                                                required>
                                                <option value="" disabled>Seleccione una categoría</option>
                                                {listCategoria.map((cat) => (
                                                    <option key={cat.ID} value={cat.ID}>{cat.CATEGORYNAME}</option>
                                                ))}
                                            </select>
                                            <label>Categoría</label>
                                        </div>
                                    </div>

                                    {/* Campo de nombre de tarea */}
                                    <div className="mb-3">
                                        <div className="form-floating">
                                            <textarea className="form-control" id="TASKNAME"
                                                value={formData.TASKNAME}
                                                disabled={accion === "prorrogar"}
                                                onChange={(e) => setFormData(prev => ({ ...prev, TASKNAME: e.target.value }))}
                                                required></textarea>
                                            <label>Tarea</label>
                                        </div>
                                    </div>

                                    {/* Fechas de inicio y fin */}
                                    <div className="row mb-3">
                                        <div className="col">
                                            <div className="form-floating">
                                                <input type="date" className="form-control" id="STARTDAY"
                                                    value={formData.STARTDAY}
                                                    disabled={accion === "prorrogar"}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, STARTDAY: e.target.value }))}
                                                    required />
                                                <label>Fecha Inicio</label>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-floating">
                                                <input type="date" className="form-control" id="ENDDAY"
                                                    value={formData.ENDDAY}
                                                    disabled={accion === "editar"}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, ENDDAY: e.target.value }))}
                                                    required />
                                                <label>Fecha Fin</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Botones del modal */}
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-primary">Guardar Datos</button>
                                    <button type="button" className="btn btn-danger"
                                        data-bs-dismiss="modal" onClick={limpiarCampos}>
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>


            </div >
        </>
    )
}


export default ListTask; 