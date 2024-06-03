
// Codigo para tener el header, para luego mandarlo a llamar
const header = document.querySelector("header");

header.innerHTML = `<nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top">
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
                    <a class="navbar-brand align-items-right" href="#"><img src="../../resources/img/logo.png"
                            width="60px"></a>
                    <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" aria-current="page" href="" role="button"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    Productos
                </a>
                <ul class="dropdown-menu">
                            <li><a class="dropdown-item" aria-current="page"
                                href="../../views/public/index.html">Productos</a></li>
                            <li><a class="dropdown-item" aria-current="page"
                                href="../../views/public/marca.html">Marcas</a></li>
                            <li><a class="dropdown-item" aria-current="page"
                                href="../../views/public/categoria.html">Categorias</a></li>
                        </ul>
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="../../views/public/contactos.html">Contactos</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="../../views/public/historia.html">Sobre nosotros</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="iconoder col-5 d-flex">
            <ul class="navbar-nav ms-auto align-items-right flex-row" style="align-items: flex-end;">
                <button class="corazon rounded border border-dark" type="button" data-bs-toggle="modal"
                    data-bs-target="#perfil">
                    <a class="nav-link active" aria-current="page"
                        href="../../views/public/lista_deseo.html">
                    <svg xmlns="http://www.w3.org/2000/svg" width="55" height="60" fill="#ffffff"
                        class="bi bi-heart" viewBox="0 0 16 16">
                        <path
                            d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                    </svg>
                </button>
                <button class="corazon rounded border border-dark" type="button" data-bs-toggle="modal"
                    data-bs-target="#perfil">
                    <a class="nav-link active" aria-current="page"
                        href="../../views/public/carrito_compra.html">
                        <svg xmlns="http://www.w3.org/2000/svg" width="55" height="60" fill="#ffffff"
                            class="bi bi-cart mx-3" viewBox="0 0 16 16">
                            <path
                                d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                        </svg>
                    </a>
                </button>
                <button class="corazon rounded border border-dark" type="button" data-bs-toggle="modal"
                data-bs-target="#perfil">
                <a class="nav-link active" aria-current="page"
                    href="../../views/public/perfil_cliente.html">
                    <img class="tamañoImagenPerfil rounded-circle" src="../../resources/img/iconoPerfil.jpg"
                        alt="" width="55px" height="55">
                </a>
                </button>
                </ul>
        </div>
    </div>
</div>
</nav>`







