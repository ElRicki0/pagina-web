<?php
// Se incluye la clase del modelo.
require_once('../../models/data/cliente_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $cliente = new ClienteData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'session' => 0, 'recaptcha' => 0, 'message' => null, 'error' => null, 'exception' => null, 'username' => null);
    // Se verifica si existe una sesión iniciada como cliente para realizar las acciones correspondientes.
    if (isset($_SESSION['idAdministrador'])) {
        $result['session'] = 1;
        // Se compara la acción a realizar cuando un cliente ha iniciado sesión.
        switch ($_GET['action']) {
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                // Accion para agregar los datos de los clientes.
                if (
                    !$cliente->setNombre($_POST['nombreCliente']) or
                    !$cliente->setApellido($_POST['apellidoCliente']) or
                    !$cliente->setCorreo($_POST['correoCliente']) or
                    !$cliente->setDireccion($_POST['direccionCliente']) or
                    !$cliente->setTelefono($_POST['telefonoCliente']) or
                    !$cliente->setAlias($_POST['aliasCliente']) or
                    !$cliente->setEstado(isset($_POST['estadoCliente']) ? 1 : 0) or
                    !$cliente->setImagen($_FILES['imagenCliente']) or
                    !$cliente->setClave($_POST['claveCliente'])
                ) {
                    $result['error'] = $cliente->getDataError();
                } elseif ($_POST['claveCliente'] != $_POST['confirmarClave']) {
                    $result['error'] = 'Contraseñas diferentes';
                } elseif ($cliente->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Registro creado correctamente';
                    // Se asigna el estado del archivo después de insertar.
                    $result['fileStatus'] = Validator::saveFile($_FILES['imagenCliente'], $cliente::RUTA_IMAGEN);
                } else {
                    $result['error'] = 'Ocurrió un problema al crear el registro';
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $cliente->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen clientes registrados';
                }
                break;
            case 'readOne':
                if (!$cliente->setId($_POST['idCliente'])) {
                    $result['error'] = 'Registro incorrecto';
                } elseif ($result['dataset'] = $cliente->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Registro inexistente';
                }
                break;
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                // Accion para mensaje de inexistencia.
                if (
                    !$cliente->setId($_POST['idCliente']) or
                    !$cliente->setFilename() or
                    !$cliente->setEstado(isset($_POST['estadoCliente']) ? 1 : 0) or
                    !$cliente->setImagen($_FILES['imagenCliente'], $cliente->getFilename())
                ) {
                    $result['error'] = $cliente->getDataError();
                } elseif ($cliente->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Registro modificado correctamente';
                    // Se asigna el estado del archivo después de actualizar.
                    $result['fileStatus'] = Validator::changeFile($_FILES['imagenCliente'], $cliente::RUTA_IMAGEN, $cliente->getFilename());
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar el registro';
                }
                break;
                // Estado
            case 'changeState':
                if (
                    !$cliente->setId($_POST['idCliente'])
                ) {
                    $result['error'] = $cliente->getDataError();
                } elseif ($cliente->changeState()) {
                    $result['status'] = 1;
                    $result['message'] = 'Estado del cliente cambiado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al alterar el estado del cliente';
                }
                break;
            case 'deleteRow':
                if (!$cliente->setId($_POST['idCliente'])) {
                    $result['error'] = $cliente->getDataError();
                } elseif ($cliente->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Registro eliminado correctamente';
                    // Se asigna el estado del archivo después de eliminar.
                    $result['fileStatus'] = Validator::deleteFile($cliente::RUTA_IMAGEN, $cliente->getFilename());
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar el cliente';
                }
                break;
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $cliente->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;
            case 'getUser':
                if (isset($_SESSION['correoCliente'])) {
                    $result['status'] = 1;
                    $result['username'] = $_SESSION['correoCliente'];
                } else {
                    $result['error'] = 'Correo de usuario indefinido';
                }
                break;
            case 'logOut':
                if (session_destroy()) {
                    $result['status'] = 1;
                    $result['message'] = 'Sesión eliminada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al cerrar la sesión';
                }
                break;
            case 'readProfile':
                if ($result['dataset'] = $cliente->readProfile()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Ocurrió un problema al leer el perfil';
                }
                break;
            case 'editProfile':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$cliente->setNombre($_POST['nombreCliente']) or
                    !$cliente->setApellido($_POST['apellidocliente']) or
                    !$cliente->setCorreo($_POST['correocliente']) or
                    !$cliente->setAlias($_POST['aliascliente'])
                ) {
                    $result['error'] = $cliente->getDataError();
                } elseif ($cliente->editProfile()) {
                    $result['status'] = 1;
                    $result['message'] = 'Perfil modificado correctamente';
                    $_SESSION['aliascliente$cliente'] = $_POST['aliascliente$cliente'];
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar el perfil';
                }
                break;
            case 'changePassword':
                $_POST = Validator::validateForm($_POST);
                if (!$cliente->checkPassword($_POST['claveActual'])) {
                    $result['error'] = 'Contraseña actual incorrecta';
                } elseif ($_POST['claveNueva'] != $_POST['confirmarClave']) {
                    $result['error'] = 'Confirmación de contraseña diferente';
                } elseif (!$cliente->setClave($_POST['claveNueva'])) {
                    $result['error'] = $cliente->getDataError();
                } elseif ($cliente->changePassword()) {
                    $result['status'] = 1;
                    $result['message'] = 'Contraseña cambiada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al cambiar la contraseña';
                }
                break;
            case 'ClientesMasCompras':
                if ($result['dataset'] = $cliente->ClientesMasCompras()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'No hay datos disponibles';
                }
                break;
            case 'GraficaUsuariosEstados':
                if ($result['dataset'] = $cliente->GraficaUsuariosEstados()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'No hay datos disponibles';
                }
                break;
            default:
                $result['error'] = 'Acción no disponible dentro de la sesión';
        }
    } else {
        // Se compara la acción a realizar cuando el cliente no ha iniciado sesión.
        switch ($_GET['action']) {
            case 'readUsers':
                if ($cliente->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Debe autenticarse para ingresar';
                } else {
                    $result['error'] = 'Debe crear un administrador para comenzar';
                }
                break;
            case 'signUp':
                $_POST = Validator::validateForm($_POST);
                // Se establece la clave secreta para el reCAPTCHA de acuerdo con la cuenta de Google.
                $secretKey = '6LdBzLQUAAAAAL6oP4xpgMao-SmEkmRCpoLBLri-';
                // Se establece la dirección IP del servidor.
                $ip = $_SERVER['REMOTE_ADDR'];
                // Se establecen los datos del raCAPTCHA.
                $data = array('secret' => $secretKey, 'response' => $_POST['gRecaptchaResponse'], 'remoteip' => $ip);
                // Se establecen las opciones del reCAPTCHA.
                $options = array(
                    'http' => array('header' => 'Content-type: application/x-www-form-urlencoded\r\n', 'method' => 'POST', 'content' => http_build_query($data)),
                    'ssl' => array('verify_peer' => false, 'verify_peer_name' => false)
                );

                $url = 'https://www.google.com/recaptcha/api/siteverify';
                $context = stream_context_create($options);
                $response = file_get_contents($url, false, $context);
                $captcha = json_decode($response, true);

                if (!$captcha['success']) {
                    $result['recaptcha'] = 1;
                    $result['error'] = 'No eres humano';
                } elseif (!isset($_POST['condicion'])) {
                    $result['error'] = 'Debe marcar la aceptación de términos y condiciones';
                } elseif (
                    !$cliente->setNombre($_POST['nombreCliente']) or
                    !$cliente->setApellido($_POST['apellidoCliente']) or
                    !$cliente->setCorreo($_POST['correoCliente']) or
                    !$cliente->setDireccion($_POST['direccionCliente']) or
                    !$cliente->setTelefono($_POST['telefonoCliente']) or
                    !$cliente->setAlias($_POST['aliasCliente']) or
                    !$cliente->setEstado(isset($_POST['estadoCliente']) ? 1 : 0) or
                    !$cliente->setImagen($_FILES['imagenCliente']) or
                    !$cliente->setClave($_POST['claveCliente'])
                ) {
                    $result['error'] = $cliente->getDataError();
                } elseif ($_POST['claveCliente'] != $_POST['confirmarClave']) {
                    $result['error'] = 'Contraseñas diferentes';
                } elseif ($cliente->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Cuenta registrada correctamente';
                    // Se asigna el estado del archivo después de insertar.
                    $result['fileStatus'] = Validator::saveFile($_FILES['imagenCliente'], $cliente::RUTA_IMAGEN);
                } else {
                    $result['error'] = 'Ocurrió un problema al registrar la cuenta';
                }
                break;
            case 'logIn':
                $_POST = Validator::validateForm($_POST);
                if (!$cliente->checkUser($_POST['correo'], $_POST['clave'])) {
                    $result['error'] = 'Datos incorrectos';
                } elseif ($cliente->checkStatus()) {
                    $result['status'] = 1;
                    $result['message'] = 'Autenticación correcta';
                } else {
                    $result['error'] = 'La cuenta ha sido desactivada';
                }
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
