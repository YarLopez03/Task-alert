import Menu from "./Menu";
import { useState } from 'react'

function ListTask() {
    // Estado para controlar la acción actual (crear o editar)
    const [accion, setAccion] = useState('');

    // Estado para guardar el índice de la tarea seleccionada
    const [indice, setIndice] = useState('');

    // Estado para manejar los datos del formulario de tareas
    const [formData, setFormData] = useState({
        id: 0,
        tarea: '',
        categoria: "",        // ID de la categoría asociada
        fechaInicio: '',      // Fecha de inicio de la tarea
        fechaFin: ''          // Fecha de finalización de la tarea
    });

    // Estado que contiene la lista de tareas registradas
    const [tareas, setTareas] = useState([
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
    ]);

    // Lista fija de categorías disponibles (no está en estado porque no se modifica)
    var listCategoria = [
        { id: 1, nombre: 'Categoria 1', diasAlerta: 4 },
        { id: 2, nombre: 'Categoria 2', diasAlerta: 4 },
        { id: 3, nombre: 'Categoria 3', diasAlerta: 4 },
    ];

    // Función para llenar los campos del formulario con los datos de una tarea seleccionada
    const llenarCampos = (indice) => {
        setIndice(indice);               // Guarda el índice actual
        const task = tareas[indice];     // Obtiene la tarea desde el array
        setFormData(task);               // Carga los datos en el formulario
    };

    // Función para cerrar el modal usando Bootstrap
    const cerrarModal = () => {
        const modalElement = document.getElementById('modal'); // Obtiene el elemento del modal
        const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
        modalInstance.hide(); // Cierra el modal
    };

    // Función para limpiar los campos del formulario (usado al crear una nueva tarea)
    const limpiarCampos = () => {
        const taskLimpia = {
            id: 0,
            tarea: '',
            categoria: "",
            fechaInicio: '',
            fechaFin: ''
        };
        setFormData(taskLimpia); // Reinicia el formulario con valores vacíos
    };

    // Función para guardar los datos de una tarea (crear, editar o prorrogar)
    const guardarDatos = () => {
        // Muestra una alerta de confirmación antes de guardar
        Swal.fire({
            text: "Seguro que desea " + accion + " la tarea", // Mensaje dinámico según la acción
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "¡Sí, " + accion + "!"
        }).then((result) => {
            if (result.isConfirmed) {
                // Ejecuta la acción correspondiente
                switch (accion) {
                    case 'crear':
                        // Agrega la nueva tarea al array existente
                        setTareas(prev => [...prev, formData]);
                        break;
                    case 'editar':
                        // Crea una copia del array de tareas
                        const tareaEditar = [...tareas];
                        // Reemplaza la tarea en la posición indicada
                        tareaEditar[indice] = formData;
                        // Actualiza el estado con la nueva lista
                        setTareas(tareaEditar);
                        break;
                    case 'prorrogar':
                        // Similar a editar, pero puede tener lógica distinta si se desea
                        const tareaProrrogar = [...tareas];
                        tareaProrrogar[indice] = formData;
                        setTareas(tareaProrrogar);
                        break;
                    default:
                        console.log('Acción no reconocida');
                }
                // Cierra el modal después de guardar
                cerrarModal();
            }
        });
    };

    // Función para eliminar una tarea del listado
    const eliminarTarea = (indiceEliminar) => {
        // Muestra una alerta de confirmación antes de eliminar
        Swal.fire({
            text: "¿Seguro que desea eliminar la tarea?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar!"
        }).then((result) => {
            if (result.isConfirmed) {
                // Filtra el array de tareas excluyendo la tarea seleccionada
                const tareaEliminar = tareas.filter((_, index) => index !== indiceEliminar);
                // Actualiza el estado con la nueva lista
                setTareas(tareaEliminar);
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
                    const categoria = listCategoria.find(cat => cat.id === tarea.categoria);

                    return (
                        <div className="row ms-2 me-2" key={tarea.id}>
                            {/* Número de fila */}
                            <div className="col-1 border bg-white p-1 position-relative">
                                <p className="centrar">{indice + 1}</p>
                            </div>

                            {/* Nombre de la categoría (solo visible en pantallas grandes) */}
                            <div className="col-2 border bg-white p-1 d-none d-lg-block position-relative">
                                <p className="centrar">{categoria.nombre}</p>
                            </div>

                            {/* Nombre de la tarea */}
                            <div className="col-6 col-md border bg-white p-1 position-relative">
                                <p className="centrar">{tarea.tarea}</p>
                            </div>

                            {/* Fecha de inicio */}
                            <div className="col-1 border bg-white p-1 position-relative d-none d-lg-block">
                                <p className="centrar">{tarea.fechaInicio}</p>
                            </div>

                            {/* Fecha de fin */}
                            <div className="col-1 col-lg-1 border bg-white position-relative d-none d-lg-block">
                                <p className="centrar">{tarea.fechaFin}</p>
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
                            <form id="formulario" action={guardarDatos}>
                                <div className="modal-body">
                                    {/* Selector de categoría */}
                                    <div className="mb-3">
                                        <div className="form-floating">
                                            <select className="form-select" id="categoria"
                                                value={formData.categoria}
                                                disabled={accion === "prorrogar"}
                                                onChange={(e) => setFormData(prev => ({ ...prev, categoria: parseInt(e.target.value) }))}
                                                required>
                                                <option value="" disabled>Seleccione una categoría</option>
                                                {listCategoria.map((cat) => (
                                                    <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                                                ))}
                                            </select>
                                            <label>Categoría</label>
                                        </div>
                                    </div>

                                    {/* Campo de nombre de tarea */}
                                    <div className="mb-3">
                                        <div className="form-floating">
                                            <textarea className="form-control" id="tarea"
                                                value={formData.tarea}
                                                disabled={accion === "prorrogar"}
                                                onChange={(e) => setFormData(prev => ({ ...prev, tarea: e.target.value }))}
                                                required></textarea>
                                            <label>Tarea</label>
                                        </div>
                                    </div>

                                    {/* Fechas de inicio y fin */}
                                    <div className="row mb-3">
                                        <div className="col">
                                            <div className="form-floating">
                                                <input type="date" className="form-control" id="fechaInicio"
                                                    value={formData.fechaInicio}
                                                    disabled={accion === "prorrogar"}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, fechaInicio: e.target.value }))}
                                                    required />
                                                <label>Fecha Inicio</label>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-floating">
                                                <input type="date" className="form-control" id="fechaFin"
                                                    value={formData.fechaFin}
                                                    disabled={accion === "editar"}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, fechaFin: e.target.value }))}
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