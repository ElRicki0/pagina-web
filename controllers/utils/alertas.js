// sección de alertas generales
/*
$('#BtnCorrecto').click(function () {
  Swal.fire({
    title: "Sesión iniciada",
    text: "Iniciaste sesión correctamente",
    icon: "success"
  });
});
*/

// función para botón eliminar 
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

/*producto_editar*/
$('#btn_info1').click(function () {
  Swal.fire({
    title: "Editar producto",
    titleText: 'Sombras de ojos',
    text: "No podras recuperar los datos",
    padding: '1rem',
    showConfirmButton: 'true',
    confirmButtonText: 'Confirmar',
    width: '70%',
    html: `
    <div class="container text-center">
            <div class="row">
                <div class="row">

                </div>
                <div class=" col-md-4">
                    <img class="rounded  mx-auto d-block" src="../../resources/img/productos/pd1.jpg" alt="..."
                        width="300px">
                    <br>
                    <br>

                </div>
                <div class="col">
                    <div class="row">
                        <div class="col">
                            <div class="letraPer col-md-4 fs-3">Nombre producto</div>
                            <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">sombra de ojos
                            </div>
                            <div class="letraPer col-md-4 fs-3">Precio producto</div>
                            <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">$7.50</div>
                            <div class="letraPer col-md-4 fs-3">Marca producto</div>
                            <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">Kellogs</div>
                            <div class="letraPer col-md-4 fs-3">Descripción producto</div>
                            <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start" style="padding: 1rem;">Descubre la
                                paleta perfecta: nuestro programa de sombras de ojos te lleva desde lo sutil hasta lo
                                espectacular en cada aplicación</div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    `
  })
})

$('#btn_info2').click(function () {
  Swal.fire({
    title: "Editar producto",
    titleText: 'Sombras de ojos',
    text: "No podras recuperar los datos",
    padding: '1rem',
    showConfirmButton: 'true',
    confirmButtonText: 'Confirmar',
    width: '70%',
    html: `
    <div class="container text-center">
            <div class="row">
                <div class="row">

                </div>
                <div class=" col-md-4">
                    <img class="rounded  mx-auto d-block" src="../../resources/img/productos/pd2.jpg" alt="..."
                        width="300px">
                    <br>
                    <br>

                </div>
                <div class="col">
                    <div class="row">
                        <div class="col">
                            <div class="letraPer col-md-4 fs-3">Nombre producto</div>
                            <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">paletas de furtivas
                            </div>
                            <div class="letraPer col-md-4 fs-3">Precio producto</div>
                            <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">$3.50</div>
                            <div class="letraPer col-md-4 fs-3">Marca producto</div>
                            <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">Columbia</div>
                            <div class="letraPer col-md-4 fs-3">Descripción producto</div>
                            <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start" style="padding: 1rem;"> 
                            ¡Sumérgete en la dulzura exótica con nuestra paleta de colores inspirada en fresitas chinas!</div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    `
  })
})

$('#btn_info3').click(function () {
  Swal.fire({
    title: "Editar producto",
    titleText: 'Sombras de ojos',
    text: "No podras recuperar los datos",
    padding: '1rem',
    showConfirmButton: 'true',
    confirmButtonText: 'Confirmar',
    width: '70%',
    html: `
    <div class="container text-center">
            <div class="row">
                <div class="row">

                </div>
                <div class=" col-md-4">
                    <img class="rounded  mx-auto d-block" src="../../resources/img/productos/pd3.jpg" alt="..."
                        width="300px">
                    <br>
                    <br>
                </div>
                <div class="col">
                    <div class="row">
                        <div class="col">
                            <div class="letraPer col-md-4 fs-3">Nombre producto</div>
                            <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">Polvo de hadas
                            </div>
                            <div class="letraPer col-md-4 fs-3">Precio producto</div>
                            <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">$11.00</div>
                            <div class="letraPer col-md-4 fs-3">Marca producto</div>
                            <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">Rapture</div>
                            <div class="letraPer col-md-4 fs-3">Descripción producto</div>
                            <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start" style="padding: 1rem;">
                            Obtén una piel luminosa y uniforme con nuestra crema aclaradora de alta calidad.
                                espectacular en cada aplicación</div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    `
  })
})

