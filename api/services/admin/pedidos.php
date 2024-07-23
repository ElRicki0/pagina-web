<?php
// Se incluye la clase del modelo.
require_once('../../models/data/pedidos_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $pedido = new PedidoData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idAdministrador'])) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $pedido->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;
            case 'createRow':

                $_POST = Validator::validateForm($_POST);
                if (
                    !$pedido->setPedido($_POST['pedidoDetalle']) or
                    !$pedido->setEstado(isset($_POST['estadoDetalle']) ? 1 : 0) or
                    !$pedido->setProducto($_POST['productoDetalle']) or
                    !$pedido->setCliente($_POST['clienteDetalle']) or
                    !$pedido->setFecha($_POST['fechaDetalle']) or
                    !$pedido->setDireccion($_POST['direccionDetalle']) or
                    !$pedido->setPrecio($_POST['precioDetalle']) or
                    !$pedido->setCantidad($_POST['CantidadDetalle'])
                ) {
                    $result['error'] = $pedido->getDataError();
                } elseif ($producto->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Pedido creado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al crear el pedido';
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $pedido->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen pedidos registrados';
                }
                break;
            case 'readOne':
                if (!$pedido->setId($_POST['idPedido'])) {
                    $result['error'] = $pedido->getDataError();
                } elseif ($result['dataset'] = $pedido->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Producto inexistente';
                }
                break;
                case 'porcentajeProductosCategoria':
                    if ($result['dataset'] = $producto->porcentajeProductosCategoria()) {
                        $result['status'] = 1;
                    } else {
                        $result['error'] = 'No hay datos disponibles';
                    }
                    break;
            case 'readOnePedido':
                if (!$pedido->setId($_POST['idPedido'])) {
                    $result['error'] = $pedido->getDataError();
                } elseif ($result['dataset'] = $pedido->readOnePedido()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Pedido inexistente';
                }
                break;
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$pedido->setPedido($_POST['pedidoDetalle']) or
                    !$pedido->setEstado(isset($_POST['estadoDetalle']) ? 1 : 0) or
                    !$pedido->setProducto($_POST['productoDetalle']) or
                    !$pedido->setCliente($_POST['clienteDetalle']) or
                    !$pedido->setFecha($_POST['fechaDetalle']) or
                    !$pedido->setDireccion($_POST['direccionDetalle']) or
                    !$pedido->setPrecio($_POST['precioDetalle']) or
                    !$pedido->setCantidad($_POST['CantidadDetalle'])
                ) {
                    $result['error'] = $pedido->getDataError();
                } elseif ($pedido->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Producto modificado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar el producto';
                }
                break;
                // Caso para poder cambiar el estado del comentario
            case 'changeState':
                $_POST = Validator::validateForm($_POST);
                if (

                    !$pedido->setId($_POST['idPedido']) or
                    !$pedido->setEstado($_POST['estadoPedido'])
                ) {
                    $result['error'] = $pedido->getDataError();
                } elseif ($pedido->changeState()) {
                    $result['status'] = 1;
                    $result['message'] = 'Estado pedido modificado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar el estado';
                }
                break;
            case 'deleteRow':
                if (
                    !$pedido->setId($_POST['idPedido'])
                ) {
                    $result['error'] = $pedido->getDataError();
                } elseif ($pedido->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'pedido eliminado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar el pedido';
                }
                break;
            default:
                $result['error'] = 'Acción no disponible dentro de la sesión';
        }
        // Se obtiene la excepción del servidor de base de datos por si ocurrió un problema.
        $result['exception'] = Database::getException();
        // Se indica el tipo de contenido a mostrar y su respectivo conjunto de caracteres.
        header('Content-type: application/json; charset=utf-8');
        // Se imprime el resultado en formato JSON y se retorna al controlador.
        print(json_encode($result));
    } else {
        print(json_encode('Acceso denegado'));
    }
} else {
    print(json_encode('Recurso no disponible'));
}
