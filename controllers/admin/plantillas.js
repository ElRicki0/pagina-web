// Código para tener el footer, para luego mandarlo a llamar

const footer = document.querySelector("footer");

footer.innerHTML = `<div class="social-icons-container ">
    <a href="https://www.instagram.com/ivanecare?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" class="social-icons"></a>
    <a href="https://www.threads.net/@ivanecare" target="_blank" class="social-icons"></a>
    <a href="https://www.facebook.com/profile.php?id=61556911452120" target="_blank" class="social-icons"></a>
</div>
<ul class="footer-menu-conteiner">
</ul>
<span class="copyright">&copy;2024, IVANE CARE. All rights reserved</span>`


// Código para tener el header, para luego mandarlo a llamar

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
                        <a class="navbar-brand align-items-right" href="#"><img src="../../resources/img/logo.png"
                                width="60px"></a>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" aria-current="page"
                                href="../../views/admin/productos.html" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                Productos
                            </a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" aria-current="page"
                                        href="../../views/admin/productos.html">Productos</a></li>
                                <li><a class="dropdown-item" aria-current="page"
                                        href="../../views/admin/categoria.html">Categorias</a></li>
                                <li><a class="dropdown-item" aria-current="page"
                                        href="../../views/admin/marca.html">Marcas</a></li>
                            </ul>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" aria-current="page" href="#" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                Usuarios
                            </a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" aria-current="page"
                                        href="../../views/admin/usuarios_clientes.html">Usuarios clientes</a></li>
                                <li><a class="dropdown-item" aria-current="page"
                                        href="../../views/admin/usuarios_empleados.html">Usuarios Empleados</a></li>
                            </ul>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="../../views/admin/pedidos.html">Lista
                                de Pedidos</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="iconoder col-5 d-flex">
                <ul class="navbar-nav ms-auto align-items-right" style="align-items: flex-end;">
                    <button class="rounded-circle border border-dark" type="button" data-bs-toggle="modal"
                        data-bs-target="#perfil">
                        <a href="../../views/admin/perfil.html">
                                <img class="tamañoImagenPerfil rounded-circle" src="../../resources/img/iconoPerfil.jpg" alt=""
                                width="60px">
                            </a>
                    </button>
                </ul>
            </div>
        </div>
    </div>
</nav>`