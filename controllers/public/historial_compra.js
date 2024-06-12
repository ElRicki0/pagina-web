const PRODUCTO_API = 'services/public/producto.php';
const HISTORIAL_API = 'services/public/historial.php';

const LISTA = document.getElementById('lista');
const SUGERENCIA = document.getElementById('sugerencia');

// Constante tipo objeto para obtener los parámetros disponibles en la URL.
const PARAMS = new URLSearchParams(location.search);

// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
    // Llamada a la función para llenar la tabla con los registros existentes.
    fillTable();
});


// Método del evento para cuando el documento ha cargado.
const fillTable = async (form = null) => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();

    // Petición para obtener las categorías disponibles.
    const DATA = await fetchData(HISTORIAL_API, 'readAll');
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se inicializa el contenedor de categorías.
        LISTA.innerHTML = '';
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Se establece la página web de destino con los parámetros

            // let url = `products.html?id=${row.id_producto}&nombre=${row.nombre_producto}`;
            // Se crean y concatenan las tarjetas con los datos de cada categoría.
            LISTA.innerHTML += `

            <div class="card mb-12 ">
                    <div class="row g-0">
                        <div class="col-md-4 mt-3 text-center">
                            <img src="${SERVER_URL}images/SUGERENCIA/${row.imagen_producto}" width="150px"
                                class="img-fluid rounded-start" alt="...">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body shadow-lg">
                                <h5 class="card-title">${row.fecha_pedido}</h5>
                                <p class="card-text">${row.direccion_pedido}</p>
                                <p class="card-text">${row.nombre_producto}</p>
                                <div class="text-end">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
`;
        });

    } else {
        sweetAlert(4, DATA.error, true);
    }
}

// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {

    const FORM = new FormData();
    FORM.append('id_producto', PARAMS.get('id'));
    // Petición para obtener las categorías disponibles.
    const DATA = await fetchData(PRODUCTO_API, 'read2Products');
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se inicializa el contenedor de categorías.
        SUGERENCIA.innerHTML = '';
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Se establece la página web de destino con los parámetros

            // let url = `products.html?id=${row.id_producto}&nombre=${row.nombre_producto}`;
            // Se crean y concatenan las tarjetas con los datos de cada categoría.
            SUGERENCIA.innerHTML += `
                <div class="col-sm-12 col-md-12 col-lg-12">
            <div class="card mb-3">
                <div class="card-details">
                    <div class="d-flex justify-content-center">
                        <img src="${SERVER_URL}images/SUGERENCIA/${row.imagen_producto}" class="card-img-top mb-3 imagenMar" alt="${row.nombre_producto}">
                    </div>
                    <h5 class="card-title">${row.nombre_producto}</h5>
                    <div class="product-info">
                        <p class="product-price">Precio unitario: $${row.precio_producto}</p>
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
        // Se asigna al título del contenido de la excepción cuando no existen datos para mostrar.
        // document.getElementById('mainTitle').textContent = DATA.error;
    }
});