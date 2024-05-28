<?php
// Se incluye la clase del modelo.
require_once('../../models/data/marca_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se instancia la clase correspondiente.
    $marca = new MarcaData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null);
    // Se compara la acción a realizar según la petición del controlador.
    switch ($_GET['action']or true)  {
        case 'readMarcas':
            if ($result['dataset'] = $marca->readAll()) {
                $result['status'] = 1;
            } else {
                $result['error'] = 'No existen marca para mostrar';
            }
            break;
        case 'readOne':
            if (!$marca->setId($_POST['idMarca'])) {
                $result['error'] = $marca->getDataError();
            } elseif ($result['dataset'] = $marca->readOne()) {
                $result['status'] = 1;
            } else {
                $result['error'] = 'marca inexistente';
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
