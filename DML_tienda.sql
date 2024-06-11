USE ivaneDB;

-- Solo e insertado datos en algunas tablas, falta agregar mas datos a las demas tablas

-- Inserción de datos en tb_clientes
INSERT INTO tb_clientes (nombre_cliente, apellido_cliente, telefono_cliente, residencia_cliente, alias_cliente, correo_cliente, pass_cliente, imagen_cliente, estado_cliente) VALUES
('Juan', 'Pérez', 1234567890, 'Calle Falsa 123, Ciudad A', 'jperez', 'juan.perez@example.com', 'pass1234', 'juan.jpg', 1),
('Ana', 'García', 9876543210, 'Avenida Siempre Viva 742, Ciudad B', 'agarcia', 'ana.garcia@example.com', 'pass5678', 'ana.jpg', 0),
('Carlos', 'Ramírez', 5551234567, 'Boulevard de los Sueños Rotos 12, Ciudad C', 'cramirez', 'carlos.ramirez@example.com', 'passabcd', 'carlos.jpg', 1),
('María', 'López', 4449876543, 'Calle de la Amargura 456, Ciudad D', 'mlopez', 'maria.lopez@example.com', 'passwxyz', 'maria.jpg', 0),
('Pedro', 'Martínez', 6665554443, 'Avenida Libertad 987, Ciudad E', 'pmartinez', 'pedro.martinez@example.com', 'pass123abc', 'pedro.jpg', 1),
('Luisa', 'Hernández', 7778889990, 'Callejón del Beso 32, Ciudad F', 'lhernandez', 'luisa.hernandez@example.com', 'pass456def', 'luisa.jpg', 0),
('Miguel', 'Torres', 8887776665, 'Paseo de la Reforma 100, Ciudad G', 'mtorres', 'miguel.torres@example.com', 'pass789ghi', 'miguel.jpg', 1),
('Sofía', 'Flores', 9998887774, 'Carrera Séptima 33, Ciudad H', 'sflores', 'sofia.flores@example.com', 'pass321jkl', 'sofia.jpg', 0),
('Diego', 'Gómez', 2223334445, 'Camino Real 21, Ciudad I', 'dgomez', 'diego.gomez@example.com', 'pass654mno', 'diego.jpg', 1),
('Elena', 'Jiménez', 1112223336, 'Ruta del Sol 45, Ciudad J', 'ejimenez', 'elena.jimenez@example.com', 'pass987pqr', 'elena.jpg', 0);


-- Inserción de datos en tb_categorias_productos
INSERT INTO tb_categorias_productos (nombre_categoria_producto, descripcion_categoria_producto, imagen_categoria_producto) VALUES
('Cuidado Facial', 'Productos para el cuidado facial', 'facial.jpg'),
('Labiales', 'Variedad de labiales para todos los gustos', 'labiales.jpg'),
('Polvos', 'Polvos compactos y sueltos para maquillaje', 'polvos.jpg'),
('Delineadores', 'Delineadores líquidos y en lápiz', 'delineadores.jpg'),
('Cuidado Corporal', 'Productos para el cuidado del cuerpo', 'corporal.jpg'),
('Sombras de Ojos', 'Paletas de sombras para resaltar tu mirada', 'sombras.jpg'),
('Máscaras de Pestañas', 'Máscaras de pestañas para dar volumen y longitud', 'mascaras.jpg'),
('Correctores', 'Correctores líquidos y en barra para cubrir imperfecciones', 'correctores.jpg'),
('Bases de Maquillaje', 'Bases líquidas, en polvo y en crema para unificar el tono de la piel', 'bases.jpg'),
('Brochas y Pinceles', 'Brochas y pinceles profesionales para un maquillaje perfecto', 'brochas.jpg');

-- Inserción de datos en tb_marcas
INSERT INTO tb_marcas (nombre_marca, descripcion_marca, imagen_marca) VALUES
('Maybelline', 'Marca reconocida por su amplia gama de productos de maquillaje a precios accesibles.', 'maybelline.jpg'),
('L\'Oréal', 'Una de las marcas de belleza más grandes y conocidas del mundo, ofrece productos de alta calidad.', 'loreal.jpg'),
('MAC Cosmetics', 'Marca profesional de maquillaje conocida por su amplia gama de colores y productos innovadores.', 'mac.jpg'),
('NYX Professional Makeup', 'Marca que ofrece productos de maquillaje de calidad profesional a precios accesibles.', 'nyx.jpg'),
('Revlon', 'Marca icónica en el mundo de la belleza, conocida por sus productos innovadores y de calidad.', 'revlon.jpg'),
('Estée Lauder', 'Marca de lujo que ofrece una amplia gama de productos de belleza y cuidado de la piel.', 'estee_lauder.jpg'),
('Clinique', 'Marca conocida por sus productos dermatológicamente probados y sus soluciones para el cuidado de la piel.', 'clinique.jpg'),
('Urban Decay', 'Marca famosa por sus productos atrevidos y de alta pigmentación, especialmente sus paletas de sombras.', 'urban_decay.jpg'),
('Sephora', 'Retailer que ofrece una amplia variedad de marcas y productos de belleza, además de su propia línea de productos.', 'sephora.jpg'),
('NARS', 'Marca conocida por sus productos de alta calidad y sus icónicos nombres de tonos.', 'nars.jpg');


