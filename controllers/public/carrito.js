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
// Arreglo para guardar los pedidos
let pedidos = [];
// variable para guardar la cantidad de pedidos
let countpedidos = 0;
//constante con el id del pedido
const PEDIDO = PARAMS.get('idpedido')
// Método del eventos para cuando el documento ha cargado.

// Llamada a la función para mostrar el encabezado y pie del documento.
loadTemplate();


// metodo para cargar carrito
const load = async () => {
    // Constante tipo objeto con los datos del producto seleccionado.
    const FORM = new FormData();
    TABLE_BODY.innerHTML = '';
    TOTAL.innerText = '$ ' + 0
    CANTIDAD.innerText = 0 + ' productos en carrito';

    FORM.append('idProducto', PEDIDO);
    // Petición para solicitar los datos del producto seleccionado.
    const DATA = await fetchData(CARRITO_API, 'readDetail', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // LIMPIAR ZONA DONDE CARGARAN LOS DATOS
        let i = 0;
        let total = 0;
        let subtotal = [];
        // agregando los datos de la db al DOM

        DATA.dataset.forEach(element => {
            i++;
            TOTAL.innerText = '';
            TABLE_BODY.innerHTML += `
                    <tr>
                        <th scope="row">${i}</th>
                        <td>${element.nombre_producto}</td>
                        <td>${element.cantidad_pedido}</td>
                        <td>$${element.precio_pedido}</td>
                        <td>$${element.precio}</td>
                        <td>
                            <button type="button" name="deleteDetail" class="btn btn-outline-danger">Eliminar</button>
                        </td>
                    </tr>
                `;
            // guardando subtotales en un array para sumar, para sacar total
            subtotal[i] = element.precio;
            // guardando info de los pedidos en el arreglo para validar el cambio de estado
            countpedidos = DATA.dataset.length;
            pedidos += DATA.dataset;
        });
        // agregando al DOM la suma de los elementos del arreglo total
        //TOTAL.innerText = `$` + total.reduce((prev, current) => prev + current);
        subtotal.forEach(element => {
            total += parseFloat(element)
        });
        TOTAL.innerText = '$ ' + total.toFixed(2)
        CANTIDAD.innerText = i + ' productos en carrito';

        // obteniendo todos los elementos con nombre deleteDetail
        let eliminar = document.getElementsByName('deleteDetail');

        for (let i = 0; i < eliminar.length; i++) {
            // creando evento click para todos los botones eliminar
            eliminar[i].addEventListener('click', async () => {
                let confirm = await confirmAction('Desea eliminar este producto?');
                if (confirm) {
                    const FORM = new FormData();
                    FORM.append('idDetalle', DATA.dataset[i].id_detalle_entrega);
                    const JSON = await fetchData(CARRITO_API, 'deleteDetail', FORM);
                    if (JSON.status) {
                        sweetAlert(1, JSON.message, false)
                    } else {
                        sweetAlert(2, JSON.error, false);
                    }
                    console.log();
                    await load();
                }
            })
        }
    } else {
        sweetAlert(4, DATA.error, false, 'index.html');
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    await load();
});

// Método para finalizar el pedido a partir de la acción click del respectivo boton
PAGAR.addEventListener('click', async () => {
    // validando sí existen items en el carrito
    if (countpedidos !== 0) {
        confirm = await confirmAction('Desea finalizar la compra?');
        if (confirm) {
            const DATA = await fetchData(CARRITO_API, 'finishOrder');
            if (DATA.status) {
                sweetAlert(1, DATA.message, false, 'index.html');
            } else {
                sweetAlert(2, DATA.error, false);
            }
        }
    } else {
        //sino no va a dejar finalizar la acción
        sweetAlert(2, 'No sé puede finalizar el pedido ya que no hay items', false);
    }
});

// Método para finalizar el pedido a partir de la acción click del respectivo boton
CANCELAR.addEventListener('click', async () => {
    // validando cuando no hay items en el carrito
    if (countpedidos !== 0) {
        // confirmando acción
        confirm = await confirmAction('Desea cancelar la compra?');
        if (confirm) {
            const FORM = new FormData();
            FORM.append('idpedido', PEDIDO);
            const DATA = await fetchData(CARRITO_API, 'cancelDetail', FORM);
            DATA.status ? sweetAlert(1, DATA.message, false, 'index.html') : sweetAlert(2, DATA.error, false);
        }
    } else {
        //sino no va a dejar finalizar la acción
        sweetAlert(2, 'No sé puede finalizar el pedido ya que no hay items', false);
    }
})                