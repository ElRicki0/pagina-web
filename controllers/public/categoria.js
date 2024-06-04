// Constante para completar la ruta de la API.
const CATEGORIA_API = 'services/public/categoria.php';

// Constante tipo objeto para obtener los parámetros disponibles en la URL.
const CATEGORIA = document.getElementById('categorias');


// Método manejador de eventos para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
    // Por el momento la e comentado, porque aun en nuestro sistema no existe esa funcion "lea"
    // Se define un objeto con los datos de la categoría seleccionada.
    const FORM = new FormData();
    // Petición para solicitar las categorias existentes.
    const DATA = await fetchData(CATEGORIA_API, 'readAll', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se asigna como título principal al listado de las categorias.
        MAIN_TITLE.textContent = 'Listado de categorias disponibles';
        // Se inicializa el contenedor de categorias.
        CATEGORIA.innerHTML = '';
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Se crean y se muestran el formato de estilo para las categorias.
            CATEGORIA.innerHTML += `
            <div class="row">
                <div class="col-lg-4 col-sm-12 text-center">
                <img src="${SERVER_URL}images/categorias/${row.imagen_categoria_producto}" 
                class="rounded rounded-5  shadow-lg imagen_marca" alt="${row.nombre_categoria_producto}">
                </div>
                    <div class="col-lg-8 ">
                        <p class="fs-1 textCat mt-1">${row.nombre_categoria_producto}</p>
                        <p class="fs-4">${row.descripcion_categoria_producto}</p>
                        <button type="button" class="btn btn_marca mt-4">
                            <a href="categoria_descripcion_especifico.html?id=${row.id_categoria_producto}&nombre=${row.nombre_categoria_producto}&imagen=${row.imagen_categoria_producto}&descrip=${row.descripcion_categoria_producto}" class="btn-link">Ver productos</a>
                        </button>
                 </div>
            </div>
            <hr class="opacity-75 liniaSeparadora">
            `;
        });
    } else {
        // Se presenta un mensaje de error cuando no existen datos para mostrar.
        MAIN_TITLE.textContent = DATA.error;
    }
});