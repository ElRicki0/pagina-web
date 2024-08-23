<?php
// Se incluye la clase del modelo.
require_once('../../models/data/carrito_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $carrito = new CarritoData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'session' => 0, 'message' => null, 'error' => null, 'exception' => null, 'dataset' => null);
    // Se verifica si existe una sesión iniciada como cliente para realizar las acciones correspondientes.
    if (isset($_SESSION['idCliente'])) {
        $result['session'] = 1;
        // Se compara la acción a realizar cuando un cliente ha iniciado sesión.
        switch ($_GET['action']) {
                // Acción para agregar un producto al carrito de compras.
            case 'createDetail':
                $_POST = Validator::validateForm($_POST);
                if (!$carrito->startOrder()) {
                    $result['error'] = 'Ocurrió un problema al iniciar el pedido';
                } elseif (
                    !$carrito->setProductopedido($_POST['idProducto']) or
                    !$carrito->setCantidad($_POST['cantidadProducto'])
                ) {
                    $result['error'] = $carrito->getDataError();
                } elseif ($carrito->createDetail()) {
                    $result['status'] = 1;
                    $result['message'] = 'Producto agregado correctamente';
                    $result['dataset'] =  $_SESSION['idPedido'];
                } else {
                    $result['error'] = 'Ocurrió un problema al agregar el producto';
                    $result['dataset'] =  $_SESSION['idPedido'];
                }
                break;
                // Acción para obtener los productos agregados en el carrito de compras.
            case 'readDetail':
                if (!$carrito->getOrder()) {
                    $result['error'] = 'No ha agregado productos al carrito';
                    $result['status'] = 2;
                } elseif ($result['dataset'] = $carrito->readDetail()) {
                    $result['status'] = 1;
                    // $result['dataset'] = $_S;
                } else {
                    $result['error'] = 'No existen productos en el carrito';
                }
                break;
                // Acción para remover un producto del carrito de compras.
            case 'cancelDetail':
                if (!$carrito->setCarritopedido($_POST['idpedido'])) {
                    $result['error'] = $carrito->getDataError();
                } elseif ($carrito->updateDetail()) {
                    $result['status'] = 1;
                    $result['message'] = 'Orden removida correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al remover la orden';
                }
                break;
            case 'deleteDetail':
                if (!$carrito->setId($_POST['idDetalle'])) {
                    $result['error'] = $carrito->getDataError();
                } else if ($carrito->deleteDetail()) {
                    $result['status'] = "1";
                    $result['message'] = 'Producto eliminado de su carrito';
                }
                break;
/*            case 'deleteOrder':
                if (!$carrito->setCarritopedido($_POST['idpedido'])) {
                    $result['error'] = $carrito->getDataError();
                } elseif ($carrito->updateDetail()) {
                    $result['status'] = 1;
                    $result['message'] = 'Producto removido correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al remover el producto';
                }
                break;
                
*/
                // Acción para finalizar el carrito de compras.
            case 'finishOrder':
                if ($carrito->finishOrder()) {
                    $result['status'] = 1;
                    $result['message'] = 'Pedido finalizado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al finalizar el pedido';
                }
                break;
            default:
                $result['error'] = 'Acción no disponible dentro de la sesión';
        }
    } else {
        // Se compara la acción a realizar cuando un cliente no ha iniciado sesión.
        switch ($_GET['action']) {
            case 'createDetail':
                $result['error'] = 'Debe iniciar sesión para agregar el producto al carrito';
                break;
            default:
                $result['error'] = 'Acción no disponible fuera de la sesión';
        }
    }
    // Se obtiene la excepción del servidor de base de datos por si ocurrió un problema.
    $result['exception'] = Database::getException();
    // Se indica el tipo de contenido a mostrar y su respectivo conjunto de caracteres.
    header('Content-type: application/json; charset=utf-8');
    // Se imprime el resultado en formato JSON y se retorna al controlador.
    print(json_encode($result));
} else {
    print(json_encode('Recurso no disponible'));
}
