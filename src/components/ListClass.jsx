// Importa el componente de navegación
import Menu from "./Menu";
// Importa el hook useState para manejar estados locales
import { useState } from 'react';
import { useEffect } from "react";
import * as categoryService from "../services/categoryService"

function ListClass() {

    const userId = localStorage.getItem('user_id');
    // Estado para controlar la acción actual (crear o editar)
    const [accion, setAccion] = useState('');
    // Estado para guardar el índice del elemento que se está editando
    const [indice, setIndice] = useState('');
    // Estado para manejar los datos del formulario
    const [formData, setFormData] = useState({
        CATEGORYNAME: '',
        CATEGORYALERTDAYS: 0,
    });

    // Lista de categorías iniciales
    const [categorias, setCategoria] = useState([]);

    useEffect(() => {
        listarCategoria();
    }, []);

    const listarCategoria = async () => {
        try {
            const response = await categoryService.getCategoriesByUser(userId);
            setCategoria(response.data);
        } catch (error) {
            console.error("Error al listar categorias:", error);
        }
    };

    // Llena los campos del formulario con los datos de la categoría seleccionada
    const llenarCampos = (indice) => {
        setIndice(indice);
        setAccion('editar');
        const categoria = categorias[indice];
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
        setFormData({ CATEGORYNAME: '', CATEGORYALERTDAYS: 0 });
    };

    // Guarda los datos del formulario, ya sea creando o editando una categoría
    const guardarDatos = async () => {

        // 🔥 Quitar foco del elemento activo
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }

        // 🔥 Esperar un pequeño tick para que React procese el blur
        await new Promise(resolve => setTimeout(resolve, 0));

        Swal.fire({
            text: "Seguro que desea " + accion + " la categoria",
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
                            await categoryService.createCategory(data);
                            break;

                        case 'editar':
                            await categoryService.updateCategory(formData.ID, userId, formData);
                            break;
                    }

                    await listarCategoria();
                    cerrarModal();
                    limpiarCampos();

                } catch (error) {
                    console.error("Error al guardar:", error);
                }
            }
        });
    };

    // Elimina una categoría de la lista
    const eliminarCategoria = (indiceEliminar) => {

        const categoria = categorias[indiceEliminar];
        Swal.fire({
            text: "¿Seguro que desea eliminar la Categoria?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await categoryService.deleteCategory(categoria.ID, userId);
                    await listarCategoria();
                } catch (error) {
                    console.error("Error al eliminar:", error);
                }
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
                {categorias.map((categoria, indice) => (
                    <div className="row ms-2 me-2" key={categoria.ID}>
                        <div className="col-1 border bg-white p-1"><p className="centrar">{indice + 1}</p></div>
                        <div className="col-6 col-md border bg-white p-1"><p className="centrar">{categoria.CATEGORYNAME}</p></div>
                        <div className="col-2 border bg-white d-none d-lg-block"><p className="centrar">{categoria.CATEGORYALERTDAYS}</p></div>
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
                                            <textarea className="form-control" id="CATEGORYNAME" value={formData.CATEGORYNAME}
                                                onChange={(e) => setFormData(prev => ({ ...prev, CATEGORYNAME: e.target.value }))}
                                                required></textarea>
                                            <label>Categoría</label>
                                        </div>
                                    </div>
                                    {/* Campo de días de alerta */}
                                    <div className="form-floating">
                                        <input type="number" className="form-control" id="CATEGORYALERTDAYS" value={formData.CATEGORYALERTDAYS}
                                            onChange={(e) => setFormData(prev => ({ ...prev, CATEGORYALERTDAYS: e.target.value }))}
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
