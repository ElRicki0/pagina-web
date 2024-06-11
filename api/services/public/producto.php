<?php
// Se incluye la clase del modelo.
require_once('../../models/data/productos_data.php');

require_once('../../models/data/comentarios_data.php');


// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se instancia la clase correspondiente.
    $producto = new ProductoData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null);
    // Se compara la acción a realizar según la petición del controlador.
    switch ($_GET['action']) {
        case 'readProductosCategoria':
            if (!$producto->setCategoria($_POST['idCategoria'])) {
                $result['error'] = $producto->getDataError();
            } elseif ($result['dataset'] = $producto->readProductosCategoria()) {
                $result['status'] = 1;
            } else {
                $result['error'] = 'No existen productos de esta categoría';
            }
            break;
        case 'readProductosMarca':
            if (!$producto->setMarca($_POST['idMarca'])) {
                $result['error'] = $producto->getDataError();
            } elseif ($result['dataset'] = $producto->readProductosMarca()) {
                $result['status'] = 1;
            } else {
                $result['error'] = 'No existen productos de esta marca';
            }
            break;
        case 'read8Products':
            if ($result['dataset'] = $producto->read8Products()) {
                $result['status'] = 1;
                $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
            } else {
                $result['error'] = 'No existen productos registrados';
            }
            break;
        case 'read2Products':
            if ($result['dataset'] = $producto->read2Products()) {
                $result['status'] = 1;
                $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
            } else {
                $result['error'] = 'No existen productos registrados';
            }
            break;
        case 'readOne':
            if (!$producto->setId($_POST['idProducto'])) {
                $result['error'] = $producto->getDataError();
            } elseif ($result['dataset'] = $producto->readOne()) {
                $result['status'] = 1;
            } else {
                $result['error'] = 'Producto inexistente';
            }
            break;
        case 'readOneMarca':
            if (!$producto->setId($_POST['idProducto'])) {
                $result['error'] = $producto->getDataError();
            } elseif ($result['dataset'] = $producto->readOneMarca()) {
                $result['status'] = 1;
            } else {
                $result['error'] = 'Producto inexistente';
            }
            break;
        case 'readAll':
            if ($result['dataset'] = $producto->readAll()) {
                $result['status'] = 1;
                $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
            } else {
                $result['error'] = 'No existen productos registrados';
            }
            break;
        case 'readAllPublic':
            if ($result['dataset'] = $producto->readAllPublic()) {
                $result['status'] = 1;
                $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
            } else {
                $result['error'] = 'No existen productos registrados';
            }
            break;
        case 'searchRows':
            if (!Validator::validateSearch($_POST['search'])) {
                $result['error'] = Validator::getSearchError();
            } elseif ($result['dataset'] = $producto->searchRows()) {
                $result['status'] = 1;
                $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
            } else {
                $result['error'] = 'No hay coincidencias';
            }
            break;
        case 'readProductosInicio':
            if ($result['dataset'] = $producto->readProductosInicio()) {
                $result['status'] = 1;
                $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
            } else {
                $result['error'] = 'No existen productos registrados';
            }
            break;
        case 'readComentarios':
            if (!$producto->setId($_POST['idProducto2'])) {
                $result['error'] = $producto->getDataError();
            } elseif ($result['dataset'] = $producto->readComentarios()) {
                $result['status'] = 1;
            } else {
                $result['error'] = 'Este producto no ha sido comentado';
            }
            break;
        case 'createComentario':
            $_POST = Validator::validateForm($_POST);
            // Verificar si el cliente ha comprado el producto antes de permitir la valoración
            if (
                !$comentario->setComentario($_POST['comentario']) or
                !$comentario->setEstado(isset($_POST['estadoComentario']) ? 1 : 0) or
                !$comentario->setProducto($_POST['idProducto']) or
                !$comentario->setCliente($_SESSION['idCliente']) or
                !$comentario->setEstrella($_POST['estrellaComentario'])
            ) {
                $result['error'] = $comentario->getDataError();
            } elseif ($comentario->createRow()) {
                $result['status'] = 1;
                $result['message'] = 'Comentario agregado';
            } else {
                $result['error'] = 'Ocurrió un problema al guardar el comentario';
            }
            break;
        default:
            $result['error'] = 'Acción no disponible';
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
