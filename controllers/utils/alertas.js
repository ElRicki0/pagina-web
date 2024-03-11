


/*
----------------------------------------
/// función para alertas generales   ///
----------------------------------------
*/
function alertMine(action) {
    switch (action) {
        case 'agregarUsu':
            Swal.fire({
                title: "Agregar usuario",
                text: "El usuario se agrego correctamente",
                imageUrl: "../../resources/img/alertasImagenes/kirby.png",
                imageWidth: 200,
                imageHeight: 200,
            });
            break;

        case 'eliminarUsu':
            Swal.fire({
                title: "¿Estas seguro de eliminarlo?",
                text: "No podras recuperar los datos de este usuario",
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
                        text: "El usuario se ha borrado correctamente",
                        imageUrl: "../../resources/img/alertasImagenes/kirby.png",
                        imageWidth: 200,
                        imageHeight: 200,
                    });
                }
            });
            break;
        case 'modificar':
            message = 'Registro modificar correctamente';
            break;
        case 'eliminar':
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
                        text: "El producto se ha borrado correctamente",
                        imageUrl: "../../resources/img/alertasImagenes/kirby.png",
                        imageWidth: 200,
                        imageHeight: 200,
                    });
                }
            });
            break;
        case 'entregado':
            Swal.fire({
                text: "El pedido se ha actualizado a (entregado)",
                imageUrl: "../../resources/img/alertasImagenes/kirby.png",
                imageWidth: 200,
                imageHeight: 200,
                imageAlt: "Custom image"
            });
            break;
        case 'pendiente':
            Swal.fire({
                text: "El pedido se ha actualizado a (pendiente)",
                imageUrl: "../../resources/img/alertasImagenes/kirbyTriste.png",
                imageWidth: 200,
                imageHeight: 200,
                imageAlt: "Custom image"
            });
        case 'modificarUsu':
            Swal.fire({
                text: 'El usuario se ha editado correctamente',
                imageUrl: "../../resources/img/alertasImagenes/kirby.png",
                imageWidth: 200,
                imageHeight: 200,
                imageAlt: "Custom image"
            })
            break;
        case 'agregar_producto':
            Swal.fire({
                title: 'Agregar producto',
                width: '70%',
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Confirmar",
                html: `<div class="container text-center">
                <div class="row">
                    <div class="row">

                    </div>
                    <div class=" col-md-4">
                        <img class="rounded  mx-auto d-block" style="margin-top: 3rem;"
                            src="../../resources/img/productos/agregar_producto.jpg" alt="..." width="300px">
                        <br>
                        <br>
                        <button type="button" class="btn btn-secondary btn-lg boton_editar">Cambiar
                            imagen</button>
                    </div>
                    <div class="col" style="margin-top: 3rem;">
                        <div class="row">
                            <div class="col">
                                <div class="letraPer col-md-4 fs-3">Nombre producto</div>
                                <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">
                                    <input type="text" class="form-control fs-3"
                                        aria-label="Sizing example input"
                                        aria-describedby="inputGroup-sizing-default" value="">
                                </div>
                                <div class="letraPer col-md-4 fs-3">Precio producto</div>
                                <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">
                                    <input type="number" step="0.01" class="form-control fs-3"
                                        aria-label="Sizing example input"
                                        aria-describedby="inputGroup-sizing-default" value="">
                                </div>

                                <div class="letraPer col-md-4 fs-3">Marca producto</div>
                                <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">
                                    <input type="text" class="form-control fs-3"
                                        aria-label="Sizing example input"
                                        aria-describedby="inputGroup-sizing-default" value="">
                                </div>

                                <div class="letraPer col-md-4 fs-3">Descripción producto</div>
                                <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">
                                    <textarea type="text" class="form-control fs-3"
                                        aria-label="Sizing example input" style="height: 150px;"
                                        aria-describedby="inputGroup-sizing-default"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> `
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Elemento agregado!",
                        text: "El producto se ha agregado correctamente",
                        imageUrl: "../../resources/img/alertasImagenes/kirby.png",
                        imageWidth: 200,
                        imageHeight: 200,
                    });
                }
            });
            break;
        case 'agregar_marca':
            Swal.fire({
                title: 'Agregar marca',
                width: '70%',
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Confirmar",
                html: `<div class="container text-center">
                <div class="row">
                    <div class="row">
    
                    </div>
                    <div class=" col-md-4">
                        <img class="rounded  mx-auto d-block" style="margin-top: 3rem;"
                            src="../../resources/img/productos/agregar_producto.jpg" alt="..." width="300px">
                        <br>
                        <br>
                        <button type="button" class="btn btn-secondary btn-lg boton_editar">Cambiar
                            imagen</button>
                    </div>
                    <div class="col" style="margin-top: 3rem;">
                        <div class="row">
                            <div class="col">
                                <div class="letraPer col-md-4 fs-3">Nombre producto</div>
                                <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">
                                    <input type="text" class="form-control fs-3" aria-label="Sizing example input"
                                        aria-describedby="inputGroup-sizing-default" value="">
                                </div>
    
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Elemento agregado!",
                        text: "El producto se ha agregado correctamente",
                        imageUrl: "../../resources/img/alertasImagenes/kirby.png",
                        imageWidth: 200,
                        imageHeight: 200,
                    });
                }
            });
            break;
        case 'editar_marca':
            Swal.fire({
                title: 'Editar marca',
                width: '70%',
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Confirmar",
                html: `<div class="container text-center">
                <div class="row">
                    <div class="row">
    
                    </div>
                    <div class=" col">
    
                        <img class="rounded  mx-auto d-block" style="margin-top: 3rem;"
                            src="../../resources/img/productos/agregar_producto.jpg" alt="..." width="300px">
                        <br>
                        <br>
                        <button type="button" class="btn btn-secondary btn-lg boton_editar">Cambiar
                            imagen</button>
                    </div>
                    <div class="col-md-6" style="margin: 3rem, 3rem, 3rem, 3rem;">
                        <div class="row">
                            <div class="col">
                                <div class="mx-auto">
    
                                    <div class="letraPer col-md-5 fs-3">Nombre producto</div>
                                    <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">
                                        <input type="text" class="form-control fs-3" aria-label="Sizing example input"
                                            aria-describedby="inputGroup-sizing-default" value="Ejemplo de marca">
                                    </div>  
                                </div>
    
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Elemento editado!",
                        text: "El producto se ha editado correctamente",
                        imageUrl: "../../resources/img/alertasImagenes/kirby.png",
                        imageWidth: 200,
                        imageHeight: 200,
                    });
                }
            });
            break;
        case 'información_marca':
            Swal.fire({
                title: "Información producto",
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
                            <img class="rounded  mx-auto d-block" src="../../resources/img/marcas/mc4.jpg" alt="..."
                                width="300px">
                            <br>
                            <br>
        
                        </div>
                        <div class="col">
                            <div class="row">
                                <div class="col">
                                    <div class="letraPer col-md-4 fs-3">Nombre marca</div>
                                    <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">Ejemplo de nombre de la marca
                                    </div>
                                </div>
                            </div>
        
                        </div>
                    </div>
        
                </div>
            `
            })
            break;
        case 'agregar_categoría':
            Swal.fire({
                title: 'Agregar categoria',
                width: '70%',
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Confirmar",
                html: `<div class="container text-center">
                <div class="row">
                    <div class="row">
    
                    </div>
                    <div class=" col-md-4">
                        <img class="rounded  mx-auto d-block" style="margin-top: 3rem;"
                            src="../../resources/img/productos/agregar_producto.jpg" alt="..." width="300px">
                        <br>
                        <br>
                        <button type="button" class="btn btn-secondary btn-lg boton_editar">Cambiar
                            imagen</button>
                    </div>
                    <div class="col" style="margin-top: 3rem;">
                        <div class="row">
                            <div class="col">
                            <div class="letraPer col-md-4 fs-3">Nombre categoría</div>
                            <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">
                                <input type="text" class="form-control fs-3"
                                    aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-default" value="">
                            </div>
    
                            <div class="col">
                                <div class="letraPer col-md-4 fs-3">Descripción producto</div>
                                <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">
                                    <textarea type="text" class="form-control fs-3" aria-label="Sizing example input"
                                        style="height: 150px;" aria-describedby="inputGroup-sizing-default"></textarea>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>`
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Elemento agregado!",
                        text: "El producto se ha agregado correctamente",
                        imageUrl: "../../resources/img/alertasImagenes/kirby.png",
                        imageWidth: 200,
                        imageHeight: 200,
                    });
                }
            });
            break;
            break;
        case 'editar_categoría':
            Swal.fire({
                title: 'Editar categoría',
                width: '70%',
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Confirmar",
                html: `<div class="container text-center">
                <div class="row">
                    <div class="row">
    
                    </div>
                    <div class=" col-md-4">
                        <img class="rounded  mx-auto d-block" style="margin-top: 3rem;"
                            src="../../resources/img/productos/agregar_producto.jpg" alt="..." width="300px">
                        <br>
                        <br>
                        <button type="button" class="btn btn-secondary btn-lg boton_editar">Cambiar
                            imagen</button>
                    </div>
                    <div class="col" style="margin-top: 3rem;">
                        <div class="row">
                            <div class="col">
                            <div class="letraPer col-md-4 fs-3">Nombre categoría</div>
                            <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">
                                <input type="text" class="form-control fs-3"
                                    aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-default" value="ejemplo de nombre de categoría">
                            </div>
    
                            <div class="col">
                                <div class="letraPer col-md-4 fs-3">Descripción producto</div>
                                <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">
                                    <textarea type="text" class="form-control fs-3" aria-label="Sizing example input"
                                        style="height: 150px;" aria-describedby="inputGroup-sizing-default">Este es un ejemplo de como poder hacer nas cosas increíbles con el text area </textarea>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>`
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Elemento editado!",
                        text: "El producto se ha editado correctamente",
                        imageUrl: "../../resources/img/alertasImagenes/kirby.png",
                        imageWidth: 200,
                        imageHeight: 200,
                    });
                }
            });
            break;
        case 'información_categoría':
            Swal.fire({
                title: "Información categoría",
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
                            <img class="rounded  mx-auto d-block" src="../../resources/img/marcas/mc4.jpg" alt="..."
                                width="300px">
                            <br>
                            <br>
        
                        </div>
                        <div class="col">
                            <div class="row">
                                <div class="col">
                                    <div class="letraPer col-md-4 fs-3">Nombre categoría</div>
                                    <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">Ejemplo de nombre de la categoría
                                    </div>
                                <div class="letraPer col-md-4 fs-3">Descripción categoría</div>
                                <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">Ejemplo de una descripcion para una de la categorías
                                </div>
                            </div>
                            </div>
        
                        </div>
                    </div>
        
                </div>
            `
            })
            break;
    }

}
/**/


