const modal_agregar_marca = new bootstrap.Modal('#modal_agregar_marca');
const modal_editar_marca = new bootstrap.Modal('#modal_editar_marca');
const modal_información_marca = new bootstrap.Modal('#modal_información_marca');


//agregar marca
document.getElementById('modal_agregar_marca').addEventListener('show.bs.modal', function (event) {
    // Encuentra el formulario dentro del modal
    var form_a_marca = event.target.querySelector('form');
    // Resetea el formulario
    form_a_marca.reset();
});

function agregar_marca() {
    // Muestra el modal
    modal_agregar_marca.show();
}

//editar marca
document.getElementById('modal_editar_marca').addEventListener('show.bs.modal', function (event) {
    // Encuentra el formulario dentro del modal
    var form_a_marca = event.target.querySelector('form');
    // Resetea el formulario
    form_a_marca.reset();
});

function editar_marca() {
    // Muestra el modal
    modal_editar_marca.show();
}


//información marca
document.getElementById('modal_información_marca').addEventListener('show.bs.modal', function (event) {
    // Encuentra el formulario dentro del modal
    var form_i_marca = event.target.querySelector('form');
    // Resetea el formulario
    form_i_marca.reset();
});

function información_marca() {
    // Muestra el modal
    modal_información_marca.show();
}