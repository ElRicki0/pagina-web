//constante para la api
const PRODUCTO_API = 'services/public/producto.php'
const MARCA_API = 'services/public/marca.php'
// llamamos el id de productos
const PARAMS = new URLSearchParams(location.search);
const PRODUCTOS = document.getElementById('productos')

const MARCAS = document.getElementById('marcas');
const MARCAS_TITLE = document.getElementById('titleMarcas');


const PORTADA = document.getElementById('portada');
const PORTADA_TITLE = document.getElementById('mainTitlePortada');



// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
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
            <div class="col-sm-6 col-md-6 col-lg-3">
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
        <a href="../public/marca_producto_especifico.html?id=${row.id_marca}&nombre=${row.nombre_marca}&imagen=${row.imagen_marca}&descrip=${row.descripcion_marca}" type="button">
            <img src="${SERVER_URL}images/marcas/${row.imagen_marca}" class="img-fluid rounded mb-3 mt-3" alt="${row.nombre_marca}" style="width: 300px; height: 300px;">
                                    <p class="fw-medium fs-3 text-center text-light">${row.nombre_marca}</p>

        </a>
    </div>
</div>
`;
        });
    } else {
        document.getElementById('titleMarcas').textContent = DATA.error;
    }
});


// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
    // Se establece el título del contenido principal.
    PORTADA_TITLE.textContent = 'Ultimos lanzamientos';
    const FORM = new FormData();
    FORM.append('id_producto', PARAMS.get('id'));
    // Petición para obtener las categorías disponibles.
    const DATA = await fetchData(PRODUCTO_API, 'readProductosInicio');
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se inicializa el contenedor de categorías.
        PORTADA.innerHTML = '';
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            PORTADA.innerHTML += `
                <div class="col-lg-4 col-md-6 col-sm-12 noti1">
                    <a href="producto.html?id=${row.id_producto}">
                        <img src="${SERVER_URL}images/productos/${row.imagen_producto}" class="img-fluid" alt="${row.nombre_producto}"
                            data-nombre="${row.nombre_producto}"
                            data-precio="${row.precio_producto}"
                            data-cantidad="${row.cantidad_producto}"
                            data-descripcion="${row.descripcion_producto}">
                    </a>
                </div>
            `;
        });
    } else {
        // Se asigna al título del contenido de la excepción cuando no existen datos para mostrar.
        document.getElementById('PORTADA_TITLE').textContent = DATA.error;
    }
});