/*producto_editar*/
document.getElementById('btn_info1').addEventListener('click', function () {
    Swal.fire({
        title: "Información producto",
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

document.getElementById('btn_info2').addEventListener('click', function () {
    Swal.fire({
        title: "Información producto",
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

document.getElementById('btn_info3').addEventListener('click', function () {
    Swal.fire({
        title: "Información producto",
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

document.getElementById('btn_info4').addEventListener('click', function () {
    Swal.fire({
        title: "Información producto",
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

document.getElementById('btn_info5').addEventListener('click', function () {
    Swal.fire({
        title: "Información producto",
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

document.getElementById('btn_info6').addEventListener('click', function () {
    Swal.fire({
        title: "Información producto",
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

document.getElementById('btn_info7').addEventListener('click', function () {
    Swal.fire({
        title: "Información producto",
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

document.getElementById('btn_info8').addEventListener('click', function () {
    Swal.fire({
        title: "Información producto",
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

document.getElementById('btn_editar1').addEventListener('click', function () {
    Swal.fire({
        title: "Editar producto",
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
                    <img class="rounded  mx-auto d-block" src="../../resources/img/productos/pd1.jpg" alt="..."
                        width="300px">
                        <br>
                    <br>
                    <button type="button" class="btn btn-secondary btn-lg boton_editar">Cambiar imagen</button>
                    <br>
                    <br>

                </div>
                <div class="col">
                    <div class="row">
                        <div class="col">
                            <div class="letraPer col-md-4 fs-3">Nombre producto</div>
                            <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">
                                <input type="text" class="form-control fs-3" aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-default" value="sombra de ojos">
                            </div>
                            <div class="letraPer col-md-4 fs-3">Precio producto</div>
                            <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">
                                <input type="text" class="form-control fs-3" aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-default" value="$7.50">
                            </div>


                            <div class="letraPer col-md-4 fs-3">Marca producto</div>
                            <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">
                                <input type="text" class="form-control fs-3" aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-default" value="Kellogs">
                            </div>

                            <div class="letraPer col-md-4 fs-3">Descripción producto</div>
                            <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start" >
                            <textarea type="text" class="form-control fs-3" aria-label="Sizing example input"
                            style="height: 150px;" aria-describedby="inputGroup-sizing-default">Descubre la paleta perfecta: nuestro programa de sombras de ojos te lleva desde lo sutil hasta lo espectacular en cada aplicación</textarea>
                    </div>

                        </div>
                    </div>

                </div>
            </div>

        </div> `
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "¿Estas seguro de editarlo?",
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
                        title: "Elemento Editado!",
                        text: "El archivo se ha Editado correctamente",
                        imageUrl: "../../resources/img/alertasImagenes/kirby.png",
                        imageWidth: 200,
                        imageHeight: 200
                    })
                }
            });
        }
    });
})

document.getElementById('btn_editar2').addEventListener('click', function () {
    Swal.fire({
        title: "Editar producto",
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
                    <button type="button" class="btn btn-secondary btn-lg boton_editar">Cambiar imagen</button>
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
                    style="height: 150px;" aria-describedby="inputGroup-sizing-default">¡Sumérgete en la dulzura exótica con nuestra paleta de colores inspirada en fresitas chinas!</textarea>
            </div>

                </div>
            </div>

        </div>
    </div>

</div> `
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "¿Estas seguro de editarlo?",
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
                        title: "Elemento Editado!",
                        text: "El archivo se ha Editado correctamente",
                        imageUrl: "../../resources/img/alertasImagenes/kirby.png",
                        imageWidth: 200,
                        imageHeight: 200
                    })
                }
            });
        }
    });
})

document.getElementById('btn_editar3').addEventListener('click', function () {
    Swal.fire({
        title: "Editar producto",
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
                    <img class="rounded  mx-auto d-block" src="../../resources/img/productos/pd3.jpg" alt="..."
                        width="300px">
                        <br>
                        <br>
                        <button type="button" class="btn btn-secondary btn-lg boton_editar">Cambiar imagen</button>

                </div>
                <div class="col">
                    <div class="row">
                        <div class="col">
                            <div class="letraPer col-md-4 fs-3">Nombre producto</div>
                            <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">
                                <input type="text" class="form-control fs-3" aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-default" value="Polvo de hadas">
                            </div>
                            <div class="letraPer col-md-4 fs-3">Precio producto</div>
                            <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">
                                <input type="text" class="form-control fs-3" aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-default" value="$11.00">
                            </div>


                            <div class="letraPer col-md-4 fs-3">Marca producto</div>
                            <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">
                                <input type="text" class="form-control fs-3" aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-default" value="Rapture">
                            </div>

                            <div class="letraPer col-md-4 fs-3">Descripción producto</div>
                            <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">
                            <textarea type="text" class="form-control fs-3" aria-label="Sizing example input"
                            style="height: 150px;" aria-describedby="inputGroup-sizing-default">Obtén una piel luminosa y uniforme con nuestra crema aclaradora de alta calidad. espectacular en cada aplicación</textarea>
                    </div>

                        </div>
                    </div>

                </div>
            </div>

        </div> `
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "¿Estas seguro de editarlo?",
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
                        title: "Elemento Editado!",
                        text: "El archivo se ha Editado correctamente",
                        imageUrl: "../../resources/img/alertasImagenes/kirby.png",
                        imageWidth: 200,
                        imageHeight: 200
                    })
                }
            });
        }
    });
})

document.getElementById('btn_editar4').addEventListener('click', function () {
    Swal.fire({
        title: "Editar producto",
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
            <img class="rounded  mx-auto d-block" src="../../resources/img/productos/pd4.png" alt="..."
                width="300px">
                <br>
                <br>
                <button type="button" class="btn btn-secondary btn-lg boton_editar">Cambiar imagen</button>

        </div>
        <div class="col">
            <div class="row">
                <div class="col">
                    <div class="letraPer col-md-4 fs-3">Nombre producto</div>
                    <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">
                        <input type="text" class="form-control fs-3" aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default" value="Labial mata toros">
                    </div>
                    <div class="letraPer col-md-4 fs-3">Precio producto</div>
                    <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">
                        <input type="text" class="form-control fs-3" aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default" value="$3.70">
                    </div>


                    <div class="letraPer col-md-4 fs-3">Marca producto</div>
                    <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">
                        <input type="text" class="form-control fs-3" aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default" value="Cromopolis">
                    </div>

                    <div class="letraPer col-md-4 fs-3">Descripción producto</div>
                    <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">
                    <textarea type="text" class="form-control fs-3" aria-label="Sizing example input"
                    style="height: 150px;" aria-describedby="inputGroup-sizing-default">Atrévete a destacar con nuestro labial de un rojo intenso como el carmesí</textarea>
            </div>

                </div>
            </div>

        </div>
    </div>

</div> `
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "¿Estas seguro de editarlo?",
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
                        title: "Elemento Editado!",
                        text: "El archivo se ha Editado correctamente",
                        imageUrl: "../../resources/img/alertasImagenes/kirby.png",
                        imageWidth: 200,
                        imageHeight: 200
                    })
                }
            });
        }
    });
})

document.getElementById('btn_editar5').addEventListener('click', function () {
    Swal.fire({
        title: "Editar producto",
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
            <img class="rounded  mx-auto d-block" src="../../resources/img/productos/pd5.jpg" alt="..."
                width="300px">
                <br>
                <br>
                <button type="button" class="btn btn-secondary btn-lg boton_editar">Cambiar imagen</button>

        </div>
        <div class="col">
            <div class="row">
                <div class="col">
                    <div class="letraPer col-md-4 fs-3">Nombre producto</div>
                    <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">
                        <input type="text" class="form-control fs-3" aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default" value="Polvo de brujas">
                    </div>
                    <div class="letraPer col-md-4 fs-3">Precio producto</div>
                    <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">
                        <input type="text" class="form-control fs-3" aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default" value="$9.00">
                    </div>


                    <div class="letraPer col-md-4 fs-3">Marca producto</div>
                    <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">
                        <input type="text" class="form-control fs-3" aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default" value="Village">
                    </div>

                    <div class="letraPer col-md-4 fs-3">Descripción producto</div>
                    <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">
                    <textarea type="text" class="form-control fs-3" aria-label="Sizing example input"
                    style="height: 150px;" aria-describedby="inputGroup-sizing-default">Logra un acabado mágico con nuestro polvo de hadas, ¡tu secreto para un maquillaje impecable!</textarea>
            </div>

                </div>
            </div>

        </div>
    </div>

</div> `
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "¿Estas seguro de editarlo?",
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
                        title: "Elemento Editado!",
                        text: "El archivo se ha Editado correctamente",
                        imageUrl: "../../resources/img/alertasImagenes/kirby.png",
                        imageWidth: 200,
                        imageHeight: 200
                    })
                }
            });
        }
    });
})

document.getElementById('btn_editar6').addEventListener('click', function () {
    Swal.fire({
        title: "Editar producto",
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
            <img class="rounded  mx-auto d-block" src="../../resources/img/productos/pd6.jpg" alt="..."
                width="300px">
                <br>
                <br>
                <button type="button" class="btn btn-secondary btn-lg boton_editar">Cambiar imagen</button>

        </div>
        <div class="col">
            <div class="row">
                <div class="col">
                    <div class="letraPer col-md-4 fs-3">Nombre producto</div>
                    <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">
                        <input type="text" class="form-control fs-3" aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default" value="lápiz de colores">
                    </div>
                    <div class="letraPer col-md-4 fs-3">Precio producto</div>
                    <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">
                        <input type="text" class="form-control fs-3" aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default" value="$70">
                    </div>


                    <div class="letraPer col-md-4 fs-3">Marca producto</div>
                    <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">
                        <input type="text" class="form-control fs-3" aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default" value="Tintelia">
                    </div>

                    <div class="letraPer col-md-4 fs-3">Descripción producto</div>
                    <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">
                    <textarea type="text" class="form-control fs-3" aria-label="Sizing example input"
                    style="height: 150px;" aria-describedby="inputGroup-sizing-default">Define y realza tus labios con nuestro lápiz labial en tono natural.</textarea>
            </div>

                </div>
            </div>

        </div>
    </div>

</div> `
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "¿Estas seguro de editarlo?",
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
                        title: "Elemento Editado!",
                        text: "El archivo se ha Editado correctamente",
                        imageUrl: "../../resources/img/alertasImagenes/kirby.png",
                        imageWidth: 200,
                        imageHeight: 200
                    })
                }
            });
        }
    });
})

document.getElementById('btn_editar7').addEventListener('click', function () {
    Swal.fire({
        title: "Editar producto",
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
            <img class="rounded  mx-auto d-block" src="../../resources/img/productos/pd7.jpg" alt="..."
                width="300px">
                <br>
                <br>
                <button type="button" class="btn btn-secondary btn-lg boton_editar">Cambiar imagen</button>

        </div>
        <div class="col">
            <div class="row">
                <div class="col">
                    <div class="letraPer col-md-4 fs-3">Nombre producto</div>
                    <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">
                        <input type="text" class="form-control fs-3" aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default" value="Lápiz tonalidad oscura">
                    </div>
                    <div class="letraPer col-md-4 fs-3">Precio producto</div>
                    <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">
                        <input type="text" class="form-control fs-3" aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default" value="$750">
                    </div>


                    <div class="letraPer col-md-4 fs-3">Marca producto</div>
                    <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">
                        <input type="text" class="form-control fs-3" aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default" value="Shout like">
                    </div>

                    <div class="letraPer col-md-4 fs-3">Descripción producto</div>
                    <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">
                    <textarea type="text" class="form-control fs-3" aria-label="Sizing example input"
                    style="height: 150px;" aria-describedby="inputGroup-sizing-default">Añade un toque de misterio con nuestro lápiz labial en un tono oscuro y seductor.</textarea>
            </div>

                </div>
            </div>

        </div>
    </div>

</div> `
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "¿Estas seguro de editarlo?",
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
                        title: "Elemento Editado!",
                        text: "El archivo se ha Editado correctamente",
                        imageUrl: "../../resources/img/alertasImagenes/kirby.png",
                        imageWidth: 200,
                        imageHeight: 200
                    })
                }
            });
        }
    });
})

document.getElementById('btn_editar8').addEventListener('click', function () {
    Swal.fire({
        title: "Editar producto",
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
            <img class="rounded  mx-auto d-block" src="../../resources/img/productos/pd8.png" alt="..."
                width="300px">
                <br>
                <br>
                <button type="button" class="btn btn-secondary btn-lg boton_editar">Cambiar imagen</button>

        </div>
        <div class="col">
            <div class="row">
                <div class="col">
                    <div class="letraPer col-md-4 fs-3">Nombre producto</div>
                    <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">
                        <input type="text" class="form-control fs-3" aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default" value="Pincel rojo">
                    </div>
                    <div class="letraPer col-md-4 fs-3">Precio producto</div>
                    <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">
                        <input type="text" class="form-control fs-3" aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default" value="$40">
                    </div>


                    <div class="letraPer col-md-4 fs-3">Marca producto</div>
                    <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">
                        <input type="text" class="form-control fs-3" aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default" value="A$ap Rocky">
                    </div>

                    <div class="letraPer col-md-4 fs-3">Descripción producto</div>
                    <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">
                    <textarea type="text" class="form-control fs-3" aria-label="Sizing example input"
                    style="height: 150px;" aria-describedby="inputGroup-sizing-default">Define tus labios con elegancia usando nuestro labial de pincel en un deslumbrante tono rojo rubí.</textarea>
            </div>

                </div>
            </div>

        </div>
    </div>

</div> `
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "¿Estas seguro de editarlo?",
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
                        title: "Elemento Editado!",
                        text: "El archivo se ha Editado correctamente",
                        imageUrl: "../../resources/img/alertasImagenes/kirby.png",
                        imageWidth: 200,
                        imageHeight: 200
                    })
                }
            });
        }
    });
})


document.getElementById('btn_agregar').addEventListener('click', function () {
    Swal.fire({
        title: "Agregar producto",
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
            <img class="rounded  mx-auto d-block" src="../../resources/img/productos/agregar_producto.jpg" alt="..."
                width="300px">
                <br>
                <br>
                <button type="button" class="btn btn-secondary btn-lg boton_editar">Cambiar imagen</button>

        </div>
        <div class="col">
            <div class="row">
            <div class="col">
            <div class="letraPer col-md-4 fs-3">Nombre producto</div>
            <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">
                <input type="text" class="form-control fs-3" aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default" value="">
            </div>
            <div class="letraPer col-md-4 fs-3">Precio producto</div>
            <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">
                <input type="number" step="0.01" class="form-control fs-3" aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default" value="">
            </div>
        
            <div class="letraPer col-md-4 fs-3">Marca producto</div>
            <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">
                <input type="text" class="form-control fs-3" aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default" value="">
            </div>
        
            <div class="letraPer col-md-4 fs-3">Descripción producto</div>
            <div class="cuadroText col-md-8 fs-3 border border-dark rounded text-start">
                <textarea type="text" class="form-control fs-3" aria-label="Sizing example input"
                    style="height: 150px;" aria-describedby="inputGroup-sizing-default"></textarea>
            </div>
        </div>
        

                </div>
            </div>

        </div>
    </div>

</div> `
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Elemento Agregado!",
                text: "El archivo se ha agregado correctamente",
                imageUrl: "../../resources/img/alertasImagenes/kirby.png",
                imageWidth: 200,
                imageHeight: 200
            })
        }
    });
})