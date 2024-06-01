// Constante para completar la ruta de la API.
const PRODUCTO_API = 'services/public/producto.php';
// Constante tipo objeto para obtener los parámetros disponibles en la URL.
const PARAMS = new URLSearchParams(location.search);
const PRODUCTOS = document.getElementById('productosMarc');
const MAIN_TITLE = document.getElementById('mainTitle');
const IMAGEN = document.getElementById('imagenMarca');
const DESCRIP = document.getElementById('descripcionMarca');


// Método manejador de eventos para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // Se define un objeto con los datos de la categoría seleccionada.
    const FORM = new FormData();
    FORM.append('idMarca', PARAMS.get('id'));
    // Petición para solicitar los productos de la categoría seleccionada.
    const DATA = await fetchData(PRODUCTO_API, 'readProductosMarca', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        console.log(DATA);
        // Se asigna como título principal la categoría de los productos.
        MAIN_TITLE.textContent = `${PARAMS.get('nombre')}`;
        IMAGEN.innerHTML = `
        <div class="imagenMarcaS img-fluid  mx-auto d-block">
        <img src="${SERVER_URL}images/marcas/${PARAMS.get('imagen')}" alt="">
        </div>`;
        DESCRIP.innerHTML = `${PARAMS.get('descrip')}`;
        // Se inicializa el contenedor de productos.
        PRODUCTOS.innerHTML = '';
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Se crean y concatenan las tarjetas con los datos de cada producto.
            PRODUCTOS.innerHTML += `
    <div class="col-sm-12 col-md-6 col-lg-3">
        <div class="card mb-3 col-sm-12 col-md-6 col-lg-3">
            <div class="card-details">
                <h5 class="card-title">${row.nombre_producto}</h5>
                <img src="${SERVER_URL}images/productos/${row.imagen_producto}" class="card-img-top" alt="${row.nombre_producto}">
                <div class="product-info">
                    <p class="product-price">Precio unitario (US$) ${row.precio_producto}</p>
                    <p class="product-description">${row.descripcion_producto}</p>
                </div>
            </div>
            <button class="card-button">
                <a href="detail.html?id=${row.id_producto}" class="btn">Ver detalle</a>
            </button>
        </div>
    </div>
`;

        });
    } else {
        // Se presenta un mensaje de error cuando no existen datos para mostrar.
        MAIN_TITLE.textContent = DATA.error;
    }
});