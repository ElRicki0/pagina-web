// Constantes para completar las rutas de la API.
const PRODUCTO_API = 'services/admin/producto.php';
const PEDIDOS_API = 'services/admin/pedidos.php';
const CLIENTE_API = 'services/admin/cliente.php';
// Constante para establecer el formulario de buscar.
const SEARCH_FORM = document.getElementById('searchForm');
// Constantes para establecer el contenido de la tabla.
const TABLE_BODY = document.getElementById('tableBody'),
    ROWS_FOUND = document.getElementById('rowsFound');
// Constantes para establecer los elementos del componente Modal.

const DETALLE_MODAL = new bootstrap.Modal('#masInfo2'),
    MODAL_TITLE = document.getElementById('modal2');
// Constantes para establecer el contenido de la tabla de productos.
const TABLE_BODY2 = document.getElementById('tableBody2'),
    ROWS_FOUND2 = document.getElementById('rowsFound2');

// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
    // Se establece el título del contenido principal.
    MAIN_TITLE.textContent = 'Gestionar pedidos';
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
    const DATA = await fetchData(PEDIDOS_API, 'readAll', form);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Se establece un icono para el estado del producto.
            let icon;

            switch (row.estado_pedido) {
                case 'Pendiente':
                    icon = 'bi bi-eye-slash-fill'; // Estado 0: Icono de ojo tachado
                    break;
                case 'Finalizado':
                    icon = 'bi bi-eye-fill'; // Estado 1: Icono de ojo lleno
                    break;
                case 'Entregado':
                    icon = 'otro-icono-1'; // Estado 2: Primer icono adicional
                    break;
                case 'Anulado':
                    icon = 'otro-icono-2'; // Estado 3: Segundo icono adicional
                    break;
                // default:
                //     icon = 'bi bi-question'; // Para otros estados no definidos, puedes mostrar un icono de pregunta
            }

            // Luego puedes usar el icono definido en el switch para mostrarlo en la tabla

            // Se crean y concatenan las filas de la tabla con los datos de cada registro.
            TABLE_BODY.innerHTML += `
            <tr>
                <td>${row.nombre_cliente}</td>
                <td>${row.fecha_registro}</td>
                <td>${row.direccion_pedido}</td>
                <td>${row.precio_pedido}</td>
                <td>${row.cantidad_pedido}</td>
                <td>${row.nombre_producto}</td>
                <td><i class="${icon}"></i></td>
                <td>
                <button type="button" class="btn editar-btn" onclick="openState(${row.id_detalle_entrega})">
                <img src="../../resources/img/iconos/intercambiar.png">
                </button>
                <button type="button" class="btn borrar-btn" onclick="openDelete(${row.id_detalle_entrega})">
                    <img src="../../resources/img/iconos/papelera.png">
                </button>
                <button type="button" class="btn borrar-btn" onclick="openDetalle(${row.id_detalle_entrega})">
                    <img src="../../resources/img/iconos/mas.png" width=30px>
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
*   Función asíncrona para cambiar el estado de un registro.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
const openState = async (id) => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Desea cambiar el estado del pedido?');
    try {
        // Se verifica la respuesta del mensaje.
        if (RESPONSE) {
            // Se define una constante tipo objeto con los datos del registro seleccionado.
            const FORM = new FormData();
            FORM.append('idPedido', id);
            console.log(id);
            // Petición para eliminar el registro seleccionado.
            const DATA = await fetchData(PEDIDOS_API, 'changeState', FORM);
            console.log(DATA.status);
            // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
            if (DATA.status) {
                // Se muestra un mensaje de éxito.
                await sweetAlert(1, DATA.message, true);
                // Se carga nuevamente la tabla para visualizar los cambios.
                fillTable();
            } else {
                sweetAlert(2, DATA.error, false);
            }
        }
    }
    catch (Error) {
        console.log(Error + ' Error al cargar el mensaje');
    }
}



/*
*   Función asíncrona para eliminar un registro.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
const openDetalle = async (id) => {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idPedido', id);
    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(PEDIDOS_API, 'readOnePedido', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        DETALLE_MODAL.show();
        // Se inicializa el contenido de la tabla.
        ROWS_FOUND2.textContent = '';
        TABLE_BODY2.innerHTML = '';
        // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Se crean y concatenan las filas de la tabla con los datos de cada registro.
            TABLE_BODY2.innerHTML += `
            <tr>
                <td>${row.nombre_producto}</td>
            </tr>
        `;
        });
        // Se muestra un mensaje de acuerdo con el resultado.
        ROWS_FOUND2.textContent = DATA.message;
    } else {
        sweetAlert(4, DATA.error, true);
    }


}

const openDelete = async (id) => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Desea eliminar el pedido de forma permanente?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('idPedido', id);
        // Petición para eliminar el registro seleccionado.
        const DATA = await fetchData(PEDIDOS_API, 'deleteRow', FORM);
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            // Se muestra un mensaje de éxito.
            await sweetAlert(1, DATA.message, true);
            // Se carga nuevamente la tabla para visualizar los cambios.
            fillTable();
        } else {
            sweetAlert(2, DATA.error, false);
        }
    }
}
