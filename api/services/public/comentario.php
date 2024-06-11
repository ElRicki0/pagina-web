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
            case 'createValoracion':
                $_POST = Validator::validateForm($_POST);
                // Verificar si el cliente ha comprado el producto antes de permitir la valoración
                if (!$valoraciones->setId($_SESSION['idCliente']) || !$valoraciones->setId($_POST['idProducto'])) {
                    $result['error'] = 'Datos inválidos';
                } elseif ($valoraciones->readCountValoracion() == 0) {
                    $result['error'] = 'No puedes valorar este producto porque no lo has comprado';
                } elseif (
                    !$valoraciones->setCalificaionValoracion($_POST['calificacionValoracion']) ||
                    !$valoraciones->setComentarioValoracion($_POST['comentarioValoracion'])
                ) {
                    $result['error'] = $valoraciones->getDataError();
                } elseif ($valoraciones->createValoracion()) {
                    $result['status'] = 1;
                    $result['message'] = 'Valoración agregada';
                } else {
                    $result['error'] = 'Ocurrió un problema al guardar la valoración';
                }
                break;
                default:
                $result['error'] = 'Acción no disponible';
                break;
        }
    }
    else {
        switch ($_GET['action']) {
            case 'readComentarios':
                if (!$valoraciones->setIdProducto($_POST['idProducto'])) {
                    $result['error'] = $valoraciones->getDataError();
                } elseif ($result['dataset'] = $valoraciones->readComentarios()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Este producto no ha sido comentado';
                }
                break;
                default:
                $result['error'] = 'Acción no disponible';
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