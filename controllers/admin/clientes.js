// Constante para completar la ruta de la API.
const CLIENTE_API = 'services/admin/cliente.php';
// Constante para establecer el formulario de buscar.
const SEARCH_FORM = document.getElementById('searchForm');
// Constantes para establecer los elementos de la tabla.
const TABLE_BODY = document.getElementById('tableBody'),
    ROWS_FOUND = document.getElementById('rowsFound');
// Constantes para establecer los elementos del componente Modal.
const SAVE_MODAL = new bootstrap.Modal('#saveModal'),
    MODAL_TITLE = document.getElementById('modalTitle');
// Constantes para establecer los elementos del formulario de guardar.
const SAVE_FORM = document.getElementById('saveForm'),
    ID_CLIENTE = document.getElementById('idCliente'),
    NOMBRE_CLIENTE = document.getElementById('nombreCliente'),
    APELLIDO_CLIENTE = document.getElementById('apellidoCliente'),
    TELEFONO_CLIENTE = document.getElementById('telefonoCliente'),
    CORREO_CLIENTE = document.getElementById('correoCliente'),
    DIRECCION_CLIENTE = document.getElementById('direccionCliente'),
    ESTADO_CLIENTE = document.getElementById('estadocliente');
ALIAS_CLIENTE = document.getElementById('aliasCliente'),
    CLAVE_CLIENTE = document.getElementById('claveCliente'),
    CONFIRMAR_CLAVE = document.getElementById('confirmarClave');
IMAGEN_CLIENTE = document.getElementById('imagenCliente');

// Llamada a la función para establecer la mascara del campo teléfono.
vanillaTextMask.maskInput({
    inputElement: document.getElementById('telefonoCliente'),
    mask: [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
});

// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', () => {
    // Se establece el título del contenido principal.
    MAIN_TITLE.textContent = 'Gestionar clientes';
    // Llamada a la función para llenar la tabla con los registros existentes.
    fillTable();
});

// Método del evento para cuando se envía el formulario de buscar.
SEARCH_FORM.addEventListener('submit', (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SEARCH_FORM);
    // Llamada a la función para llenar la tabla con los resultados de la búsqueda.
    fillTable(FORM);
});

// Método del evento para cuando se envía el formulario de guardar.
SAVE_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se verifica la acción a realizar.
    (ID_CLIENTE.value) ? action = 'updateRow' : action = 'createRow';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(CLIENTE_API, action, FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se cierra la caja de diálogo.
        SAVE_MODAL.hide();
        // Se muestra un mensaje de éxito.
        sweetAlert(1, DATA.message, true);
        // Se carga nuevamente la tabla para visualizar los cambios.
        fillTable();
    } else {
        sweetAlert(2, DATA.error, false);
    }
});


/*
*   Función asíncrona para llenar la tabla con los registros disponibles.
*   Parámetros: form (objeto opcional con los datos de búsqueda).
*   Retorno: ninguno.
*/
const fillTable = async (form = null) => {
    // Se inicializa el contenido de la tabla.
    ROWS_FOUND.textContent = '';
    TABLE_BODY.innerHTML = '';
    // Se verifica la acción a realizar.
    (form) ? action = 'searchRows' : action = 'readAll';
    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(CLIENTE_API, action, form);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se recorre el conjunto de registros fila por fila.
        // Script 1
        DATA.dataset.forEach(row => {
            // Se establece un icono para el estado del ROL.
            (row.estado_cliente) ? icon = 'bi bi-eye-fill ' : icon = 'bi bi-eye-slash-fill';
            TABLE_BODY.innerHTML += `
                <tr row col-12" style="margin-bottom: 10px; margin-left: auto; margin-right: auto;">
                <td><img src="${SERVER_URL}images/productos/${row.imagen_cliente}" height="50"></td>
                    <td>${row.apellido_cliente}</td>
                    <td>${row.nombre_cliente}</td>
                    <td>${row.correo_cliente}</td>
                    <td><i class="${icon}"></i></td>
                    <td>
                        <button type="button" class="btn editar-btn" onclick="openUpdate(${row.id_cliente})">
                            <img src="../../resources/img/iconos/lapiz.png">
                        </button>
                        <button type="button" class="btn borrar-btn" onclick="openDelete(${row.id_cliente})">
                            <img src="../../resources/img/iconos/papelera.png">
                        </button>
                    </td>
                </tr>
            `;
        });

        // Se muestra un mensaje de acuerdo con el resultado.
        ROWS_FOUND.textContent = DATA.message;
    } else {
        sweetAlert(4, DATA.error, true);
    }
}


/*
*   Función para preparar el formulario al momento de insertar un registro.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const openCreate = () => {
    // Se muestra la caja de diálogo con su título.
    SAVE_MODAL.show();
    MODAL_TITLE.textContent = 'Crear registro';
    // Se prepara el formulario.
    SAVE_FORM.reset();
    ALIAS_ADMINISTRADOR.disabled = false;
    CLAVE_ADMINISTRADOR.disabled = false;
    CONFIRMAR_CLAVE.disabled = false;
}


/*
*   Función asíncrona para preparar el formulario al momento de actualizar un registro.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
const openUpdate = async (id) => {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idCliente', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(CLIENTE_API, 'readOne', FORM);
    console.log(DATA);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL.show();
        MODAL_TITLE.textContent = 'Actualizar registro';
        // Se prepara el formulario.
        SAVE_FORM.reset();
        ALIAS_CLIENTE.disabled = true;
        // Se inicializan los campos con los datos.
        const ROW = DATA.dataset;
        DIRECCION_CLIENTE.value = ROW.residencia_cliente;
        ID_CLIENTE.value = ROW.id_cliente;
        NOMBRE_CLIENTE.value = ROW.nombre_cliente;
        APELLIDO_CLIENTE.value = ROW.apellido_cliente;
        CORREO_CLIENTE.value = ROW.correo_cliente;
        ALIAS_CLIENTE.value = ROW.alias_cliente ;
        TELEFONO_CLIENTE.value = ROW.telefono_cliente;
    } else {
        sweetAlert(2, DATA.error, false);
    }
}