-- Inserción de datos en tb_productos
INSERT INTO tb_productos (nombre_producto, descripcion_producto, precio_producto, cantidad_producto, id_categoria_producto, id_admin, id_marca)
VALUES
('Crema Hidratante', 'Crema facial hidratante para todo tipo de piel', 15.99, 100, 1, 1, 1),
('Labial Rojo Intenso', 'Labial de larga duración en tono rojo intenso', 9.99, 50, 2, 1, 4),
('Polvo Compacto Matificante', 'Polvo compacto que matifica la piel y controla el brillo', 12.50, 80, 3, 1, 3),
('Delineador Líquido Negro', 'Delineador líquido de punta fina para un trazo preciso', 8.50, 60, 4, 1, 2),
('Mascarilla Facial Purificante', 'Mascarilla facial purificante con arcilla', 18.99, 30, 1, 1, 5),
('Paleta de Sombras Nude', 'Paleta de sombras en tonos nude para un look natural', 22.99, 40, 1, 1, 4),
('Máscara de Pestañas Volumen', 'Máscara de pestañas que da volumen y longitud', 14.99, 75, 2, 1, 2),
('Corrector Líquido Alta Cobertura', 'Corrector líquido de alta cobertura para imperfecciones', 10.99, 100, 3, 1, 3),
('Base de Maquillaje Mate', 'Base de maquillaje con acabado mate y larga duración', 19.99, 50, 4, 1, 1),
('Set de Brochas Profesional', 'Set de brochas profesional para aplicación de maquillaje', 29.99, 25, 5, 1, 5);


-- Inserción de datos en tb_listas_deseos
INSERT INTO tb_listas_deseos (id_producto, id_cliente) VALUES
(1, 1), -- Crema Hidratante agregada a la lista de deseos de Juan
(2, 2), -- Labial Rojo Intenso agregado a la lista de deseos de Ana
(3, 3), -- Polvo Compacto Matificante agregado a la lista de deseos de Carlos
(4, 4), -- Delineador Líquido Negro agregado a la lista de deseos de María
(5, 5), -- Mascarilla Facial Purificante agregada a la lista de deseos de Pedro
(6, 1), -- Paleta de Sombras Nude agregada a la lista de deseos de Juan
(7, 2), -- Máscara de Pestañas Volumen agregada a la lista de deseos de Ana
(8, 3), -- Corrector Líquido Alta Cobertura agregado a la lista de deseos de Carlos
(9, 4), -- Base de Maquillaje Mate agregada a la lista de deseos de María
(10, 5), -- Set de Brochas Profesional agregado a la lista de deseos de Pedro
(1, 6), -- Crema Hidratante agregada a la lista de deseos de Luisa
(2, 7), -- Labial Rojo Intenso agregado a la lista de deseos de Miguel
(3, 1), -- Polvo Compacto Matificante agregado a la lista de deseos de Sofía
(4, 2), -- Delineador Líquido Negro agregado a la lista de deseos de Diego
(5, 3); -- Mascarilla Facial Purificante agregada a la lista de deseos de Elena


