DROP DATABASE IF EXISTS ivaneDB;

CREATE DATABASE IF NOT EXISTS ivaneDB;

USE ivaneDB;

-- Creacion de tablas
-- Creacion de tabla tb_clientes------
CREATE TABLE tb_clientes (
  id_cliente int auto_increment primary key,
  nombre_cliente VARCHAR(50) NOT NULL,
  apellido_cliente VARCHAR(50) NOT NULL,
  telefono_cliente VARCHAR(10) NOT NULL,
  residencia_cliente VARCHAR(500) NOT NULL,
  alias_cliente varchar(50) UNIQUE NOT NULL,
  correo_cliente VARCHAR(50) UNIQUE NOT NULL,
  pass_cliente VARCHAR(100) NOT NULL,
  imagen_cliente varchar(50),
  estado_cliente BOOLEAN NOT NULL
);

-- Creacion de tabla tb_administradores
CREATE TABLE tb_administradores (
  id_admin int auto_increment primary key,
  nombre_admin VARCHAR(50) NOT NULL,
  apellido_admin VARCHAR(50) NOT NULL,
  correo_admin VARCHAR(50) UNIQUE NOT NULL,
  telefono_admin VARCHAR(10) UNIQUE NOT NULL,
  numero_emerjencia_admin VARCHAR(10) UNIQUE NOT NULL,
  DUI_admin VARCHAR(11) UNIQUE NOT NULL,
  alias_admin VARCHAR(50) UNIQUE NOT NULL,
  pass_admin VARCHAR(500) UNIQUE NOT NULL
);

SELECT
  *
FROM
  tb_clientes;

-- insercion de datos de ejemplo 
-- Creacion de tabla tb_categorias_productos
CREATE TABLE tb_categorias_productos (
  id_categoria_producto int auto_increment primary key,
  nombre_categoria_producto VARCHAR(50) UNIQUE NOT NULL,
  descripcion_categoria_producto VARCHAR(50) NOT NULL,
  imagen_categoria_producto varchar(500)
);

-- Creacion de tabla tb_marcas
CREATE TABLE tb_marcas (
  id_marca int auto_increment primary key,
  nombre_marca VARCHAR(50) UNIQUE NOT NULL,
  descripcion_marca VARCHAR(500) NOT NULL,
  imagen_marca varchar(500)
);

select
  *
from
  tb_marcas;

-- Creacion de tabla tb_productos
CREATE TABLE tb_productos (
  id_producto int auto_increment primary key,
  imagen_producto varchar(200),
  nombre_producto VARCHAR(50) NOT NULL,
  descripcion_producto VARCHAR(500) NOT NULL,
  precio_producto float NOT NULL,
  cantidad_producto int,
  id_categoria_producto int,
  CONSTRAINT fk_id_categoriaProducto FOREIGN KEY (id_categoria_producto) REFERENCES tb_categorias_productos(id_categoria_producto),
  id_admin int NOT NULL,
  CONSTRAINT fk_id_admin FOREIGN KEY (id_admin) REFERENCES tb_administradores(id_admin),
  id_marca int,
  CONSTRAINT fk_id_marca FOREIGN KEY (id_marca) REFERENCES tb_marcas(id_marca)
);

-- Creacion de tabla tb_comentarios  
CREATE TABLE tb_comentarios (
  id_comentario int auto_increment primary key,
  comentario varchar(500) NOT NULL,
  estrella int CHECK (
    estrella >= 1
    AND estrella <= 5
  ),
  id_producto int NOT NULL,
  CONSTRAINT fk_id_producto_C FOREIGN KEY (id_producto) REFERENCES tb_productos(id_producto),
  id_cliente int NOT NULL,
  CONSTRAINT fk_id_cliente_C FOREIGN KEY (id_cliente) REFERENCES tb_clientes(id_cliente),
  estado_comentario BOOLEAN,
  fecha_comentario TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Creeacion de tabla tb_listas_deseos 
CREATE TABLE tb_listas_deseos (
  id_lista_deseo int auto_increment primary key,
  id_producto int NOT NULL,
  CONSTRAINT fk_id_producto_lista FOREIGN KEY (id_producto) REFERENCES tb_productos(id_producto),
  id_cliente int,
  CONSTRAINT fk_id_cliente_lista FOREIGN KEY (id_cliente) REFERENCES tb_clientes(id_cliente)
);

-- Creacion de tabla tb_pedidos
CREATE TABLE tb_pedidos (
  id_pedido int auto_increment primary key,
  fecha_registro date NOT NULL DEFAULT current_timestamp(),
  direccion_pedido VARCHAR(500) NOT NULL,
  estado_pedido enum('Pendiente', 'Finalizado', 'Entregado', 'Anulado') NOT NULL,
  id_cliente int NOT NULL,
  CONSTRAINT fk_id_cliente_pedido FOREIGN KEY (id_cliente) REFERENCES tb_clientes(id_cliente)
);

-- Creacion de tabla tb_detalles_pedidos
CREATE TABLE tb_detalles_pedidos (
  id_detalle_entrega int auto_increment primary key,
  id_pedido int NOT NULL,
  CONSTRAINT fk_id_pedido_detalle_P FOREIGN KEY (id_pedido) REFERENCES tb_pedidos(id_pedido),
  id_producto int NOT NULL,
  CONSTRAINT fk_id_producto_detalle_P FOREIGN KEY (id_producto) REFERENCES tb_productos(id_producto),
  precio_pedido FLOAT NOT null,
  cantidad_pedido INT NOT NULL
);
-- las imagenes se cambiaron por varchar(50) en logar de LONGTEXT
-- la asignacion de autoincrement y de primary key se hacen directamente desde la creacion de la tabla y no se altera nada afuera de estas