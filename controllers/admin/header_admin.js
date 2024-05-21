
// Codigo para tener el header, para luego mandarlo a llamar

const header = document.querySelector("header");

header.innerHTML = `
<nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
        <a class="navbar-brand" href="#"><img src="../../resources/img/logo.png" width="60px"></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <!-- Agrega tu SVG personalizado aquí -->
            <svg xmlns="http://www.w3.org/2000/svg" width="59" height="55" fill="#FFFFFF" class="bi bi-card-list" viewBox="0 0 16 16">
                <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z"/>
                <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8m0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0M4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"/>
            </svg>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 flex-wrap justify-content-end">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Productos</a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="../../views/admin/productos.html">Productos</a></li>
                        <li><a class="dropdown-item" href="../../views/admin/categoria.html">Categorias</a></li>
                        <li><a class="dropdown-item" href="../../views/admin/marca.html">Marcas</a></li>
                    </ul>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Usuarios</a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="../../views/admin/usuarios_clientes.html">Usuarios clientes</a></li>
                        <li><a class="dropdown-item" href="../../views/admin/usuarios_empleados.html">Usuarios Empleados</a></li>
                    </ul>
                </li>
                <li class="nav-item">
                    <a class="nav-link active" href="../../views/admin/pedidos.html">Lista de Pedidos</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active" href="../../views/admin/comentarios.html">Comentarios</a>
                </li>
            </ul>
            <div class="ml-auto d-flex align-items-center">
                <div class="nav-item dropdown">
                    <ul class="dropdown-menu" aria-labelledby="cuentaDropdown">
                        <li><a class="dropdown-item" href="perfil.html">Editar perfil</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#" onclick="logOut()">Cerrar sesión</a></li>
                    </ul>
                    <button class="dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                        <img class="rounded-circle" src="../../resources/img/iconoPerfil.jpg" alt="" width="60px">
                    </button>
                </div>
            </div>
        </div>
    </div>
</nav>
`