$('#btn_info4').click(function () {
  Swal.fire({
    title: "Editar producto",
    titleText: 'Sombras de ojos',
    text: "No podras recuperar los datos",
    padding: '1rem',
    showConfirmButton: 'true',
    confirmButtonText: 'Confirmar',
    width: '70%',
    html: `
    <div class="container text-center">
            <div class="row">
                <div class="row">

                </div>
                <div class=" col-md-4">
                    <img class="rounded  mx-auto d-block" src="../../resources/img/productos/pd4.png" alt="..."
                        width="300px">
                    <br>
                    <br>

                </div>
                <div class="col">
                    <div class="row">
                        <div class="col">
                            <div class="letraPer col-md-4 fs-3">Nombre producto</div>
                            <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">Labial mata toros
                            </div>
                            <div class="letraPer col-md-4 fs-3">Precio producto</div>
                            <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">$3.70</div>
                            <div class="letraPer col-md-4 fs-3">Marca producto</div>
                            <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">Cromopolis</div>
                            <div class="letraPer col-md-4 fs-3">Descripción producto</div>
                            <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start" style="padding: 1rem;">
                            Atrévete a destacar con nuestro labial de un rojo intenso como el carmesí.</div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    `
  })
})

$('#btn_info5').click(function () {
  Swal.fire({
    title: "Editar producto",
    titleText: 'Sombras de ojos',
    text: "No podras recuperar los datos",
    padding: '1rem',
    showConfirmButton: 'true',
    confirmButtonText: 'Confirmar',
    width: '70%',
    html: `
    <div class="container text-center">
            <div class="row">
                <div class="row">

                </div>
                <div class=" col-md-4">
                    <img class="rounded  mx-auto d-block" src="../../resources/img/productos/pd5.jpg" alt="..."
                        width="300px">
                    <br>
                    <br>

                </div>
                <div class="col">
                    <div class="row">
                        <div class="col">
                            <div class="letraPer col-md-4 fs-3">Nombre producto</div>
                            <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">Polvo de brujas
                            </div>
                            <div class="letraPer col-md-4 fs-3">Precio producto</div>
                            <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">$9.00</div>
                            <div class="letraPer col-md-4 fs-3">Marca producto</div>
                            <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">Village</div>
                            <div class="letraPer col-md-4 fs-3">Descripción producto</div>
                            <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start" style="padding: 1rem;">
                            Logra un acabado mágico con nuestro polvo de hadas, ¡tu secreto para un maquillaje impecable!</div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    `
  })
})

$('#btn_info6').click(function () {
  Swal.fire({
    title: "Editar producto",
    titleText: 'Sombras de ojos',
    text: "No podras recuperar los datos",
    padding: '1rem',
    showConfirmButton: 'true',
    confirmButtonText: 'Confirmar',
    width: '70%',
    html: `
    <div class="container text-center">
            <div class="row">
                <div class="row">

                </div>
                <div class=" col-md-4">
                    <img class="rounded  mx-auto d-block" src="../../resources/img/productos/pd6.jpg" alt="..."
                        width="300px">
                    <br>
                    <br>

                </div>
                <div class="col">
                    <div class="row">
                        <div class="col">
                            <div class="letraPer col-md-4 fs-3">Nombre producto</div>
                            <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">lápiz de colores 
                            </div>
                            <div class="letraPer col-md-4 fs-3">Precio producto</div>
                            <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">$70</div>
                            <div class="letraPer col-md-4 fs-3">Marca producto</div>
                            <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">Tintelia</div>
                            <div class="letraPer col-md-4 fs-3">Descripción producto</div>
                            <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start" style="padding: 1rem;">
                            Define y realza tus labios con nuestro lápiz labial en tono natural.</div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    `
  })
})

