CREATE TABLE `tb_clientes` (
  `id_cliente` INT PRIMARY KEY AUTO_INCREMENT,
  `nombre_cliente` VARCHAR(50) UNIQUE NOT NULL,
  `apellido_cliente` VARCHAR(50) NOT NULL,
  `telefono_cliente` INT NOT NULL,
  `residencia_cliente` VARCHAR(500) NOT NULL,
  `usuario_cliente` varchar(50) UNIQUE NOT NULL,
  `correo_cliente` VARCHAR(50) UNIQUE NOT NULL,
  `pass_correo_cliente` VARCHAR(50) NOT NULL,
  `imagen_cliente` varchar(500) NOT NULL,
  `estado_cliente` ENUM ('conectado', 'desconectado', 'inutilizable', 'baneado') NOT NULL
);

CREATE TABLE `tb_niveles_empleados` (
  `id_nivel_empleado` INT PRIMARY KEY AUTO_INCREMENT,
  `nombre_nivel_empleado` VARCHAR(50) UNIQUE NOT NULL,
  `descripcion_nivel_empleado` VARCHAR(500) NOT NULL
);

CREATE TABLE `tb_niveles_usuarios` (
  `id_nivel_usuario` INT PRIMARY KEY AUTO_INCREMENT,
  `nombre_nivel_usuario` VARCHAR(50) UNIQUE NOT NULL,
  `descripcion_nivel_usuario` VARCHAR(500) NOT NULL
);

CREATE TABLE `tb_empleados` (
  `id_empleado` INT PRIMARY KEY AUTO_INCREMENT,
  `nombre_empleado` VARCHAR(50) NOT NULL,
  `apellido_empleado` VARCHAR(50) NOT NULL,
  `correo_empleado` VARCHAR(50) UNIQUE NOT NULL,
  `DUI_empleado` INT UNIQUE NOT NULL,
  `telefono_empleado` VARCHAR(10) UNIQUE NOT NULL,
  `numero_emerjencia_empleado` VARCHAR(10) UNIQUE NOT NULL,
  `contacto_emerjencia_empleado` VARCHAR(50) UNIQUE NOT NULL,
  `image_empleado` VARCHAR(50) NOT NULL,
  `id_nivele_emp` INT NOT NULL,
  `nombre_usuario_empleado` VARCHAR(50) UNIQUE NOT NULL,
  `pass_usuario_empleado` VARCHAR(5000) UNIQUE NOT NULL,
  `id_nivele_usu` INT,
  `imagen_usuario` VARCHAR(50),
  `estado_cliente` ENUM ('conectado', 'desconectado', 'inutilizable', 'baneado') NOT NULL
);

CREATE TABLE `tb_categorias_productos` (
  `id_categoria_producto` INT PRIMARY KEY AUTO_INCREMENT,
  `nombre_categoria_producto` VARCHAR(50) UNIQUE NOT NULL,
  `descripcion_categoria_producto` VARCHAR(50) NOT NULL,
  `imagen_categoria_producto` VARCHAR(50)
);

CREATE TABLE `tb_marcas` (
  `id_marca` INT PRIMARY KEY AUTO_INCREMENT,
  `nombre_marca` VARCHAR(50) UNIQUE NOT NULL,
  `imagen_marca` VARCHAR(100)
);

CREATE TABLE `tb_productos` (
  `id_producto` INT PRIMARY KEY AUTO_INCREMENT,
  `nombre_producto` VARCHAR(50) NOT NULL,
  `descripcion_producto` VARCHAR(500) NOT NULL,
  `precio_producto` float NOT NULL,
  `id_categoria_producto` INT,
  `id_empleado` INT,
  `id_marca` INT
);

CREATE TABLE `tb_resenia` (
  `id_resenia` int PRIMARY KEY AUTO_INCREMENT,
  `estrella` decimal(5,2),
  `id_producto` int
);

CREATE TABLE `tb_comentarios` (
  `id_comentario` int PRIMARY KEY AUTO_INCREMENT,
  `comentario` varchar(500) NOT NULL,
  `id_producto` int,
  `id_cliente` INT
);

CREATE TABLE `tb_listas_deseos` (
  `id_lista_deseo` INT PRIMARY KEY AUTO_INCREMENT,
  `id_producto` INT,
  `id_cliente` INT
);

