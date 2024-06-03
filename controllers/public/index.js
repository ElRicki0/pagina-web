//constante para la api
const PRODUCTO_API = 'services/public/producto.php'
const MARCA_API = 'services/public/marca.php'
// llamamos el id de productos
const PARAMS = new URLSearchParams(location.search);
const PRODUCTOS = document.getElementById('productos')
const MAIN_TITLE = document.getElementById('titleProductos')

const MARCAS = document.getElementById('marcas');
const MARCAS_TITLE = document.getElementById('titleMarcas');



// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // Se establece el título del contenido principal.
    MAIN_TITLE.textContent = 'Productos mas populares';
    const FORM = new FormData();
    FORM.append('id_producto', PARAMS.get('id'));
    // Petición para obtener las categorías disponibles.
    const DATA = await fetchData(PRODUCTO_API, 'read8Products');
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se inicializa el contenedor de categorías.
        PRODUCTOS.innerHTML = '';
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Se establece la página web de destino con los parámetros

            // let url = `products.html?id=${row.id_producto}&nombre=${row.nombre_producto}`;
            // Se crean y concatenan las tarjetas con los datos de cada categoría.
            PRODUCTOS.innerHTML += `
                            <div class="col-lg-3 col-md-4 col-sm-12">
                                <div class="card mb-3 shadow-lg">
                                    <img src="${SERVER_URL}images/productos/${row.imagen_producto}" class="card-img-top imagen_tarjeta"
                                        alt="Fallo al cargar la imagen">
                                    <div class="card-body">
                                        <h5 class="card-title">${row.nombre_producto}</h5>
                                        <p class="">$${row.precio_producto}</p>
                                        <p class="">Existencias: ${row.cantidad_producto}</p>
                                        <button class="btn btn_ver_mas" data-bs-toggle="collapse" href="#tarjetita-${row.id_producto}" role="button"
                                            aria-expanded="false" aria-controls="tarjetita-${row.id_producto}">Más información</button>
                                        <div class="collapse" id="tarjetita-${row.id_producto}">
                                            <div class="card card-body mt-2">
                                                <p class="mb-0">${row.descripcion_producto}</p>
                                                <div class="text-center mt-2">
                                                    <a href="producto.html?id=${row.id_producto}" class="btn btn-outline-primary">Mayor descripción
                                                        del producto</a>
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
        document.getElementById('mainTitle').textContent = DATA.error;
    }
});

// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    MARCAS_TITLE.textContent = 'Marcas disponibles';
    const DATA = await fetchData(MARCA_API, 'readMarcas');

    if (DATA.status) {
        MARCAS.innerHTML = `<div class="carousel-item active">
    <div class="d-flex justify-content-center">
        <div class="card" style="width: 25rem;">
            <div>
                <a href="../public/marca_especifica.html" type="button">
                    <img src="../../resources/img/imagenesIndex/marcas/sedal.png" class="card-img-top" alt="Sedal">
                </a>
            </div>
        </div>
    </div>
</div>

<button class="carousel-control-prev" type="button" data-bs-target="#carouselMarcas" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Anterior</span>
</button>
<button class="carousel-control-next" type="button" data-bs-target="#carouselMarcas" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Siguiente</span>
</button>`; // Limpiamos el contenido anterior

        DATA.dataset.forEach(row => {
            MARCAS.innerHTML += `
<div class="carousel-item">
    <div class="d-flex justify-content-center">
        <div class="card" style="width: 25rem;">
            <div>
                <a href="../public/marca_especifica.html" type="button">
                    <img src="${SERVER_URL}images/marcas/${row.imagen_marca}" class="card-img-top" alt="Sedal">
                </a>
            </div>
        </div>
    </div>
</div>`;
        });
    } else {
        document.getElementById('titleMarcas').textContent = DATA.error;
    }
});