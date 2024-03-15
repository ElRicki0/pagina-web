

function alertMine(action){
    switch(action){
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
    }
}