$('#btn_info7').click(function () {
  Swal.fire({
    title: "Editar producto",
    titleText: 'Sombras de ojos',
    text: "No podras recuperar los datos",
    padding: '1rem',
    showConfirmButton: 'true',
    confirmButtonText: 'Confirmar',
    width: '70%',
    html: `
    <div class="container text-center">
            <div class="row">
                <div class="row">

                </div>
                <div class=" col-md-4">
                    <img class="rounded  mx-auto d-block" src="../../resources/img/productos/pd7.jpg" alt="..."
                        width="300px">
                    <br>
                    <br>

                </div>
                <div class="col">
                    <div class="row">
                        <div class="col">
                            <div class="letraPer col-md-4 fs-3">Nombre producto</div>
                            <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">Lápiz tonalidad oscura
                            </div>
                            <div class="letraPer col-md-4 fs-3">Precio producto</div>
                            <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">$750</div>
                            <div class="letraPer col-md-4 fs-3">Marca producto</div>
                            <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">Shout like</div>
                            <div class="letraPer col-md-4 fs-3">Descripción producto</div>
                            <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start" style="padding: 1rem;">
                            Añade un toque de misterio con nuestro lápiz labial en un tono oscuro y seductor.</div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    `
  })
})

$('#btn_info8').click(function () {
  Swal.fire({
    title: "Editar producto",
    titleText: 'Sombras de ojos',
    text: "No podras recuperar los datos",
    padding: '1rem',
    showConfirmButton: 'true',
    confirmButtonText: 'Confirmar',
    width: '70%',
    html: `
    <div class="container text-center">
            <div class="row">
                <div class="row">

                </div>
                <div class=" col-md-4">
                    <img class="rounded  mx-auto d-block" src="../../resources/img/productos/pd8.png" alt="..."
                        width="300px">
                    <br>
                    <br>

                </div>
                <div class="col">
                    <div class="row">
                        <div class="col">
                            <div class="letraPer col-md-4 fs-3">Nombre producto</div>
                            <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">Pincel rojo
                            </div>
                            <div class="letraPer col-md-4 fs-3">Precio producto</div>
                            <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">$40</div>
                            <div class="letraPer col-md-4 fs-3">Marca producto</div>
                            <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">A$ap Rocky</div>
                            <div class="letraPer col-md-4 fs-3">Descripción producto</div>
                            <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start" style="padding: 1rem;">
                            Define tus labios con elegancia usando nuestro labial de pincel en un deslumbrante tono rojo rubí.</div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    `
  })
})


$('#btn_editar1').click(function () {
  Swal.fire({
    title: "Editar producto",
    titleText: 'Sombras de ojos',
    text: "No podras recuperar los datos",
    padding: '1rem',
    showConfirmButton: 'true',
    confirmButtonText: 'Confirmar',
    showCancelButton: 'true',
    cancelButtonText: 'Cancelar',
    width: '70%',
    html: `<div class="container text-center">
            <div class="row">
                <div class="row">

                </div>
                <div class=" col-md-4">
                    <img class="rounded  mx-auto d-block" src="../../resources/img/productos/pd2.jpg" alt="..."
                        width="300px">
                    <br>
                    <br>

                </div>
                <div class="col">
                    <div class="row">
                        <div class="col">
                            <div class="letraPer col-md-4 fs-3">Nombre producto</div>
                            <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">
                                <input type="text" class="form-control fs-3" aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-default" value="paletas de frutas">
                            </div>
                            <div class="letraPer col-md-4 fs-3">Precio producto</div>
                            <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">
                                <input type="text" class="form-control fs-3" aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-default" value="$3.50">
                            </div>


                            <div class="letraPer col-md-4 fs-3">Marca producto</div>
                            <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">
                                <input type="text" class="form-control fs-3" aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-default" value="Columbia">
                            </div>

                            <div class="letraPer col-md-4 fs-3">Descripción producto</div>
                            <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start" >
                                <input type="text" class="form-control fs-3" aria-label="Sizing example input" style="height: 200px;"
                                    aria-describedby="inputGroup-sizing-default" value="¡Sumérgete en la dulzura exótica con nuestra paleta de colores inspirada en fresitas
                                    chinas!">
                            </div>

                        </div>
                    </div>

                </div>
            </div>

        </div> `
  })
})

