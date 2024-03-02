// sección de alertas generales

$('#BtnCorrecto').click(function () {
    Swal.fire({
        title: "Sesión iniciada",
        text: "Iniciaste sesión correctamente",
        icon: "success"
      });
});


// funcion para boton eliminar 
$('#BtnEliminar').click(function () {
  Swal.fire({
    title: "¿Estas seguro de eliminarlo?",
    text: "No podras recuperar los datos",
    imageUrl: "../../resources/img/alertasImagenes/kirbyTriste.png",
    imageWidth: 200,
    imageHeight: 200,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Confirmar"
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Elemento borrado!",
        text: "El archivo se ha borrado correctamente",
        imageUrl: "../../resources/img/alertasImagenes/kirby.png",
        imageWidth: 200,
        imageHeight: 200,
      });
    }
  });
});
$('#BtnEliminar2').click(function () {
  Swal.fire({
    title: "¿Estas seguro de eliminarlo?",
    text: "No podras recuperar los datos",
    imageUrl: "../../resources/img/alertasImagenes/kirbyTriste.png",
    imageWidth: 200,
    imageHeight: 200,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Confirmar"
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Elemento borrado!",
        text: "El archivo se ha borrado correctamente",
        imageUrl: "../../resources/img/alertasImagenes/kirby.png",
        imageWidth: 200,
        imageHeight: 200,
      });
    }
  });
});

$('#BtnEliminar3').click(function () {
  Swal.fire({
    title: "¿Estas seguro de eliminarlo?",
    text: "No podras recuperar los datos",
    imageUrl: "../../resources/img/alertasImagenes/kirbyTriste.png",
    imageWidth: 200,
    imageHeight: 200,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Confirmar"
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Elemento borrado!",
        text: "El archivo se ha borrado correctamente",
        imageUrl: "../../resources/img/alertasImagenes/kirby.png",
        imageWidth: 200,
        imageHeight: 200,
      });
    }
  });
});

$('#BtnEliminar4').click(function () {
  Swal.fire({
    title: "¿Estas seguro de eliminarlo?",
    text: "No podras recuperar los datos",
    imageUrl: "../../resources/img/alertasImagenes/kirbyTriste.png",
    imageWidth: 200,
    imageHeight: 200,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Confirmar"
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Elemento borrado!",
        text: "El archivo se ha borrado correctamente",
        imageUrl: "../../resources/img/alertasImagenes/kirby.png",
        imageWidth: 200,
        imageHeight: 200,
      });
    }
  });
});

$('#BtnEliminar5').click(function () {
  SSwal.fire({
    title: "¿Estas seguro de eliminarlo?",
    text: "No podras recuperar los datos",
    imageUrl: "../../resources/img/alertasImagenes/kirbyTriste.png",
    imageWidth: 200,
    imageHeight: 200,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Confirmar"
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Elemento borrado!",
        text: "El archivo se ha borrado correctamente",
        imageUrl: "../../resources/img/alertasImagenes/kirby.png",
        imageWidth: 200,
        imageHeight: 200,
      });
    }
  });
});

$('#BtnEliminar6').click(function () {
  Swal.fire({
    title: "¿Estas seguro de eliminarlo?",
    text: "No podras recuperar los datos",
    imageUrl: "../../resources/img/alertasImagenes/kirbyTriste.png",
    imageWidth: 200,
    imageHeight: 200,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Confirmar"
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Elemento borrado!",
        text: "El archivo se ha borrado correctamente",
        imageUrl: "../../resources/img/alertasImagenes/kirby.png",
        imageWidth: 200,
        imageHeight: 200,
      });
    }
  });
});

$('#BtnEliminar7').click(function () {
  Swal.fire({
    title: "¿Estas seguro de eliminarlo?",
    text: "No podras recuperar los datos",
    imageUrl: "../../resources/img/alertasImagenes/kirbyTriste.png",
    imageWidth: 200,
    imageHeight: 200,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Confirmar"
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Elemento borrado!",
        text: "El archivo se ha borrado correctamente",
        imageUrl: "../../resources/img/alertasImagenes/kirby.png",
        imageWidth: 200,
        imageHeight: 200,
      });
    }
  });
});

$('#BtnEliminar8').click(function () {
  Swal.fire({
    title: "¿Estas seguro de eliminarlo?",
    text: "No podras recuperar los datos",
    imageUrl: "../../resources/img/alertasImagenes/kirbyTriste.png",
    imageWidth: 200,
    imageHeight: 200,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Confirmar"
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Elemento borrado!",
        text: "El archivo se ha borrado correctamente",
        imageUrl: "../../resources/img/alertasImagenes/kirby.png",
        imageWidth: 200,
        imageHeight: 200,
      });
    }
  });
});

$('#BtnActualizar').click(function () {
  Swal.fire({
    text: "Se han actualizado los datos.",
    imageUrl: "../../resources/img/alertasImagenes/kirby.png",
    imageWidth: 200,
    imageHeight: 200,
    imageAlt: "Custom image"
  });
});



