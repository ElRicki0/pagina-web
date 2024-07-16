<?php
// Se incluye la clase del modelo.
require_once('../../models/data/comentarios_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    session_start();

    // Se instancia la clase correspondiente.
    $comentario = new ComentarioData;

    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);

    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idCliente'])) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
                //Metódo que permite editar la información del admin que se ha logueado.    
            case 'createComentario':
                $_POST = Validator::validateForm($_POST);
                // Verificar si el cliente ha comprado el producto antes de permitir la valoración
                if (
                    !$comentario->setComentario($_POST['comentario']) or
                    !$comentario->setProducto($_POST['id_producto']) or
                    !$comentario->setEstrella($_POST['estrella'])
                ) {
                    $result['error'] = $comentario->getDataError();
                } elseif ($comentario->createComment()) {
                    $result['status'] = 1;
                    $result['cliente'] = $_SESSION['idCliente'];
                    $result['producto'] = $_SESSION['producto'];
                    $result['detalle'] = $_SESSION['idDetalle'];
                    $result['message'] = 'Comentario agregado, espere a que un administrador lo acepte';
                } else {
                    $result['error'] = 'Primero, debe de comprar el producto';
                }
                break;
            default:
                $result['error'] = 'Error fatal';
                break;
        }
    } else {
        switch ($_GET['action']) {
            default:
                $result['error'] = 'Acceso denegado';
                break;
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
