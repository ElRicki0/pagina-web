const LISTA_API = 'services/public/lista_deseo.php';
const PRODUCTO_API = 'services/public/producto.php';

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
    const DATA = await fetchData(LISTA_API, 'readOne');
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
                            <img src="${SERVER_URL}images/productos/${row.imagen_producto}" width="150px"
                                class="img-fluid rounded-start" alt="...">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body shadow-lg">
                                <h5 class="card-title">${row.nombre_producto}</h5>
                                <p class="card-text">${row.descripcion_producto}</p>
                                <h6 class="card-subtitle mb-2 text-body-secondary">$${row.precio_producto}</h6>
                                <div class="text-end">
                                    <button class="btn btn-outline-success" >
                                        <a href="producto.html?id=${row.id_producto}" class="card-button text-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" fill="#000000"
                                            class="bi bi-cart mx-3" viewBox="0 0 16 16">
                                            <path
                                                d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                                        </svg>
                                    </button>
                                    <button class="btn btn-outline-danger" onclick="openDelete(${row.id_lista_deseo})">
                                        <img id="" src="../../resources/img/iconos/papelera.png" class="">
                                    </button>
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

const openDelete = async (id) => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Desea eliminar el producto de lista de deseos?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('id_lista_deseo', id);
        // Petición para eliminar el registro seleccionado.
        const DATA = await fetchData(LISTA_API, 'deleteRow', FORM);
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            // Se carga nuevamente la tabla para visualizar los cambios.
            fillTable();
            // Se muestra un mensaje de éxito.
            await sweetAlert(1, DATA.message, true);

        } else {
            sweetAlert(2, DATA.error, false);
        }
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
                        <img src="${SERVER_URL}images/productos/${row.imagen_producto}" class="card-img-top mb-3 imagenMar" alt="${row.nombre_producto}">
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