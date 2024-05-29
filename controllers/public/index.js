//constante para la api
const PRODUCTO_API = '../../api/services/public/producto.php'
// llamamos el id de productos
const PRODUCTOS = document.getElementById('productos')
const MAIN_TITLE = document.getElementById('titleProductos')


// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // Se establece el título del contenido principal.
    MAIN_TITLE.textContent = 'Productos mas populares';
    // Petición para obtener las categorías disponibles.
    const DATA = await fetchData(PRODUCTO_API, 'read8Products');
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se inicializa el contenedor de categorías.
        PRODUCTOS.innerHTML = '';
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Se establece la página web de destino con los parámetros.

            // let url = `products.html?id=${row.id_producto}&nombre=${row.nombre_producto}`;
            
            // Se crean y concatenan las tarjetas con los datos de cada categoría.
            PRODUCTOS.innerHTML += `
                <div class="col-sm-12 col-md-6 col-lg-3">
                    <div class="card mb-3">
                        <img src="${SERVER_URL}images/productos/${row.imagen_producto}" class="card-img-top" alt="${row.nombre_producto}">
                        <div class="card-body text-center">
                            <h5 class="card-title">${row.nombre_producto}</h5>
                        </div>
                    </div>
                </div>
            `;
            
            // <p class="card-text">${row.descripcion_categoria}</p>
            // <a href="${url}" class="btn btn-primary">Ver productos</a>
        });
    } else {
        // Se asigna al título del contenido de la excepción cuando no existen datos para mostrar.
        document.getElementById('mainTitle').textContent = DATA.error;
    }
});