-- Inserción de datos en tb_pedidos
INSERT INTO tb_pedidos (fecha_pedido, direccion_pedido, id_cliente) VALUES
('2024-05-01', 'Calle Principal 123, Ciudad A', 1), -- Pedido de Juan el 1 de mayo de 2024
('2024-05-02', 'Avenida Central 456, Ciudad B', 2), -- Pedido de Ana el 2 de mayo de 2024
('2024-05-03', 'Boulevard Secundario 789, Ciudad C', 3), -- Pedido de Carlos el 3 de mayo de 2024
('2024-05-04', 'Plaza Principal 321, Ciudad D', 4), -- Pedido de María el 4 de mayo de 2024
('2024-05-05', 'Calle Secundaria 654, Ciudad E', 5), -- Pedido de Pedro el 5 de mayo de 2024
('2024-05-06', 'Avenida Principal 987, Ciudad F', 6), -- Pedido de Luisa el 6 de mayo de 2024
('2024-05-07', 'Boulevard Central 234, Ciudad G', 7), -- Pedido de Miguel el 7 de mayo de 2024
('2024-05-08', 'Calle Central 567, Ciudad H', 1), -- Pedido de Juan el 8 de mayo de 2024
('2024-05-09', 'Avenida Principal 890, Ciudad I', 2), -- Pedido de Ana el 9 de mayo de 2024
('2024-05-10', 'Boulevard Principal 123, Ciudad J', 3), -- Pedido de Carlos el 10 de mayo de 2024
('2024-05-11', 'Calle Central 456, Ciudad K', 4), -- Pedido de María el 11 de mayo de 2024
('2024-05-12', 'Avenida Principal 789, Ciudad L', 5), -- Pedido de Pedro el 12 de mayo de 2024
('2024-05-13', 'Boulevard Secundario 321, Ciudad M', 6), -- Pedido de Luisa el 13 de mayo de 2024
('2024-05-14', 'Plaza Principal 654, Ciudad N', 7), -- Pedido de Miguel el 14 de mayo de 2024
('2024-05-15', 'Calle Principal 987, Ciudad O', 8); -- Pedido de Sofía el 15 de mayo de 2024




-- Inserción de datos en tb_comentarios
INSERT INTO tb_comentarios (comentario, estrella, id_producto, id_cliente, estado_comentario, fecha_comentario) VALUES
('¡Me encanta esta crema hidratante!', 5, 1, 1, 1, '2024-05-01'),
('El labial es hermoso y dura todo el día', 4, 2, 2, 1, '2024-05-02'),
('El polvo compacto deja mi piel suave y sin brillo', 5, 3, 3, 1, '2024-05-03'),
('El delineador se seca rápido y no se corre', 4, 4, 1, 1, '2024-05-04'),
('La mascarilla deja mi piel fresca y radiante', 5, 5, 2, 1, '2024-05-05'),
('La paleta de sombras tiene una pigmentación increíble', 5, 6, 3, 1, '2024-05-06'),
('La máscara de pestañas es mi favorita, da mucho volumen', 5, 7, 4, 1, '2024-05-07'),
('El corrector cubre muy bien las ojeras', 4, 8, 5, 1, '2024-05-08'),
('La base de maquillaje deja un acabado impecable', 5, 9, 6, 1, '2024-05-09'),
('Las brochas son suaves y fáciles de usar', 5, 10, 7, 1, '2024-05-10');

-- Inserción de datos en tb_detalles_pedidos
INSERT INTO tb_detalles_pedidos (id_pedido, id_producto, precio_pedido, cantidad_pedido, estado_pedido) VALUES
(1, 1, 15.99, 2, 1), -- Detalle del pedido 1: 2 unidades de Crema Hidratante para Juan
(2, 2, 9.99, 1, 1), -- Detalle del pedido 2: 1 unidad de Labial Rojo Intenso para Ana
(3, 3, 12.50, 3, 1), -- Detalle del pedido 3: 3 unidades de Polvo Compacto Matificante para Carlos
(4, 4, 8.50, 1, 1), -- Detalle del pedido 4: 1 unidad de Delineador Líquido Negro para María
(5, 5, 18.99, 2, 1), -- Detalle del pedido 5: 2 unidades de Mascarilla Facial Purificante para Pedro
(6, 6, 22.99, 1, 1), -- Detalle del pedido 6: 1 unidad de Paleta de Sombras Nude para Luisa
(7, 7, 14.99, 2, 1), -- Detalle del pedido 7: 2 unidades de Máscara de Pestañas Volumen para Miguel
(8, 8, 10.99, 1, 1), -- Detalle del pedido 8: 1 unidad de Corrector Líquido Alta Cobertura para Sofía
(9, 9, 19.99, 1, 1), -- Detalle del pedido 9: 1 unidad de Base de Maquillaje Mate para Juan
(10, 10, 29.99, 1, 1), -- Detalle del pedido 10: 1 unidad de Set de Brochas Profesional para Ana
(11, 1, 15.99, 3, 1), -- Detalle del pedido 11: 3 unidades de Crema Hidratante para Carlos
(12, 2, 9.99, 1, 1), -- Detalle del pedido 12: 1 unidad de Labial Rojo Intenso para María
(13, 3, 12.50, 2, 1), -- Detalle del pedido 13: 2 unidades de Polvo Compacto Matificante para Pedro
(14, 4, 8.50, 1, 1), -- Detalle del pedido 14: 1 unidad de Delineador Líquido Negro para Luisa
(15, 5, 18.99, 2, 1); -- Detalle del pedido 15: 2 unidades de Mascarilla Facial Purificante para Miguel
	
	SELECT * FROM tb_detalles_pedidos

