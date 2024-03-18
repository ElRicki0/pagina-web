

function alertMine(action) {
  switch (action) {
    case 'agregarAlCarrito':
      const Toast = Swal.mixin({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        imageUrl: "../../resources/img/alertasImagenes/kirby.png",
        imageWidth: 100,
        imageHeight: 100,
        title: "Se ha agregado al carrito"
      });
      break;
    case 'CrearCuenta':
      Swal.fire({
        title: "Se ha creado su cuenta",
        imageUrl: "../../resources/img/alertasImagenes/kirby.png",
        imageWidth: 200,
        imageHeight: 200,
      }).then((result) => { // Funcion para redirigir a la ventana de inicio de sesión
        if (result.isConfirmed) {
          window.location.href = "../public/inicio_sesion.html";
        }
      });
      break;
    case 'InicioSesion':
      // Obtener los valores de los campos de entrada
      var username = document.getElementById('usuario').value; // Obtener el nombre de usuario del campo de entrada
      var password = document.getElementById('contrasenia').value; // Obtener la contraseña del campo de entrada

      // Verificar el nombre de usuario y la contraseña (esto es un ejemplo básico, deberías validar con tu lógica de autenticación real)
      if (username === 'Kirby' && password === '1234') {
        Swal.fire({
          title: "Has iniciado sesión correctamente",
          imageUrl: "../../resources/img/alertasImagenes/kirby.png",
          imageWidth: 200,
          imageHeight: 200,
        }).then((result) => { // Funcion para redirigir a la ventana de inicio de sesión
          if (result.isConfirmed) {
            window.location.href = "../public/index.html"; // Redirigir a la otra página
          }
        });
      } else {
        // Si el nombre de usuario o la contraseña son incorrectos, puedes mostrar una alerta de error
        Swal.fire({
          icon: 'error',
          title: 'Error de inicio de sesión',
          text: 'Nombre de usuario o contraseña incorrectos',
        });
      }
      break;
    case 'modificarUsu':
      Swal.fire({
        text: 'El usuario se ha editado correctamente',
        imageUrl: "../../resources/img/alertasImagenes/kirby.png",
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: "Custom image"
      })
      break;


  }
}