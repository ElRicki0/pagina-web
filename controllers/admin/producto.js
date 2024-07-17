// Constantes para completar las rutas de la API.
const PRODUCTO_API = 'services/admin/producto.php';
const CATEGORIA_API = 'services/admin/categoria.php';
const ADMIN_API = 'services/admin/administrador.php';
const MARCA_API = 'services/admin/marca.php';

// Constante para establecer el formulario de buscar.
const SEARCH_FORM = document.getElementById('searchForm');
// Constantes para establecer el contenido de la tabla.
const TABLE_BODY = document.getElementById('tableBody'),
    ROWS_FOUND = document.getElementById('rowsFound');
// Constantes para establecer los elementos del componente Modal.
const SAVE_MODAL = new bootstrap.Modal('#saveModal'),
    MODAL_TITLE = document.getElementById('modalTitle');
// Constantes para establecer los elementos del componente Modal.
const PRODUCTO_MODAL = new bootstrap.Modal('#addProductoM'),
    ID_PRODUCTO2 = document.getElementById('idProducto2'),
    PRODUCTO_TITLE = document.getElementById('productoTitle'),
    CANTIDAD_FORM = document.getElementById('cantidadForm');
// Constantes para establecer los elementos del formulario de guardar.
const SAVE_FORM = document.getElementById('saveForm'),
    ID_PRODUCTO = document.getElementById('idProducto'),
    IMAGEN_PRODUCTO = document.getElementById('imagenProducto'),
    NOMBRE_PRODUCTO = document.getElementById('nombreProducto'),
    DESCRIPCION_PRODUCTO = document.getElementById('descripcionProducto'),
    PRECIO_PRODUCTO = document.getElementById('precioProducto'),
    CANTIDAD_PRODUCTO = document.getElementById('cantidadProducto'),
    CATEGORIA_PRODUCTO = document.getElementById('categoriaProducto'),
    ADMINISTRACION_PRODUCTO = document.getElementById('administradorProducto'),
    MARCA_PRODUCTO = document.getElementById('marcaProducto');
AGREGAR_PRODUCTO = document.getElementById('agregarProducto');

// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', () => {
    // Se establece el título del contenido principal.
    MAIN_TITLE.textContent = 'Gestionar productos';
    // Llamada a la función para llenar la tabla con los registros existentes.
    fillTable();
    // Llamado de funcionses asincronas para mostrar los graficos
    graficoPastelCategorias();
    graficoLinealProductosVendidos();
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
    (ID_PRODUCTO.value) ? action = 'updateRow' : action = 'createRow';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(PRODUCTO_API, action, FORM);
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

