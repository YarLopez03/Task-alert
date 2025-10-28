/*import Menu from "./Menu";
import { useState } from 'react'

function ListClass() {
    const [accion, setAccion] = useState('');
    const [indice, setIndice] = useState('');
    const [formData, setFormData] = useState({
        id: 0,
        nombre: '',
        diasAlerta: 0,
    });

    const [listCategoria, setListCategoria] = useState([
        {
            id: 1,
            nombre: 'Categoria 1',
            diasAlerta: 3,
        },
        {
            id: 2,
            nombre: 'Categoria 2',
            diasAlerta: 4,
        },
        {
            id: 3,
            nombre: 'Categoria 3',
            diasAlerta: 5,
        },
    ]);

    const llenarCampos = (indice) => {
        setIndice(indice);
        setAccion('editar');
        const categoria = listCategoria[indice];
        setFormData(categoria);
    }

    const cerrarModal = () => {
        const modalElement = document.getElementById('modal');
        const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
        modalInstance.hide();
    }

    const limpiarCampos = () => {
        const categoriaLimpia = {
            id: 0,
            nombre: '',
            diasAlerta: 0,
        };
        setFormData(categoriaLimpia);
    }

    const guardarDatos = () => {

        Swal.fire({
            text: "Seguro que desea " + accion + " la categoria",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "¡Si, "+accion+"!"
        }).then((result) => {
            if (result.isConfirmed) {
                switch (accion) {
                    case 'crear':
                        setListCategoria(prev => [...prev, formData]);
                        break;
                    case 'editar':
                        const categoriaEditar = [...listCategoria]; // Copia del array original
                        categoriaEditar[indice] = formData; // Reemplaza la posición deseada
                        setListCategoria(categoriaEditar); // Actualiza el estado
                        break;
                    default:
                        console.log('Acción no reconocida');
                }
                cerrarModal();
            }
        });


    }

    const eliminarCategoria = (indiceEliminar) => {
        Swal.fire({
            text: "Seguro que desea eliminar la categoria",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar!"
        }).then((result) => {
            if (result.isConfirmed) {
                const categoriaEliminar = listCategoria.filter((_, index) => index !== indiceEliminar);
                setListCategoria(categoriaEliminar);
            }
        });
    }


    return (
        <>
            <Menu></Menu>
            <div className="container p-0 ">
                <div className="row mt-5 mb-2 ms-2 me-2">
                    <div className="col-12">
                        <button className="btns btn btn-success text-white m-0"
                            data-bs-target="#modal" data-bs-toggle="modal"
                            onClick={() => { setAccion('crear'); limpiarCampos(); }}>
                            +
                        </button>
                    </div>
                </div>

                <div className="row ms-2 me-2">
                    <div className="col-1 border bg-primary text-white p-1">
                        <p className="centrar">ID</p>
                    </div>

                    <div className="col-6 col-lg border bg-primary text-white p-1">
                        <p className="centrar">Categoria</p>
                    </div>
                    <div
                        className="col-2 border bg-primary text-white p-1 d-none d-lg-block">
                        <p className="centrar">Dias para la alerta</p>
                    </div>
                    <div className="col-5 col-lg-2 border bg-primary text-white p-1">
                        <p className="centrar">Acciones</p>
                    </div>
                </div>

                {listCategoria.map((categoria, indice) => {
                    return (
                        <div class="row ms-2 me-2">
                            <div class="col-1 border bg-white p-1 position-relative">
                                <p class="centrar">{indice + 1}</p>
                            </div>
                            <div class="col-6 col-md border bg-white p-1 position-relative">
                                <p class="centrar">{categoria.nombre}</p>
                            </div>
                            <div
                                class="col-2 border bg-white position-relative d-none d-lg-block">
                                <p class="centrar">{categoria.diasAlerta}</p>
                            </div>
                            <div
                                class="col-5 col-lg-2 border bg-white  pt-0 pe-1 pb-0 ps-1 position-relative">
                                <div class="centrar">
                                    <div class="row p-0 m-0">
                                        <div class="btn-group" role="group">
                                            <button type="button" class="btn btn-success"
                                                data-bs-target="#modal" data-bs-toggle="modal"
                                                title="Editar" onClick={() => { llenarCampos(indice) }}><i
                                                    class="bi bi-pencil-square"></i></button>
                                            <button type="button" class="btn btn-danger"
                                                title="Eliminar" onClick={() => { eliminarCategoria(indice) }}><i
                                                    class="bi bi-x-circle"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}

                <div className="modal fade" id="modal" aria-hidden="true"
                    aria-labelledby="exampleModalToggleLabel" tabIndex={-1}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header text-center">
                                <h1 className="modal-title fs-5 mayuscula"
                                    id="exampleModalToggleLabel">{accion} CATEGORIA</h1>
                                <button type="button" className="btn-close"
                                    data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <form id="formulario" action={guardarDatos}>
                                <div className="modal-body">

                                    <div className="mb-3">
                                        <div className="form-floating">
                                            <textarea className="form-control"
                                                id="nombre" value={formData.nombre}
                                                onChange={(e) => setFormData(prev => ({ ...prev, nombre: e.target.value }))}
                                                required></textarea>
                                            <label>Categoria</label>
                                        </div>
                                    </div>
                                    <div className="form-floating">
                                        <input type="number" className="form-control"
                                            id="diasAlerta" value={formData.diasAlerta}
                                            onChange={(e) => setFormData(prev => ({ ...prev, diasAlerta: e.target.value }))}
                                            required />
                                        <label>Numero de dias para la alerta</label>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-primary">
                                        Guardar Datos
                                    </button>
                                    <button type="button" className="btn btn-danger"
                                        data-bs-dismiss="modal" aria-label="Close">
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default ListClass; */

