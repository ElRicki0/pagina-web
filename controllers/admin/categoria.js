// Constante para completar la ruta de la API.
const CATEGORIA_API = 'services/admin/categoria.php';
// Constante para establecer el contenedor de categorías.
const CATEGORIAS = document.getElementById('categorias');

//modals de pagina de categoria
const modal_agregar_categoria = new bootstrap.Modal('#modal_agregar_categoría'),
MODAL_TITLE = document.getElementById('modalTitle');

const modal_editar_categoria = new bootstrap.Modal('#modal_editar_categoría');

// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    
    // Petición para obtener las categorías disponibles.
    const DATA = await fetchData(CATEGORIA_API, 'readAll');
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se inicializa el contenedor de categorías.
        CATEGORIAS.innerHTML = '';
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Se establece la página web de destino con los parámetros.
            let url = `products.html?id=${row.id_categoria}&nombre=${row.nombre_categoria}`;
            // Se crean y concatenan las tarjetas con los datos de cada categoría.
            CATEGORIAS.innerHTML += `

            <!-- Contenedor donde esta la tarjeta -->
                <div class="col-sm-6 col-md-4 col-lg-3">
                    <div class="card my-3">
                        <img src="../..resources/img/categoria/${row.imagen_categoria_producto}" class="card-img-top"
                            alt="Besos indesentes">
                        <div class="card-body">
                            <!-- Título y descripción del producto  -->
                            <h5 class="card-title">${row.nombre_categoria_producto}</h5>
                            <p class="card-text">${row.descripcion_categoria_producto}</p>
                            <!-- Botones de acción (Eliminar, Editar, Información)  -->
                            <div class="btn btn-outline-danger" onclick="alertMine('eliminar')">
                                <img id="" src="../../resources/img/iconos/papelera.png" class="botones_productos">
                            </div>
                            <div class="btn btn-outline-warning" onclick="editar_categoria()">
                                <img src="../../resources/img/iconos/lapiz.png" class="botones_productos">
                            </div>
                            <div class="btn btn-outline-info" onclick="alertMine('información_categoría')">
                                <img src="../../resources/img/iconos/info.png" class="botones_productos">
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


//Apartado de modals

//agregar categoría

// Evento show.bs.modal del modal
document.getElementById('modal_agregar_categoría').addEventListener('show.bs.modal', function (event) {
    // Encuentra el formulario dentro del modal
    var form = event.target.querySelector('form');
    // Resetea el formulario
    form.reset();
});

// mostrar el modal
function crear_categoria() {
    // Muestra el modal
    modal_agregar_categoria.show();
}

//editar categoría
document.getElementById('modal_editar_categoría').addEventListener('show.bs.modal', function (event) {
    // Encuentra el formulario dentro del modal
    var form_e = event.target.querySelector('form');
    // Resetea el formulario
    form_ee.reset();
});

function editar_categoria() {
    // Muestra el modal
    modal_editar_categoria.show();
}