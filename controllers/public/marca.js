// Constante para completar la ruta de la API.
const MARCA_API = 'services/public/marca.php';

// Constante tipo objeto para obtener los parámetros disponibles en la URL.
const MARCA = document.getElementById('marcas');


// Método manejador de eventos para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
    // Se define un objeto con los datos de la categoría seleccionada.
    const FORM = new FormData();
    // Petición para solicitar las marcas de la categoría seleccionada.
    const DATA = await fetchData(MARCA_API, 'readAll', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se asigna como título principal la categoría de las marcas.
        MAIN_TITLE.textContent = 'Listado de marcas';
        // Se inicializa el contenedor de marcas.
        MARCA.innerHTML = '';
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Se crean y concatenan las tarjetas con los datos de cada marcas.
            MARCA.innerHTML += `
            <div class="row">
                <div class="col-lg-4 col-sm-12 text-center">
                <img src="${SERVER_URL}images/marcas/${row.imagen_marca}" 
                class="rounded rounded-5  shadow-lg imagen_marca" alt="${row.nombre_marca}">
                </div>
                    <div class="col-lg-8 ">
                        <p class="fs-1 textCat mt-1">${row.nombre_marca}</p>
                        <p class="fs-4">${row.descripcion_marca}</p>
                        <button type="button" class="btn btn_marca mt-4">
                            <a href="marca_producto_especifico.html?id=${row.id_marca}&nombre=${row.nombre_marca}&imagen=${row.imagen_marca}&descrip=${row.descripcion_marca}" class="btn-link">Ver productos</a>
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