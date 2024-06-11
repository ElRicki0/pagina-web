const LISTA_API = 'services/public/lista_deseo.php';

const LISTA = document.getElementById('lista');
const SUGERENCIA = document.getElementById('sugerencia');

// Constante tipo objeto para obtener los parámetros disponibles en la URL.
const PARAMS = new URLSearchParams(location.search);


// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
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

            <div class="card mb-12 w-100">
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
                                    <div class="btn btn-outline-success" onclick="alertMine('agregarAlCarrito')">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" fill="#000000"
                                            class="bi bi-cart mx-3" viewBox="0 0 16 16">
                                            <path
                                                d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                                        </svg>
                                    </div>
                                    <div class="btn btn-outline-danger" onclick="alertMine('eliminarProductoCompra')">
                                        <img id="" src="../../resources/img/iconos/papelera.png" class="">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
`;
        });
    } else {
        // Se asigna al título del contenido de la excepción cuando no existen datos para mostrar.
        // document.getElementById('mainTitle').textContent = DATA.error;
    }
});