// Importa el componente de navegación
import Menu from "./Menu";
// Importa el hook useState para manejar estados locales
import { useState } from 'react';

function ListClass() {
    // Estado para controlar la acción actual (crear o editar)
    const [accion, setAccion] = useState('');
    // Estado para guardar el índice del elemento que se está editando
    const [indice, setIndice] = useState('');
    // Estado para manejar los datos del formulario
    const [formData, setFormData] = useState({
        id: 0,
        nombre: '',
        diasAlerta: 0,
    });

    // Lista de categorías iniciales
    const [listCategoria, setListCategoria] = useState([
        { id: 1, nombre: 'Categoria 1', diasAlerta: 3 },
        { id: 2, nombre: 'Categoria 2', diasAlerta: 4 },
        { id: 3, nombre: 'Categoria 3', diasAlerta: 5 },
    ]);

    // Llena los campos del formulario con los datos de la categoría seleccionada
    const llenarCampos = (indice) => {
        setIndice(indice);
        setAccion('editar');
        const categoria = listCategoria[indice];
        setFormData(categoria);
    };

    // Cierra el modal usando Bootstrap
    const cerrarModal = () => {
        const modalElement = document.getElementById('modal');
        const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
        modalInstance.hide();
    };

    // Limpia los campos del formulario para crear una nueva categoría
    const limpiarCampos = () => {
        setFormData({ id: 0, nombre: '', diasAlerta: 0 });
    };

    // Guarda los datos del formulario, ya sea creando o editando una categoría
    const guardarDatos = () => {
        Swal.fire({
            text: `¿Seguro que desea ${accion} la categoría?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `¡Sí, ${accion}!`
        }).then((result) => {
            if (result.isConfirmed) {
                switch (accion) {
                    case 'crear':
                        setListCategoria(prev => [...prev, formData]); // Agrega nueva categoría
                        break;
                    case 'editar':
                        const categoriaEditar = [...listCategoria];
                        categoriaEditar[indice] = formData; // Reemplaza la categoría editada
                        setListCategoria(categoriaEditar);
                        break;
                    default:
                        console.log('Acción no reconocida');
                }
                cerrarModal(); // Cierra el modal después de guardar
            }
        });
    };

    // Elimina una categoría de la lista
    const eliminarCategoria = (indiceEliminar) => {
        Swal.fire({
            text: "¿Seguro que desea eliminar la categoría?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar!"
        }).then((result) => {
            if (result.isConfirmed) {
                const categoriaEliminar = listCategoria.filter((_, index) => index !== indiceEliminar);
                setListCategoria(categoriaEliminar);
            }
        });
    };

    return (
        <>
            {/* Menú de navegación */}
            <Menu />

            <div className="container p-0">
                {/* Botón para abrir el modal y crear nueva categoría */}
                <div className="row mt-5 mb-2 ms-2 me-2">
                    <div className="col-12">
                        <button className="btns btn btn-success text-white m-0"
                            data-bs-target="#modal" data-bs-toggle="modal"
                            onClick={() => { setAccion('crear'); limpiarCampos(); }}>
                            +
                        </button>
                    </div>
                </div>

                {/* Encabezado de la tabla */}
                <div className="row ms-2 me-2">
                    <div className="col-1 border bg-primary text-white p-1"><p className="centrar">ID</p></div>
                    <div className="col-6 col-lg border bg-primary text-white p-1"><p className="centrar">Categoría</p></div>
                    <div className="col-2 border bg-primary text-white p-1 d-none d-lg-block"><p className="centrar">Días para la alerta</p></div>
                    <div className="col-5 col-lg-2 border bg-primary text-white p-1"><p className="centrar">Acciones</p></div>
                </div>

                {/* Renderiza cada categoría en una fila */}
                {listCategoria.map((categoria, indice) => (
                    <div className="row ms-2 me-2" key={indice}>
                        <div className="col-1 border bg-white p-1"><p className="centrar">{indice + 1}</p></div>
                        <div className="col-6 col-md border bg-white p-1"><p className="centrar">{categoria.nombre}</p></div>
                        <div className="col-2 border bg-white d-none d-lg-block"><p className="centrar">{categoria.diasAlerta}</p></div>
                        <div className="col-5 col-lg-2 border bg-white pt-0 pe-1 pb-0 ps-1">
                            <div className="centrar">
                                <div className="row p-0 m-0">
                                    <div className="btn-group" role="group">
                                        {/* Botón para editar */}
                                        <button type="button" className="btn btn-success"
                                            data-bs-target="#modal" data-bs-toggle="modal"
                                            title="Editar" onClick={() => llenarCampos(indice)}>
                                            <i className="bi bi-pencil-square"></i>
                                        </button>
                                        {/* Botón para eliminar */}
                                        <button type="button" className="btn btn-danger"
                                            title="Eliminar" onClick={() => eliminarCategoria(indice)}>
                                            <i className="bi bi-x-circle"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Modal para crear/editar categoría */}
                <div className="modal fade" id="modal" aria-hidden="true" tabIndex={-1}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header text-center">
                                <h1 className="modal-title fs-5 mayuscula">{accion} CATEGORÍA</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>

                            {/* Formulario dentro del modal */}
                            <form id="formulario" action={guardarDatos}>
                                <div className="modal-body">
                                    {/* Campo de nombre */}
                                    <div className="mb-3">
                                        <div className="form-floating">
                                            <textarea className="form-control" id="nombre" value={formData.nombre}
                                                onChange={(e) => setFormData(prev => ({ ...prev, nombre: e.target.value }))}
                                                required></textarea>
                                            <label>Categoría</label>
                                        </div>
                                    </div>
                                    {/* Campo de días de alerta */}
                                    <div className="form-floating">
                                        <input type="number" className="form-control" id="diasAlerta" value={formData.diasAlerta}
                                            onChange={(e) => setFormData(prev => ({ ...prev, diasAlerta: e.target.value }))}
                                            required />
                                        <label>Número de días para la alerta</label>
                                    </div>
                                </div>

                                {/* Botones del modal */}
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-primary">Guardar Datos</button>
                                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ListClass;
