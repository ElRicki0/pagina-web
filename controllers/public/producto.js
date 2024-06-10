const PRODUCTO_API = 'services/public/producto.php';

const MARCAS = document.getElementById('marcas');
const SUGPRODUCTO = document.getElementById('sugerenciasProductos');
const COMENTARIOS = document.getElementById('comentarios');


// Constante tipo objeto para obtener los parámetros disponibles en la URL.
const PARAMS = new URLSearchParams(location.search);
// // Constante para establecer el formulario de agregar un producto al carrito de compras.
// const SHOPPING_FORM = document.getElementById('shoppingForm');

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
        // document.getElementById('mainTitle').textContent = DATA.error;
        // // Se limpia el contenido cuando no hay datos para mostrar.
        // document.getElementById('detalle').innerHTML = '';
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

        // let url = `products.html?id=${row.id_producto}&nombre=${row.nombre_producto}`;
        // Se crean y concatenan las tarjetas con los datos de cada categoría.
        MARCAS.innerHTML = `
                    <a href="marca_producto_especifico.html?id=${DATA.dataset.id_marca}&nombre=${DATA.dataset.nombre_marca}&imagen=${DATA.dataset.imagen_marca}&descrip=${DATA.dataset.descripcion_marca}" class="btn btn-outline-primary">${DATA.dataset.nombre_marca}</a>
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



const stars = document.querySelectorAll('.star');

let rating = 0;  // Variable global para almacenar el valor del rating
 
stars.forEach(function(star, index) {
    star.addEventListener('click', function() {
        for (let i = 0; i <= index; i++) {
            stars[i].classList.add('checked');
        }
        for (let i = index + 1; i < stars.length; i++) {
            stars[i].classList.remove('checked');
        }
        // Asignar la variable con el valor de la estrella seleccionada
        rating = index + 1;
        // Imprimir la variable en la consola
        console.log('Rating seleccionado:', rating);
    });
});



document.addEventListener('DOMContentLoaded', async () => {
    COMENTARIOS.innerHTML = '';
    
    const FORM = new FormData();
    FORM.append('idProducto', PARAMS.get('id'));
    // Petición para obtener las categorías disponibles.
    const DATA = await fetchData(PRODUCTO_API, 'readComentarios');
    if (DATA.status) {
        DATA.dataset.forEach(row => {
            COMENTARIOS.innerHTML += `
                <div class="row py-3">
                    <div class="col-1 py-2">
                        <img class="rounded-circle" width="75" height="75" alt="${row.alias_cliente}" src="${SERVER_URL}images/clientes/${row.imagen_cliente}">
                    </div>
                    <div class="col-12 col-lg-10 comentarios_clientes">
                        <div class="row">
                            <div class="col-9 col-lg-12 py-2 px-4">
                                <p>${row.comentario}</p>
                                <div class="row">
                                    <div class="col-8 col-lg-8">
                                        ${generateStars(row.estrlla)}
                                    </div>
                                    <div class="col-8 col-lg-4">
                                        <p class="fs-6"><b>${row.fecha_comentario}</b></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
    } else {
        document.getElementById('mainTitle').textContent = DATA.error;
    }
});


const generateStars = (rating) => {
    let starsHTML = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            starsHTML += `
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-star-fill estrella_ejemplo" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
            `;
        } else {
            starsHTML += `
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-star-fill estrella_ejemplo_apagada" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
            `;
        }
    }
    return starsHTML;
}