const usuario       = document.getElementById('usuario');
const contrasenia   = document.getElementById('contrasenia');
const BtnCorrecto    = document.getElementById('BtnCorrecto');

BtnCorrecto.addEventListener('click', (e)=>{
    e.preventDefault();
    const data = {
        usuario: usuario.value,
        contrasenia: contrasenia.value
    }

    console.log(data)
    if(data.usuario=='admin'&&data.contrasenia=='pass123'){
        window.location.href = '../../views/admin/menu.html';
    }
    else{
        window.alert('error')
    }
})