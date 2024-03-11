
const header = document.querySelector("header");

header.innerHTML = `<nav class="navbar navbar-expand-lg bg-body-tertiary">
<div class="mb-6 xs-6 xl-6 col-12">
    <div class="row marcos">
        <div class="col-6">
            <button class="boton navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                aria-expanded="false" aria-label="Alternar navegación">
                <span class="navbar-toggler-icon "></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav  mb-2 mb-lg-0">
                    <a class="navbar-brand align-items-right" href="#"><img src="../../resources/img/logo.png" width="60px"></a>
                    <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" aria-current="page" href="" role="button"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        Productos
                    </a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" aria-current="page" href="">Productos</a></li>
                        <li><a class="dropdown-item" aria-current="page" href="">Categorias</a></li>
                        <li><a class="dropdown-item" aria-current="page" href="">Marcas</a></li>
                    </ul>
                </li>
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="">Contactanos</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="">Sobre nosotros</a>
                    </li>
                    <form class="busqueda" role="search">
                        <input class="form-control me-10" type="search" placeholder="Buscar..." aria-label="Search"> 
                </ul>
            </div>
        </div>
        <div class="iconoder col-5 d-flex">
            <ul class="navbar-nav ms-auto align-items-right flex-row" style="align-items: flex-end;">
                <button class="corazon rounded border border-dark" type="button" data-bs-toggle="modal"
                    data-bs-target="#perfil">
                    <img class="" src="../../resources/img/corazon.png"" alt="" width="60px">
                </button>
                <button class="corazon rounded border border-dark" type="button" data-bs-toggle="modal"
                    data-bs-target="#perfil">
                    <img class="" src="../../resources/img/carrito.png" alt="" width="60px">
                </button>
                <button class="corazon rounded border border-dark" type="button" data-bs-toggle="modal"
                    data-bs-target="#perfil">
                    <img class="tamañoImagenPerfil rounded-circle" src="../../resources/img/iconoPerfil.jpg" alt="" width="60px">
                </button>
            </ul>
        </div>
    </div>
</div>
</nav>`