CREATE TABLE `tb_carritos_cliente` (
  `id_carrito_cliente` INT PRIMARY KEY AUTO_INCREMENT,
  `id_cliente` INT
);

CREATE TABLE `tb_carritos_productos` (
  `id_carrito_productos` INT PRIMARY KEY AUTO_INCREMENT,
  `id_carrito_cliente` INT,
  `id_producto` INT,
  `cantidad` INT,
  `precio_productos` FLOAT
);

CREATE TABLE `tb_pedidos` (
  `id_pedido` INT PRIMARY KEY AUTO_INCREMENT,
  `id_carrito_productos` INT,
  `fecha_pedido` DATE NOT NULL,
  `estado_pedido` ENUM ('pendiente', 'en_proceso', 'entregado', 'cancelado') NOT NULL,
  `direccion_pedido` VARCHAR(500) NOT NULL
);

CREATE TABLE `tb_imagenes` (
  `id_imagene` INT PRIMARY KEY AUTO_INCREMENT,
  `codigo_imagenes` VARCHAR(200),
  `id_producto` INT
);

CREATE TABLE `tb_detalles_pedidos` (
  `id_detalle_entrega` INT PRIMARY KEY AUTO_INCREMENT,
  `id_pedido` INT,
  `id_producto` INT,
  `precio_pedido` float,
  `cantidad_pedido` INT
);

ALTER TABLE `tb_empleados` ADD FOREIGN KEY (`id_nivele_emp`) REFERENCES `tb_niveles_empleados` (`id_nivel_empleado`);

ALTER TABLE `tb_empleados` ADD FOREIGN KEY (`id_nivele_usu`) REFERENCES `tb_niveles_usuarios` (`id_nivel_usuario`);

ALTER TABLE `tb_productos` ADD FOREIGN KEY (`id_categoria_producto`) REFERENCES `tb_categorias_productos` (`id_categoria_producto`);

ALTER TABLE `tb_productos` ADD FOREIGN KEY (`id_empleado`) REFERENCES `tb_empleados` (`id_empleado`);

ALTER TABLE `tb_productos` ADD FOREIGN KEY (`id_marca`) REFERENCES `tb_marcas` (`id_marca`);

ALTER TABLE `tb_resenia` ADD FOREIGN KEY (`id_producto`) REFERENCES `tb_productos` (`id_producto`);

ALTER TABLE `tb_comentarios` ADD FOREIGN KEY (`id_producto`) REFERENCES `tb_productos` (`id_producto`);

ALTER TABLE `tb_comentarios` ADD FOREIGN KEY (`id_cliente`) REFERENCES `tb_clientes` (`id_cliente`);

ALTER TABLE `tb_listas_deseos` ADD FOREIGN KEY (`id_producto`) REFERENCES `tb_productos` (`id_producto`);

ALTER TABLE `tb_listas_deseos` ADD FOREIGN KEY (`id_cliente`) REFERENCES `tb_clientes` (`id_cliente`);

ALTER TABLE `tb_carritos_cliente` ADD FOREIGN KEY (`id_cliente`) REFERENCES `tb_clientes` (`id_cliente`);

ALTER TABLE `tb_carritos_productos` ADD FOREIGN KEY (`id_carrito_cliente`) REFERENCES `tb_carritos_cliente` (`id_carrito_cliente`);

ALTER TABLE `tb_carritos_productos` ADD FOREIGN KEY (`id_producto`) REFERENCES `tb_productos` (`id_producto`);

ALTER TABLE `tb_pedidos` ADD FOREIGN KEY (`id_carrito_productos`) REFERENCES `tb_carritos_productos` (`id_carrito_productos`);

ALTER TABLE `tb_imagenes` ADD FOREIGN KEY (`id_producto`) REFERENCES `tb_productos` (`id_producto`);

ALTER TABLE `tb_detalles_pedidos` ADD FOREIGN KEY (`id_pedido`) REFERENCES `tb_pedidos` (`id_pedido`);

ALTER TABLE `tb_detalles_pedidos` ADD FOREIGN KEY (`id_producto`) REFERENCES `tb_productos` (`id_producto`);
