const PRODUCTO_API = 'services/public/producto.php';

// Constante para establecer el formulario de buscar.
const SEARCH_FORM = document.getElementById('searchForm');
// Constantes para establecer el contenido de la tabla.


const PRODUCTOS = document.getElementById('productos');

// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
    // Se establece el título del contenido principal.
    MAIN_TITLE.textContent = 'Listado Productos';
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

// Método manejado de eventos para cuando el documento ha cargado.
const fillTable = async (form = null) => {
    // Se inicializa el contenido de la tabla.
    PRODUCTOS.innerHTML = '';
    // Se verifica la acción a realizar.
    (form) ? action = 'searchRows' : action = 'readAll';
    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(PRODUCTO_API, action, form);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se asigna como título principal la categoría de las marcas.
        MAIN_TITLE.textContent = 'Listado de producto';
        // Se inicializa el contenedor de marcas.
        // PRODUCTOS.innerHTML = '';
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Se crean y concatenan las tarjetas con los datos de cada marcas.
            PRODUCTOS.innerHTML += `
            <div class="col-sm-6 col-md-6 col-lg-3">
            <div class="card mb-3">
                <div class="card-details">
                    <div class="d-flex justify-content-center">
                        <img src="${SERVER_URL}images/productos/${row.imagen_producto}" class="card-img-top mb-3 imagenMar" alt="${row.nombre_producto}">
                    </div>
                    <h5 class="card-title">${row.nombre_producto}</h5>
                    <div class="product-info">
                        <p class="product-price">Precio unitario: $${row.precio_producto}</p>
                        <p class="product-price">Marca: ${row.nombre_marca}</p>
                        <p class="product-price">Existencias: ${row.cantidad_producto}</p>
                        <p class="product-description mb-4">Descripción: ${row.descripcion_producto}</p>
                    </div>
                </div>
                <a href="producto.html?id=${row.id_producto}" class="card-button text-center">
                    <button class="btn">Ver detalle</button>
                </a>
            </div>
        </div>
            `;
        });
    } else {
        // Se presenta un mensaje de error cuando no existen datos para mostrar.
        MAIN_TITLE.textContent = DATA.error;
    }
};