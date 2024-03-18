const modal_agregar_categoria = new bootstrap.Modal('#modal_agregar_categoría');
const modal_editar_categoria = new bootstrap.Modal('#modal_editar_categoría');

//agregar categoría

// Evento show.bs.modal del modal
document.getElementById('modal_agregar_categoría').addEventListener('show.bs.modal', function (event) {
    // Encuentra el formulario dentro del modal
    var form = event.target.querySelector('form');
    // Resetea el formulario
    form.reset();
});

// mostrar el modal
function crear_categoria() {
    // Muestra el modal
    modal_agregar_categoria.show();
}

//editar categoría
document.getElementById('modal_editar_categoría').addEventListener('show.bs.modal', function (event) {
    // Encuentra el formulario dentro del modal
    var form_e = event.target.querySelector('form');
    // Resetea el formulario
    form_ee.reset();
});

function editar_categoria() {
    // Muestra el modal
    modal_editar_categoria.show();
}
