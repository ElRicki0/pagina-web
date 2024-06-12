// Constantes para completar las rutas de la API.
const CARRITO_API = 'services/public/carrito.php';

// Constantes para establecer el contenido de la tabla.
const TABLE_BODY = document.getElementById('tarjetas');
// Constante tipo objeto para obtener los parámetros disponibles en la URL.
const PARAMS = new URLSearchParams(location.search);
// constante con el obj del dom para cargar total a pagar
const TOTAL = document.getElementById('total');
// constante para agregar el cant de productos al dom
const CANTIDAD = document.getElementById('cantidadproducto');
// acciones para realizar (pagar y cancelar)
const PAGAR = document.getElementById('pagar');
const CANCELAR = document.getElementById('cancelar');

//constante con el id del pedido
const PEDIDO = PARAMS.get('idpedido')
// Método del eventos para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {

    // Constante tipo objeto con los datos del producto seleccionado.
    const FORM = new FormData();
    FORM.append('idProducto', PEDIDO);
    // Petición para solicitar los datos del producto seleccionado.
    const DATA = await fetchData(CARRITO_API, 'readDetail', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // LIMPIAR ZONA DONDE CARGARAN LOS DATOS
        TABLE_BODY.innerHTML = '';
        let i = 1;
        let total = [];
        // agregando los datos de la db al DOM
        DATA.dataset.forEach(element => {
            TABLE_BODY.innerHTML += `
                    <tr>
                        <th scope="row">${i}</th>
                        <td>${element.nombre_producto}</td>
                        <td>${element.cantidad_pedido}</td>
                        <td>$${element.precio_pedido}</td>
                        <td>$${element.precio}</td>
                    </tr>
                `;
            i++;
            // guardando subtotales en un array para sumar, para sacar total
            total[i] = element.precio;
        });
        // agregando al DOM la suma de los elementos del arreglo total
        TOTAL.innerText = `$` + total.reduce((prev, current) => prev + current);
        CANTIDAD.innerText = i + ' productos en carrito';
    } else {
        // Se presenta un mensaje de error cuando no existen datos para mostrar.
        document.getElementById('mainTitle').textContent = DATA.error;
        // // Se limpia el contenido cuando no hay datos para mostrar.
        document.getElementById('detalle').innerHTML = '';
    }
});

// Método para finalizar el pedido a partir de la acción click del respectivo boton
PAGAR.addEventListener('click', async () => {
    confirm = await confirmAction('Desea finalizar la compra?');
    if (confirm) {
        const DATA = await fetchData(CARRITO_API, 'finishOrder');
        (DATA.status) ? sweetAlert(1, DATA.message, false, 'index.html') : sweetAlert(2, DATA.error, false);
    }
});

// Método para finalizar el pedido a partir de la acción click del respectivo boton
CANCELAR.addEventListener('click', async () => {
    confirm = await confirmAction('Desea cancelar la compra?');
    if (confirm) {
        const FORM = new FormData();
        FORM.append('idpedido', PEDIDO);
        const DATA = await fetchData(CARRITO_API, 'deleteDetail', FORM);
        DATA.status ? sweetAlert(1, DATA.message, false, 'index.html') : sweetAlert(2, DATA.error, false);
    }
})