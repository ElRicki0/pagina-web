const modal_agregar_producto = new bootstrap.Modal('#modal_agregar_producto');
const modal_editar_producto = new bootstrap.Modal('#modal_editar_producto');
const modal_informacion_producto = new bootstrap.Modal('#modal_informacion_producto');

//agregar producto
document.getElementById('modal_agregar_producto').addEventListener('show.bs.modal', function (event) {
    // Encuentra el formulario dentro del modal
    var form_a_producto = event.target.querySelector('form');
    // Resetea el formulario
    form_a_producto.reset();
});

function agregar_producto() {
    // Muestra el modal
    modal_agregar_producto.show();
}
//editar producto
document.getElementById('modal_editar_producto').addEventListener('show.bs.modal', function (event) {
    // Encuentra el formulario dentro del modal
    var form_e_producto = event.target.querySelector('form');
    // Resetea el formulario
    form_e_producto.reset();
});

function editar_producto() {
    // Muestra el modal
    modal_editar_producto.show();
}

//información producto
document.getElementById('modal_informacion_producto').addEventListener('show.bs.modal', function (event) {
    // Encuentra el formulario dentro del modal
    var form_i_producto = event.target.querySelector('form');
    // Resetea el formulario
    form_i_producto.reset();
});

function informacion_producto() {
    // Muestra el modal
    modal_informacion_producto.show();
}