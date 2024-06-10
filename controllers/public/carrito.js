// Constantes para completar las rutas de la API.
const CARRITO_API = 'services/admin/carrito.php';

// Constantes para establecer el contenido de la tabla.
const TABLE_BODY = document.getElementById('tarjetas');

// Constantes para establecer los elementos del componente Modal.
const DETALLE_MODAL = new bootstrap.Modal('#masInfo2');
// Constantes para establecer el contenido de la tabla de productos.

// Constante tipo objeto para obtener los parámetros disponibles en la URL.
const PARAMS = new URLSearchParams(location.search);
// // Constante para establecer el formulario de agregar un producto al carrito de compras.
const SHOPPING_FORM = document.getElementById('shoppingForm');

// Método del eventos para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {

    // Constante tipo objeto con los datos del producto seleccionado.
    const FORM = new FormData();
    FORM.append('idProducto', PARAMS.get('id'));
    // Petición para solicitar los datos del producto seleccionado.
    const DATA = await fetchData(PRODUCTO_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se colocan los datos en la página web de acuerdo con el producto seleccionado previamente.
        document.getElementById('imagenProducto').src = SERVER_URL.concat('images/productos/', DATA.dataset.imagen_producto);
        document.getElementById('nombreProducto').textContent = DATA.dataset.nombre_producto;
        document.getElementById('descripcionProducto').textContent = DATA.dataset.descripcion_producto;
        document.getElementById('precioProducto').textContent = DATA.dataset.precio_producto;
        document.getElementById('cantidadProducto').textContent = DATA.dataset.cantidad_producto;
        document.getElementById('idProducto').value = DATA.dataset.id_producto;
    } else {
        // Se presenta un mensaje de error cuando no existen datos para mostrar.
        document.getElementById('mainTitle').textContent = DATA.error;
        // // Se limpia el contenido cuando no hay datos para mostrar.
        document.getElementById('detalle').innerHTML = '';
    }
});

// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {

    const FORM = new FormData();
    FORM.append('idProducto', PARAMS.get('id'));
    // Petición para obtener las categorías disponibles.
    const DATA = await fetchData(PRODUCTO_API, 'readOneMarca', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {

        // Se establece la página web de destino con los parámetros
        let url = `products.html?id=${row.id_producto}&nombre=${row.nombre_producto}`;
        // Se crean y concatenan las tarjetas con los datos de cada categoría.
        MARCAS.innerHTML = `
                    <a href="marca_producto_especifico.html?id=${DATA.dataset.id_marca}&nombre=${DATA.dataset.nombre_marca}&imagen=${DATA.dataset.imagen_marca}&descrip=
                    ${DATA.dataset.descripcion_marca}"class="btn btn-outline-primary">${DATA.dataset.nombre_marca}</a>
`;

    } else {
        // Se asigna al título del contenido de la excepción cuando no existen datos para mostrar.
        document.getElementById('mainTitle').textContent = DATA.error;
    }
});

// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    
    const FORM = new FormData();
    FORM.append('id_producto', PARAMS.get('id'));
    // Petición para obtener las categorías disponibles.
    const DATA = await fetchData(PRODUCTO_API, 'read8Products');
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se inicializa el contenedor de categorías.
        SUGPRODUCTO.innerHTML = `
        <div class="carousel-item active">
        <div class="d-flex justify-content-center">
            <div class="card">
                <div class="img-wrapper">
                    <img src="../../resources/img/imagenesIndex/producto8.jpg" alt="...">
                </div>
                <div class="card-body">
                    <h5 class="card-title">Protector Solar Nivea Control De Brillo</h5>
                    <p class="">$14.80
                    </p>
                    <div class="text-center mt-2">
                        <a href="../public/descripcion_producto.html"
                            class="btn btn_ver_mas">Más información</a>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
    
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {

            SUGPRODUCTO.innerHTML += `
        <div class="carousel-item">
        <div class="d-flex justify-content-center">
            <div class="card">
                <div class="img-wrapper">
                    <img src="${SERVER_URL}images/productos/${row.imagen_producto}" alt="...">
                </div>
                <div class="card-body">
                    <h5 class="card-title">${row.nombre_producto}</h5>
                    <p class="">$${row.precio_producto}
                    </p>
                    <div class="text-center mt-2">
                    <a href="producto.html?id=${row.id_producto}" class="btn">Ver detalle</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;
        });
    } else {
        // Se asigna al título del contenido de la excepción cuando no existen datos para mostrar.
        document.getElementById('mainTitle').textContent = DATA.error;
    }
});