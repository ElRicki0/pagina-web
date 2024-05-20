USE ivaneDB;

-- Solo e insertado datos en algunas tablas, falta agregar mas datos a las demas tablas

-- Inserción de datos en tb_categorias_productos
INSERT INTO tb_categorias_productos (nombre_categoria_producto, descripcion_categoria_producto, imagen_categoria_producto) VALUES
('Cuidado Facial', 'Productos para el cuidado facial', 'facial.jpg'),
('Labiales', 'Variedad de labiales para todos los gustos', 'labiales.jpg'),
('Polvos', 'Polvos compactos y sueltos para maquillaje', 'polvos.jpg'),
('Delineadores', 'Delineadores líquidos y en lápiz', 'delineadores.jpg'),
('Cuidado Corporal', 'Productos para el cuidado del cuerpo', 'corporal.jpg');

-- Inserción de datos en tb_marcas
INSERT INTO tb_marcas (nombre_marca, imagen_marca) VALUES
('Maybelline', 'maybelline.jpg'),
('L\'Oréal', 'loreal.jpg'),
('MAC Cosmetics', 'mac.jpg'),
('NYX Professional Makeup', 'nyx.jpg'),
('Revlon', 'revlon.jpg');

-- Inserción de datos en tb_productos
INSERT INTO tb_productos (nombre_producto, descripcion_producto, precio_producto, cantidad_producto, id_categoria_producto, id_admin, id_marca)
VALUES
('Crema Hidratante', 'Crema facial hidratante para todo tipo de piel', 15.99, 100, 1, 1, 1),
('Labial Rojo Intenso', 'Labial de larga duración en tono rojo intenso', 9.99, 50, 2, 1, 4),
('Polvo Compacto Matificante', 'Polvo compacto que matifica la piel y controla el brillo', 12.50, 80, 3, 1, 3),
('Delineador Líquido Negro', 'Delineador líquido de punta fina para un trazo preciso', 8.50, 60, 4, 1, 2),
('Mascarilla Facial Purificante', 'Mascarilla facial purificante con arcilla', 18.99, 30, 1, 1, 5);

-- Inserción de datos en tb_comentarios
INSERT INTO tb_comentarios (comentario, id_producto, id_cliente, estado_comentario) VALUES
('¡Me encanta esta crema hidratante!', 1, 1, 1),
('El labial es hermoso y dura todo el día', 2, 2, 1),
('El polvo compacto deja mi piel suave y sin brillo', 3, 3, 1),
('El delineador se seca rápido y no se corre', 4, 1, 1),
('La mascarilla deja mi piel fresca y radiante', 5, 2, 1);



	-- Insertar un nuevo pedido
	INSERT INTO tb_pedidos (fecha_pedido, direccion_pedido, id_cliente)
	VALUES ('2024-05-20', '123 Calle Falsa, Ciudad Ejemplo', 1);
	
	-- Asumimos que el id_pedido generado es 1 para el siguiente paso
	INSERT INTO tb_detalles_pedidos (id_pedido, id_producto, precio_pedido, cantidad_pedido, estado_pedido)
	VALUES (1, 1, 19.99, 2, 1);  -- Estado del pedido 1, puede ser cambiado a 0 si está inactivo o cancelado
	
	SELECT * FROM tb_detalles_pedidos

