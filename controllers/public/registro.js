// Constante para establecer el formulario de registrar cliente.
const SIGNUP_FORM = document.getElementById('signupForm');

const IMAGEN_I = document.getElementById('imagenCliente');
const IMAGEN_R = document.getElementById('imagenR');


IMAGEN_I.addEventListener ('change', function (event){
    // Verifica si hay una imagen seleccionada
    if (event.target.files && event.target.files[0]){
        // con el objeto Filereader lee el archivo seleccionado
        const reader = new FileReader();
        // Luego de haber leido la imagen selecionada se nos devuelve un objeto de tipo blob
        // Con el metodo createObjectUrl de fileReader crea una url temporal para la imagen
        reader.onload = function(event){
            // finalmente la url creada se le asigna el atributo de la etiqueta img
            IMAGEN_R.src = event.target.result;
        };
        reader.readAsDataURL(event.target.files[0]);
    }
})

// Llamada a la función para establecer la mascara del campo teléfono.
vanillaTextMask.maskInput({
    inputElement: document.getElementById('telefonoCliente'),
    mask: [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
});


// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
    // LLamada a la función para asignar el token del reCAPTCHA al formulario.
    reCAPTCHA();
});

// Método del evento para cuando se envía el formulario de registrar cliente.
SIGNUP_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SIGNUP_FORM);
    // Petición para registrar un cliente.
    const DATA = await fetchData(USER_API, 'signUp', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        sweetAlert(1, DATA.message, true, 'inicio_sesion.html');
    } else if (DATA.recaptcha) {
        sweetAlert(2, DATA.error, false, 'index.html');
    } else {
        sweetAlert(2, DATA.error, false);
        // Se genera un nuevo token cuando ocurre un problema.
        reCAPTCHA();
    }
});

/*
*   Función para obtener un token del reCAPTCHA y asignarlo al formulario.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
function reCAPTCHA() {
    // Método para generar el token del reCAPTCHA.
    grecaptcha.ready(() => {
        // Constante para establecer la llave pública del reCAPTCHA.
        const PUBLIC_KEY = '6LdBzLQUAAAAAJvH-aCUUJgliLOjLcmrHN06RFXT';
        // Se obtiene un token para la página web mediante la llave pública.
        grecaptcha.execute(PUBLIC_KEY, { action: 'homepage' }).then((token) => {
            // Se asigna el valor del token al campo oculto del formulario
            document.getElementById('gRecaptchaResponse').value = token;
        });
    });
}