$('#btn_editar1').click(function () {
  Swal.fire({
    title: "Editar producto",
    titleText: 'Sombras de ojos',
    text: "No podras recuperar los datos",
    padding: '1rem',
    showConfirmButton: 'true',
    confirmButtonText: 'Confirmar',
    showCancelButton: 'true',
    cancelButtonText: 'Cancelar',
    width: '70%',
    html: `<div class="container text-center">
    <div class="row">
        <div class="row">

        </div>
        <div class=" col-md-4">
            <img class="rounded  mx-auto d-block" src="../../resources/img/productos/pd2.jpg" alt="..."
                width="300px">
            <br>
            <br>

        </div>
        <div class="col">
            <div class="row">
                <div class="col">
                    <div class="letraPer col-md-4 fs-3">Nombre producto</div>
                    <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">
                        <input type="text" class="form-control fs-3" aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default" value="paletas de frutas">
                    </div>
                    <div class="letraPer col-md-4 fs-3">Precio producto</div>
                    <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">
                        <input type="text" class="form-control fs-3" aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default" value="$3.50">
                    </div>


                    <div class="letraPer col-md-4 fs-3">Marca producto</div>
                    <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">
                        <input type="text" class="form-control fs-3" aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default" value="Columbia">
                    </div>

                    <div class="letraPer col-md-4 fs-3">Descripción producto</div>
                    <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">
                        <textarea type="text" class="form-control fs-3" aria-label="Sizing example input"
                            style="height: 200px;" aria-describedby="inputGroup-sizing-default">
                            ¡Sumérgete en la dulzura exótica con nuestra paleta de colores inspirada en fresitas
                            chinas!</textarea>
                    </div>

                </div>
            </div>

        </div>
    </div>

</div> `
  })
})

$('#btn_editar2').click(function () {
  Swal.fire({
    title: "Editar producto",
    titleText: 'Sombras de ojos',
    text: "No podras recuperar los datos",
    padding: '1rem',
    showConfirmButton: 'true',
    confirmButtonText: 'Confirmar',
    showCancelButton: 'true',
    cancelButtonText: 'Cancelar',
    width: '70%',
    html: `<div class="container text-center">
            <div class="row">
                <div class="row">

                </div>
                <div class=" col-md-4">
                    <img class="rounded  mx-auto d-block" src="../../resources/img/productos/pd2.jpg" alt="..."
                        width="300px">
                    <br>
                    <br>

                </div>
                <div class="col">
                    <div class="row">
                        <div class="col">
                            <div class="letraPer col-md-4 fs-3">Nombre producto</div>
                            <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">
                                <input type="text" class="form-control fs-3" aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-default" value="paletas de frutas">
                            </div>
                            <div class="letraPer col-md-4 fs-3">Precio producto</div>
                            <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">
                                <input type="text" class="form-control fs-3" aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-default" value="$3.50">
                            </div>


                            <div class="letraPer col-md-4 fs-3">Marca producto</div>
                            <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">
                                <input type="text" class="form-control fs-3" aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-default" value="Columbia">
                            </div>

                            <div class="letraPer col-md-4 fs-3">Descripción producto</div>
                            <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">
                                <textarea type="text" class="form-control fs-3" aria-label="Sizing example input"
                                    style="height: 200px;" aria-describedby="inputGroup-sizing-default">
                                    ¡Sumérgete en la dulzura exótica con nuestra paleta de colores inspirada en fresitas
                                    chinas!</textarea>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

        </div> `
  })
})

