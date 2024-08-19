<?php
// Se incluye la clase del modelo.
require_once('../../models/data/categoria_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $categorias = new CategoriaData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idAdministrador'])) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $categorias->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$categorias->setNombre($_POST['nombreCategorias']) or
                    !$categorias->setDescripcion($_POST['descripcionCategorias']) or
                    !$categorias->setImagen($_FILES['imagenCategoria'])
                ) {
                    $result['error'] = $categorias->getDataError();
                } elseif ($categorias->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Categoria creada correctamente';
                    // Se asigna el estado del archivo después de insertar.
                    $result['fileStatus'] = Validator::saveFile($_FILES['imagenCategoria'], $categorias::RUTA_IMAGEN);
                } else {
                    $result['error'] = 'Ocurrió un problema al crear la marca';
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $categorias->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen Marca registradas';
                }
                break;
            case 'readOne':
                if (!$categorias->setId($_POST['idCategorias'])) {
                    $result['error'] = $categorias->getDataError();
                } elseif ($result['dataset'] = $categorias->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'categoria inexistente';
                }
                break;
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$categorias->setId($_POST['idCategoria']) or
                    !$categorias->setFilename() or
                    !$categorias->setNombre($_POST['nombreCategoria']) or
                    !$categorias->setDescripcion($_POST['descripcionCategoria']) or
                    !$categorias->setImagen($_FILES['imagenCategoria'], $categorias->getFilename())
                ) {
                    $result['error'] = $categorias->getDataError();
                } elseif ($categorias->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Marca modificada correctamente';
                    // Se asigna el estado del archivo después de actualizar.
                    $result['fileStatus'] = Validator::changeFile($_FILES['imagenCtegoria'], $categorias::RUTA_IMAGEN, $categorias->getFilename());
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar la Categoria';
                }
                break;
            case 'deleteRow':
                if (
                    !$categorias->setId($_POST['idMarca'])
                    // or  !$marca->setFilename()
                ) {
                    $result['error'] = $categorias->getDataError();
                } elseif ($categorias->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Marca eliminada correctamente';
                    // Se asigna el estado del archivo después de eliminar.
                    // $result['fileStatus'] = Validator::deleteFile($marca::RUTA_IMAGEN, $marca->getFilename());
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar la marca';
                }
                break;
            case 'CategoriasMasVendidas':
                if ($result['dataset'] = $categorias->CategoriasMasVendidas()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'No hay datos disponibles';
                }
                break;
                // Acción para reporte : lee los productos segun la categorias
            case 'readproductosCategorias':
                // Acción que muestre todos los datos 
                if (!$categorias->setId($_POST['idCategoria'])) {
                    $result['error'] = $categorias->getDataError();
                } elseif ($result['dataset'] = $categorias->productosCategorias()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Categoria inexistente';
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
