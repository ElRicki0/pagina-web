const usuario       = document.getElementById('usuario');
const contrasenia   = document.getElementById('contrasenia');
const btn_inicio    = document.getElementById('btn_inicio');

btn_inicio.addEventListener('click', (e)=>{
    e.preventDefault();
    const data = {
        usuario: usuario.value,
        contrasenia: contrasenia.value
    }

    console.log(data)
    if(data.usuario=='admin'&&data.contrasenia=='pass123'){
        window.location.href = '../../views/admin/principal.html';
    }
    else{
        window.alert('error')
    }
})