$('#btn_editar1').click(function () {
  Swal.fire({
    title: "Editar producto",
    titleText: 'Sombras de ojos',
    text: "No podras recuperar los datos",
    padding: '1rem',
    showConfirmButton: 'true',
    confirmButtonText: 'Confirmar',
    showCancelButton: 'true',
    cancelButtonText: 'Cancelar',
    width: '70%',
    html: `<div class="container text-center">
    <div class="row">
        <div class="row">

        </div>
        <div class=" col-md-4">
            <img class="rounded  mx-auto d-block" src="../../resources/img/productos/pd2.jpg" alt="..."
                width="300px">
            <br>
            <br>

        </div>
        <div class="col">
            <div class="row">
                <div class="col">
                    <div class="letraPer col-md-4 fs-3">Nombre producto</div>
                    <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">
                        <input type="text" class="form-control fs-3" aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default" value="paletas de frutas">
                    </div>
                    <div class="letraPer col-md-4 fs-3">Precio producto</div>
                    <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">
                        <input type="text" class="form-control fs-3" aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default" value="$3.50">
                    </div>


                    <div class="letraPer col-md-4 fs-3">Marca producto</div>
                    <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">
                        <input type="text" class="form-control fs-3" aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default" value="Columbia">
                    </div>

                    <div class="letraPer col-md-4 fs-3">Descripción producto</div>
                    <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">
                        <textarea type="text" class="form-control fs-3" aria-label="Sizing example input"
                            style="height: 200px;" aria-describedby="inputGroup-sizing-default">
                            ¡Sumérgete en la dulzura exótica con nuestra paleta de colores inspirada en fresitas
                            chinas!</textarea>
                    </div>

                </div>
            </div>

        </div>
    </div>

</div> `
  })
})

$('#btn_editar1').click(function () {
  Swal.fire({
    title: "Editar producto",
    titleText: 'Sombras de ojos',
    text: "No podras recuperar los datos",
    padding: '1rem',
    showConfirmButton: 'true',
    confirmButtonText: 'Confirmar',
    showCancelButton: 'true',
    cancelButtonText: 'Cancelar',
    width: '70%',
    html: `<div class="container text-center">
    <div class="row">
        <div class="row">

        </div>
        <div class=" col-md-4">
            <img class="rounded  mx-auto d-block" src="../../resources/img/productos/pd2.jpg" alt="..."
                width="300px">
            <br>
            <br>

        </div>
        <div class="col">
            <div class="row">
                <div class="col">
                    <div class="letraPer col-md-4 fs-3">Nombre producto</div>
                    <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">
                        <input type="text" class="form-control fs-3" aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default" value="paletas de frutas">
                    </div>
                    <div class="letraPer col-md-4 fs-3">Precio producto</div>
                    <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">
                        <input type="text" class="form-control fs-3" aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default" value="$3.50">
                    </div>


                    <div class="letraPer col-md-4 fs-3">Marca producto</div>
                    <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">
                        <input type="text" class="form-control fs-3" aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default" value="Columbia">
                    </div>

                    <div class="letraPer col-md-4 fs-3">Descripción producto</div>
                    <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">
                        <textarea type="text" class="form-control fs-3" aria-label="Sizing example input"
                            style="height: 200px;" aria-describedby="inputGroup-sizing-default">
                            ¡Sumérgete en la dulzura exótica con nuestra paleta de colores inspirada en fresitas
                            chinas!</textarea>
                    </div>

                </div>
            </div>

        </div>
    </div>

</div> `
  })
})

$('#btn_editar1').click(function () {
  Swal.fire({
    title: "Editar producto",
    titleText: 'Sombras de ojos',
    text: "No podras recuperar los datos",
    padding: '1rem',
    showConfirmButton: 'true',
    confirmButtonText: 'Confirmar',
    showCancelButton: 'true',
    cancelButtonText: 'Cancelar',
    width: '70%',
    html: `<div class="container text-center">
    <div class="row">
        <div class="row">

        </div>
        <div class=" col-md-4">
            <img class="rounded  mx-auto d-block" src="../../resources/img/productos/pd2.jpg" alt="..."
                width="300px">
            <br>
            <br>

        </div>
        <div class="col">
            <div class="row">
                <div class="col">
                    <div class="letraPer col-md-4 fs-3">Nombre producto</div>
                    <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">
                        <input type="text" class="form-control fs-3" aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default" value="paletas de frutas">
                    </div>
                    <div class="letraPer col-md-4 fs-3">Precio producto</div>
                    <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">
                        <input type="text" class="form-control fs-3" aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default" value="$3.50">
                    </div>


                    <div class="letraPer col-md-4 fs-3">Marca producto</div>
                    <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">
                        <input type="text" class="form-control fs-3" aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default" value="Columbia">
                    </div>

                    <div class="letraPer col-md-4 fs-3">Descripción producto</div>
                    <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">
                        <textarea type="text" class="form-control fs-3" aria-label="Sizing example input"
                            style="height: 200px;" aria-describedby="inputGroup-sizing-default">
                            ¡Sumérgete en la dulzura exótica con nuestra paleta de colores inspirada en fresitas
                            chinas!</textarea>
                    </div>

                </div>
            </div>

        </div>
    </div>

</div> `
  })
})

