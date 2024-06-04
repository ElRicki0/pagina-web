/*
*   Controlador es de uso general en las páginas web del sitio público.
*   Sirve para manejar las plantillas del encabezado y pie del documento.
*/

// Constante para completar la ruta de la API.
const USER_API = 'services/public/cliente.php';
// Constante para establecer el elemento del contenido principal.
const MAIN = document.querySelector('main');
MAIN.style.paddingTop = '75px';
MAIN.style.paddingBottom = '100px';
MAIN.classList.add('container');
// Se establece el título de la página web.
document.querySelector('title').textContent = 'IvaneCare - Store';
// Constante para establecer el elemento del título principal.
const MAIN_TITLE = document.getElementById('mainTitle');

/*  Función asíncrona para cargar el encabezado y pie del documento.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const loadTemplate = async () => {
    // Petición para obtener en nombre del usuario que ha iniciado sesión.
    const DATA = await fetchData(USER_API, 'getUser');
    // Se comprueba si el usuario está autenticado para establecer el encabezado respectivo.
    if (DATA.session) {
        // Se verifica si la página web no es el inicio de sesión, de lo contrario se direcciona a la página web principal.
        if (!location.pathname.endsWith('inicio_sesion.html')) {
            // Se agrega el encabezado de la página web antes del contenido principal.
            MAIN.insertAdjacentHTML('beforebegin', `
            <nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top">
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
                        <a class="nav-link active" aria-current="page" href="../../views/public/buscador.html">
                            <img src="../../resources/img/lupa.png" alt="..." width="70px">
                    </button>
                    <button class="corazon rounded border border-dark" type="button" data-bs-toggle="modal"
                        data-bs-target="#perfil">
                        <a class="nav-link active" aria-current="page" href="../../views/public/lista_deseo.html">
                            <svg xmlns="http://www.w3.org/2000/svg" width="55" height="60" fill="#ffffff"
                                class="bi bi-heart" viewBox="0 0 16 16">
                                <path
                                    d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                            </svg>
                    </button>
                    <button class="corazon rounded border border-dark" type="button" data-bs-toggle="modal"
                        data-bs-target="#perfil">
                        <a class="nav-link active" aria-current="page" href="../../views/public/carrito_compra.html">
                            <svg xmlns="http://www.w3.org/2000/svg" width="55" height="60" fill="#ffffff"
                                class="bi bi-cart mx-3" viewBox="0 0 16 16">
                                <path
                                    d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                            </svg>
                        </a>
                    </button>
                            <div class="ml-auto d-flex align-items-center">
                            <div class="nav-item dropdown">
                                <ul class="dropdown-menu" aria-labelledby="cuentaDropdown">
                                    <li><a class="dropdown-item" href="perfil_cliente.html">Editar perfil</a></li>
                                    <li><hr class="dropdown-divider"></li>
                                    <li><a class="dropdown-item" href="#" onclick="logOut()">Cerrar sesión</a></li>
                                </ul>
                                <button class="dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img class="rounded-circle" src="../../resources/img/iconoPerfil.jpg" alt="" width="60px">
                                </button>
                            </div>
                        </div>
                            </ul>
                    </div>
                </div>
            </div>
            </nav>
            `);
        } else {
            location.href = 'index.html';
        }
    } else {
        // Se agrega el encabezado de la página web antes del contenido principal.
        MAIN.insertAdjacentHTML('beforebegin', `
           <nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top">
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
                <a class="nav-link active" aria-current="page" href="../../views/public/buscador.html">
                    <img src="../../resources/img/lupa.png" alt="..." width="70px">
            </button>
            <button class="corazon rounded border border-dark" type="button" data-bs-toggle="modal"
                data-bs-target="#perfil">
                <a class="nav-link active" aria-current="page" href="../../views/public/lista_deseo.html">
                    <svg xmlns="http://www.w3.org/2000/svg" width="55" height="60" fill="#ffffff"
                        class="bi bi-heart" viewBox="0 0 16 16">
                        <path
                            d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                    </svg>
            </button>
            <button class="corazon rounded border border-dark" type="button" data-bs-toggle="modal"
                data-bs-target="#perfil">
                <a class="nav-link active" aria-current="page" href="../../views/public/carrito_compra.html">
                    <svg xmlns="http://www.w3.org/2000/svg" width="55" height="60" fill="#ffffff"
                        class="bi bi-cart mx-3" viewBox="0 0 16 16">
                        <path
                            d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                    </svg>
                </a>
            </button>
                <div class="ml-auto d-flex align-items-center">
                <div class="nav-item dropdown">
                    <ul class="dropdown-menu" aria-labelledby="cuentaDropdown">
                        <li><a class="dropdown-item" href="registro_cliente.html">Crear cuenta</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="inicio_sesion.html">Iniciar sesión</a></li>
                    </ul>
                    <button class="dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                        <img class="rounded-circle" src="../../resources/img/iconoPerfil.jpg" alt="" width="60px">
                    </button>
                </div>
            </div>
                </ul>
        </div>
    </div>
</div>
</nav>
        `);
    }
    // Se agrega el pie de la página web después del contenido principal.
    MAIN.insertAdjacentHTML('afterend', `
    <footer>
    <div class="social-icons-container ">
    <a href="https://www.instagram.com/ivanecare?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" class="social-icons"></a>
    <a href="https://www.threads.net/@ivanecare" target="_blank" class="social-icons"></a>
    <a href="https://www.facebook.com/profile.php?id=61556911452120" target="_blank" class="social-icons"></a>
</div>
<ul class="footer-menu-conteiner">
</ul>
<span class="copyright">&copy;2024, IVANE CARE. All rights reserved</span>
</footer>
`);}