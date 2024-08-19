// Constantes para establecer los elementos del formulario de editar perfil.
const PROFILE_FORM = document.getElementById('profileForm'),
    NOMBRE_ADMINISTRADOR = document.getElementById('nombreAdministrador'),
    APELLIDO_ADMINISTRADOR = document.getElementById('apellidoAdministrador'),
    CORREO_ADMINISTRADOR = document.getElementById('correoAdministrador'),
    TELEFONO_ADMINISTRADOR = document.getElementById('telefonoAdministrador'),
    TELEFONO_EMER_ADMINISTRADOR = document.getElementById('telefonoEmerAdministrador'),
    DUI_ADMINISTRADOR = document.getElementById('duiAdministrador'),
    ALIAS_ADMINISTRADOR = document.getElementById('aliasAdministrador');
// Constante para establecer la modal de cambiar contraseña.
const PASSWORD_MODAL = new bootstrap.Modal('#passwordModal');
// Constante para establecer el formulario de cambiar contraseña.
const PASSWORD_FORM = document.getElementById('passwordForm');


// Llamada a la función para establecer la mascara del campo teléfono.
vanillaTextMask.maskInput({
    inputElement: document.getElementById('telefonoAdministrador'),
    mask: [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
});

// Llamada a la función para establecer la mascara del campo teléfono emergencia.
vanillaTextMask.maskInput({
    inputElement: document.getElementById('telefonoEmerAdministrador'),
    mask: [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
});

// Llamada a la función para establecer la mascara del campo DUI.
vanillaTextMask.maskInput({
    inputElement: document.getElementById('duiAdministrador'),
    mask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/]
});



// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
    // Se establece el título del contenido principal.
    MAIN_TITLE.textContent = 'Editar perfil';
    // Petición para obtener los datos del usuario que ha iniciado sesión.
    const DATA = await fetchData(USER_API, 'readProfile');
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se inicializan los campos del formulario con los datos del usuario que ha iniciado sesión.
        const ROW = DATA.dataset;
        NOMBRE_ADMINISTRADOR.value = ROW.nombre_admin;
        APELLIDO_ADMINISTRADOR.value = ROW.apellido_admin;
        CORREO_ADMINISTRADOR.value = ROW.correo_admin;
        TELEFONO_ADMINISTRADOR.value = ROW.telefono_admin;
        TELEFONO_EMER_ADMINISTRADOR.value = ROW.numero_emerjencia_admin;
        DUI_ADMINISTRADOR.value = ROW.DUI_admin;
        ALIAS_ADMINISTRADOR.value = ROW.alias_admin;
    } else {
        sweetAlert(2, DATA.error, null);
    }
});

// Método del evento para cuando se envía el formulario de editar perfil.
PROFILE_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(PROFILE_FORM);
    // Petición para actualizar los datos personales del usuario.
    const DATA = await fetchData(USER_API, 'editProfile', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        sweetAlert(1, DATA.message, true);
    } else {
        sweetAlert(2, DATA.error, false);
    }
});

// Método del evento para cuando se envía el formulario de cambiar contraseña.
PASSWORD_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(PASSWORD_FORM);
    // Petición para actualizar la constraseña.
    const DATA = await fetchData(USER_API, 'changePassword', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se cierra la caja de diálogo.
        PASSWORD_MODAL.hide();
        // Se muestra un mensaje de éxito.
        sweetAlert(1, DATA.message, true);
    } else {
        sweetAlert(2, DATA.error, false);
    }
});

/*
*   Función para preparar el formulario al momento de cambiar la contraseña.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const openPassword = () => {
    // Se abre la caja de diálogo que contiene el formulario.
    PASSWORD_MODAL.show();
    // Se restauran los elementos del formulario.
    PASSWORD_FORM.reset();
}