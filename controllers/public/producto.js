const PRODUCTO_API = 'services/public/producto.php';
const LISTA_API = 'services/public/lista_deseo.php';

const MARCAS = document.getElementById('marcas');
const SUGPRODUCTO = document.getElementById('sugerenciasProductos');
const COMENTARIOS = document.getElementById('comentarios');
const SHOPPING_FORM = document.getElementById('shoppingForm');

// Se manda a llamar la api de comentarios para que pueda comentar
const COMENTARIOS_API = 'services/public/comentario.php';

//FORMULARIO PARA GUARDAR VALORACIONES
const SAVE_FORM = document.getElementById('saveForm');
const COMENTARIO_VALORACION = document.getElementById('comentario');

const PARAMS = new URLSearchParams(window.location.search);
// OBTENIENDO EL ID DEL PRODUCTO
const IDPRODUCTO = PARAMS.get('id');

// Constantes para completar las rutas de la API.
const CARRITO_API = 'services/public/carrito.php';

// Método del eventos para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
    // Constante tipo objeto con los datos del producto seleccionado.
    const FORM = new FormData();
    FORM.append('idProducto', IDPRODUCTO);
    console.log(PARAMS.get('id'));
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
        document.getElementById('listaProducto').value = DATA.dataset.id_producto;
    } else {
        // Se presenta un mensaje de error cuando no existen datos para mostrar.
        // document.getElementById('mainTitle').textContent = DATA.error;
        // // Se limpia el contenido cuando no hay datos para mostrar.
        // document.getElementById('detalle').innerHTML = '';
    }
});

// Método del evento para cuando se envía el formulario de agregar un producto al carrito.
SHOPPING_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SHOPPING_FORM);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(CARRITO_API, 'createDetail', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se constata si el cliente ha iniciado sesión.
    if (DATA.status) {
        sweetAlert(1, DATA.message, false, 'carrito_compra.html' + '?idpedido=' + encodeURIComponent(DATA.dataset));
    } else if (DATA.session) {
        sweetAlert(2, DATA.error, false, 'inicio_sesion.html');
    } else {
        sweetAlert(3, DATA.error, true, 'inicio_sesion.html');
    }
});


// Constantes para establecer los elementos de la tabla.
const TABLE_BODY = document.getElementById('tableBody'),
    ROWS_FOUND = document.getElementById('rowsFound');

// // Constante para establecer el formulario de agregar un producto al carrito de compras.
// const SHOPPING_FORM = document.getElementById('shoppingForm');

// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {

    const FORM = new FormData();
    FORM.append('idProducto', IDPRODUCTO);
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
    FORM.append('id_producto', IDPRODUCTO);
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
                    <a href="producto.html?id=${row.id_producto}" class="card-button text-center">
                    <button class="btn">Ver detalle</button>
                </a>
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

stars.forEach(function (star, index) {
    star.addEventListener('click', function () {
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

// Método del evento para cuando se envía el formulario de guardar.
SAVE_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();

    // Obtener todas las estrellas (calificaciones) y encontrar la seleccionada.
    const estrellas = document.getElementsByName('rating');
    let seleccion = null;
    for (const estrella of estrellas) {
        if (estrella.checked) {
            seleccion = estrella.value;
            break;
        }
    }

    console.log(PARAMS.get('id'));
    console.log(seleccion);

    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM);
    FORM.append('id_producto', PARAMS.get('id')); // Cambiado a id_producto
    FORM.append('estrella', seleccion); // Cambiado a estrella

    console.log(FORM);

    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(COMENTARIOS_API, 'createComentario', FORM);
    console.log(DATA);

    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra un mensaje de éxito.
        sweetAlert(5, DATA.message, true);
        // Actualiza los comentarios del producto.
        // await updateComments();
        SAVE_FORM.reset();
    } else {
        // Se muestra un mensaje de error.
        sweetAlert(2, DATA.error, false);
    }
});


// Función para actualizar los comentarios del producto.
async function updateComments() {
    // Se inicializa el contenido de la tabla.
    ROWS_FOUND.textContent = '';
    TABLE_BODY.innerHTML = '';


    const FORM = new FormData();
    FORM.append('idProducto2', IDPRODUCTO);

    // Petición para obtener los comentarios del producto.
    const DATA = await fetchData(PRODUCTO_API, 'readComentarios', FORM);

    if (DATA.status) {
        DATA.dataset.forEach(row => {
            TABLE_BODY.innerHTML += `
                <tr>
                    <td>
                        <img class="rounded-circle" width="75" height="75" alt="${row.nombre_cliente}" src="${SERVER_URL}images/clientes/${row.imagen_cliente}">
                    </td>
                    <td>${row.nombre_cliente}</td>
                    <td>${row.comentario}</td>
                    <td>${generateStars(row.estrella)}</td>
                    <td>${row.fecha_comentario}</td>
                </tr>`;
        });
    } else {
        // Se asigna al título del contenido de la excepción cuando no existen datos para mostrar.
        document.getElementById('mainTitle').textContent = DATA.error;
    }
};


const generateStars = (rating) => {
    let starsHTML = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            starsHTML += `
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="#4A00BB" class="bi bi-star-fill " viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
            `;
        } else {
            starsHTML += `
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="#000000" class="bi bi-star " viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
            `;
        }
    }
    return starsHTML;
}




// Función para actualizar los comentarios del producto.
// async function updateComments() {
//     const idProducto = PARAMS.get('id'); // Supongo que el id del producto se obtiene de los parámetros de la URL.

//     // Se inicializa el contenido de la tabla.
//     ROWS_FOUND.textContent = '';
//     TABLE_BODY.innerHTML = '';

//     const FORM = new FormData();
//     FORM.append('idProducto2', IDPRODUCTO);

//     // Petición para obtener los comentarios del producto.
//     const DATA = await fetchData(PRODUCTO_API, 'readComentarios', FORM);

//     if (DATA.status) {
//         DATA.dataset.forEach(row => {
//             TABLE_BODY.innerHTML += `
//                 <tr>
//                     <td>
//                         <img class="rounded-circle" width="75" height="75" alt="${row.nombre_cliente}" src="${SERVER_URL}images/clientes/${row.imagen_cliente}">
//                     </td>
//                     <td>${row.nombre_cliente}</td>
//                     <td>${row.comentario}</td>
//                     <td>${generateStars(row.estrella)}</td>
//                     <td>${row.fecha_comentario}</td>
//                 </tr>`;
//         });
//     } else {
//         // Se asigna al título del contenido de la excepción cuando no existen datos para mostrar.
//         document.getElementById('mainTitle').textContent = DATA.error;
//     }
// }

// Llamada inicial para cargar los comentarios cuando se carga la página.
document.addEventListener('DOMContentLoaded', updateComments);
/*
*   Función asíncrona para agregar un producto a la lista de deseos.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
const createRowLista = async () => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Desea agregar producto a lista de deseos?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('idProducto', document.getElementById('listaProducto').value);
        // Petición para eliminar el registro seleccionado.
        const DATA = await fetchData(LISTA_API, 'createRow', FORM);
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            // Se muestra un mensaje de éxito.
            await sweetAlert(1, DATA.message, true);
            // Se carga nuevamente la tabla para visualizar los cambios.
            fillTable();
        } else {
            sweetAlert(2, DATA.error, false);
        }
    }
}