$('#btn_editar1').click(function () {
  Swal.fire({
    title: "Editar producto",
    titleText: 'Sombras de ojos',
    text: "No podras recuperar los datos",
    padding: '1rem',
    showConfirmButton: 'true',
    confirmButtonText: 'Confirmar',
    showCancelButton: 'true',
    cancelButtonText: 'Cancelar',
    width: '70%',
    html: `<div class="container text-center">
    <div class="row">
        <div class="row">

        </div>
        <div class=" col-md-4">
            <img class="rounded  mx-auto d-block" src="../../resources/img/productos/pd2.jpg" alt="..."
                width="300px">
            <br>
            <br>

        </div>
        <div class="col">
            <div class="row">
                <div class="col">
                    <div class="letraPer col-md-4 fs-3">Nombre producto</div>
                    <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">
                        <input type="text" class="form-control fs-3" aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default" value="paletas de frutas">
                    </div>
                    <div class="letraPer col-md-4 fs-3">Precio producto</div>
                    <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">
                        <input type="text" class="form-control fs-3" aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default" value="$3.50">
                    </div>


                    <div class="letraPer col-md-4 fs-3">Marca producto</div>
                    <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">
                        <input type="text" class="form-control fs-3" aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default" value="Columbia">
                    </div>

                    <div class="letraPer col-md-4 fs-3">Descripción producto</div>
                    <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">
                        <textarea type="text" class="form-control fs-3" aria-label="Sizing example input"
                            style="height: 200px;" aria-describedby="inputGroup-sizing-default">
                            ¡Sumérgete en la dulzura exótica con nuestra paleta de colores inspirada en fresitas
                            chinas!</textarea>
                    </div>

                </div>
            </div>

        </div>
    </div>

</div> `
  })
})

$('#btn_editar1').click(function () {
  Swal.fire({
    title: "Editar producto",
    titleText: 'Sombras de ojos',
    text: "No podras recuperar los datos",
    padding: '1rem',
    showConfirmButton: 'true',
    confirmButtonText: 'Confirmar',
    showCancelButton: 'true',
    cancelButtonText: 'Cancelar',
    width: '70%',
    html: `<div class="container text-center">
    <div class="row">
        <div class="row">

        </div>
        <div class=" col-md-4">
            <img class="rounded  mx-auto d-block" src="../../resources/img/productos/pd2.jpg" alt="..."
                width="300px">
            <br>
            <br>

        </div>
        <div class="col">
            <div class="row">
                <div class="col">
                    <div class="letraPer col-md-4 fs-3">Nombre producto</div>
                    <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">
                        <input type="text" class="form-control fs-3" aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default" value="paletas de frutas">
                    </div>
                    <div class="letraPer col-md-4 fs-3">Precio producto</div>
                    <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">
                        <input type="text" class="form-control fs-3" aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default" value="$3.50">
                    </div>


                    <div class="letraPer col-md-4 fs-3">Marca producto</div>
                    <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">
                        <input type="text" class="form-control fs-3" aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default" value="Columbia">
                    </div>

                    <div class="letraPer col-md-4 fs-3">Descripción producto</div>
                    <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">
                        <textarea type="text" class="form-control fs-3" aria-label="Sizing example input"
                            style="height: 200px;" aria-describedby="inputGroup-sizing-default">
                            ¡Sumérgete en la dulzura exótica con nuestra paleta de colores inspirada en fresitas
                            chinas!</textarea>
                    </div>

                </div>
            </div>

        </div>
    </div>

</div> `
  })
})