// Método del evento para cuando se envía el formulario de guardar.
CANTIDAD_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(CANTIDAD_FORM);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(PRODUCTO_API, 'agregarProducto', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se cierra la caja de diálogo.
        PRODUCTO_MODAL.hide();
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
    const DATA = await fetchData(PRODUCTO_API, action, form);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Se establece un icono para el estado del producto.
            (row.estado_producto) ? icon = 'bi bi-eye-fill' : icon = 'bi bi-eye-slash-fill';
            // Se crean y concatenan las filas de la tabla con los datos de cada registro.
            TABLE_BODY.innerHTML += `
                <tr>
                    <td><img src="${SERVER_URL}images/productos/${row.imagen_producto}"  height="120" class="rounded"></td>
                    <td>${row.nombre_producto}</td>
                    <td>${row.descripcion_producto}</td>
                    <td>${row.precio_producto}</td>
                    <td>${row.cantidad_producto}</td>
                    <td>${row.categoria_producto}</td>
                    <td>${row.nombre_administrador}</td>
                    <td>${row.nombre_marca}</td>
                    <td><i class="${icon}"></i></td>
                    <td>
                    <button type="button" class="btn editar-btn" onclick="openUpdate(${row.id_producto})">
                    <img src="../../resources/img/iconos/lapiz.png">
                </button>
                <button type="button" class="btn borrar-btn" onclick="openDelete(${row.id_producto})">
                    <img src="../../resources/img/iconos/papelera.png">
                </button>
                <button type="button" class="btn borrar-btn" onclick="openAdd(${row.id_producto})">
                    <img src="../../resources/img/iconos/mas.png " width="35px">
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
    MODAL_TITLE.textContent = 'Crear producto';
    // Se prepara el formulario.
    SAVE_FORM.reset();
    CANTIDAD_PRODUCTO.disabled = false;
    fillSelect(CATEGORIA_API, 'readAll', 'categoriaProducto'),
        fillSelect(ADMIN_API, 'readAll', 'administradorProducto'),
        fillSelect(MARCA_API, 'readAll', 'marcaProducto');
}


/*
*   Función asíncrona para preparar el formulario al momento de actualizar un registro.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
const openUpdate = async (id) => {
    // Se define un objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idProducto', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(PRODUCTO_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL.show();
        MODAL_TITLE.textContent = 'Actualizar producto';
        // Se prepara el formulario.
        SAVE_FORM.reset();
        // Se inicializan los campos con los datos.
        const ROW = DATA.dataset;
        ID_PRODUCTO.value = ROW.id_producto;
        NOMBRE_PRODUCTO.value = ROW.nombre_producto;
        DESCRIPCION_PRODUCTO.value = ROW.descripcion_producto;
        PRECIO_PRODUCTO.value = ROW.precio_producto;
        CANTIDAD_PRODUCTO.value = ROW.cantidad_producto;
        fillSelect(CATEGORIA_API, 'readAll', 'categoriaProducto', ROW.id_categoria_producto);
        fillSelect(ADMIN_API, 'readAll', 'administradorProducto', ROW.id_admin);
        fillSelect(MARCA_API, 'readAll', 'marcaProducto', ROW.id_marca);
    } else {
        sweetAlert(2, DATA.error, false);
    }
}


const openAdd = (id) => {
    // Se muestra la caja de diálogo con su título.
    PRODUCTO_MODAL.show();
    MODAL_TITLE.textContent = 'Agregar producto';
    // Se prepara el formulario.
    ID_PRODUCTO2.value = id;

}


/*
*   Función asíncrona para eliminar un registro.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
const openDelete = async (id) => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Desea eliminar el producto de forma permanente?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('id_Producto', id);
        // Petición para eliminar el registro seleccionado.
        const DATA = await fetchData(PRODUCTO_API, 'deleteRow', FORM);
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


/*
*   Función asíncrona para mostrar un gráfico de pastel con el porcentaje de productos por categoría.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const graficoPastelCategorias = async () => {
    // Petición para obtener los datos del gráfico.
    const DATA = await fetchData(PRODUCTO_API, 'porcentajeProductosCategoria');
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se remueve la etiqueta canvas.
    if (DATA.status) {
        // Se declaran los arreglos para guardar los datos a gráficar.
        let categorias = [];
        let porcentajes = [];
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Se agregan los datos a los arreglos.
            categorias.push(row.nombre_categoria_producto);
            porcentajes.push(row.porcentaje);
        });
        // Llamada a la función para generar y mostrar un gráfico de pastel. Se encuentra en el archivo components.js
        pieGraph('chart2', categorias, porcentajes, '');
    } else {
        document.getElementById('chart2').remove();
        console.log(DATA.error);
    }
}



/*
*   Función asíncrona para mostrar un gráfico de líneas con la cantidad de productos vendidos por producto.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/

const graficoLinealProductosVendidos = async () => {
    // Petición para obtener los datos del gráfico.
    const DATA = await fetchData(PRODUCTO_API, 'productosMasVendidos');
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se remueve la etiqueta canvas.
    if (DATA.status) {
        // Se declaran los arreglos para guardar los datos a graficar.
        let productos = [];
        let cantidadesVendidas = [];
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Se agregan los datos a los arreglos.
            productos.push(row.nombre_producto);
            cantidadesVendidas.push(row.total_vendido);
        });
        // Llamada a la función para generar y mostrar un gráfico de líneas. Se encuentra en el archivo components.js
        barGraph('chart1', productos, cantidadesVendidas, 'Cantidad Vendida', '');
    } else {
        document.getElementById('chart1').remove();
        console.log(DATA.error);
    }
}


/*
*   Función para abrir un reporte automático de productos por marca.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const openReportbrands = () => {
    // Se declara una constante tipo objeto con la ruta específica del reporte en el servidor.
    const PATH = new URL(`${SERVER_URL}reports/admin/productos_marca_general.php`);
    // Se abre el reporte en una nueva pestaña.
    window.open(PATH.href);
}

/*
*   Función para abrir un reporte automático de productos por marca.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const openReportcategories = () => {
    // Se declara una constante tipo objeto con la ruta específica del reporte en el servidor.
    const PATH = new URL(`${SERVER_URL}reports/admin/productos_categoria_general.php`);
    // Se abre el reporte en una nueva pestaña.
    window.open(PATH.href);
}