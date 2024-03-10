/*
---------------------------------------------------
/// función para tomar imagenes del explorador///
---------------------------------------------------
*/

function abrirExploradorModal() {
    // Obtener el elemento de entrada de archivo específico del modal
    var modalInputFile = document.getElementById('modalInputFile');

    // Simular un clic en el elemento de entrada de archivo para abrir el explorador de archivos
    modalInputFile.click();

    // Manejar el evento de cambio cuando se selecciona un archivo en el explorador de archivos
    modalInputFile.addEventListener('change', function () {
      // Obtener la lista de archivos seleccionados
      var files = modalInputFile.files;

      // Verificar si se seleccionó al menos un archivo
      if (files.length > 0) {
        // Obtener la URL de la imagen seleccionada
        var imageUrl = URL.createObjectURL(files[0]);

        // Cambiar la fuente de la imagen en el modal con la URL de la imagen seleccionada
        document.querySelector('#modalProfileImage').src = imageUrl;
      }
    });
  }