const footer = document.querySelector("footer");

footer.innerHTML = `<div class="social-icons-container ">
<a href="https://twitter.com/?lang=es" class="social-icons"></a>
<a href="https://www.instagram.com/" class="social-icons"></a>
<a href="https://mail.google.com/" class="social-icons"></a>
<a href="https://www.facebook.com/" class="social-icons"></a>
</div>  
<ul class="footer-menu-conteiner">
</ul>
<span class="copyright">&copy;2024, IVANE CARE. All rights reserved</span>`

const header = document.querySelector("header");

header.innerHTML = `<nav class="navbar navbar-expand-lg bg-body-tertiary">
<div class="mb-6 xs-6 xl-6 col-12">
    <div class="row">
        <div class="col-6">
            <button class="boton navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                aria-expanded="false" aria-label="Alternar navegación">
                <span class="navbar-toggler-icon "></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav  mb-2 mb-lg-0">
                    <a class="navbar-brand align-items-right"
                        href="https://www.instagram.com/ivanecare/"><img src="../../resources/img/logo.png"
                            width="60px"></a>
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Productos</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Usuarios</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Lista de Pedidos</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="iconoder col-5 d-flex">
            <ul class="navbar-nav ms-auto align-items-right" style="align-items: flex-end;">
                <button class="rounded-circle border border-dark" type="button" data-bs-toggle="modal" data-bs-target="#perfil">
                    <img class="tamañoImagenPerfil rounded-circle" src="../../resources/img/iconoPerfil.jpg" alt="" width="60px">
                </button>   
            </ul>
        </div>
    </div>
</div>
</nav>`
