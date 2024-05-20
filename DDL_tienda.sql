USE ivaneDB

 -- Procedimiento almacenado de estado------
DROP PROCEDURE IF EXISTS cambiar_estado_cliente;
DELIMITER $$
CREATE PROCEDURE cambiar_estado_cliente(IN cliente_id INT)
BEGIN
    DECLARE cliente_estado BOOLEAN;
    -- Obtener el estado actual del cliente
    SELECT estado_cliente INTO cliente_estado
    FROM tb_clientes
    WHERE id_cliente = cliente_id;
    -- Actualizar el estado del cliente
    IF cliente_estado = 1 THEN
        UPDATE tb_clientes
        SET estado_cliente = 0
        WHERE id_cliente = cliente_id;
    ELSE
        UPDATE tb_clientes
        SET estado_cliente = 1
        WHERE id_cliente = cliente_id;
    END IF;
END $$

-- Procedimiento almacenado de estado comentario------
DROP PROCEDURE IF EXISTS cambiar_estado_comentario;
DELIMITER $$
CREATE PROCEDURE cambiar_estado_comentario(IN comentario_id INT)
BEGIN
    DECLARE comentario_estado BOOLEAN;
    -- Obtener el estado actual del cliente
    SELECT estado_comentario INTO comentario_estado
    FROM tb_comentarios
    WHERE id_comentario = comentario_id;
    -- Actualizar el estado del cliente
    IF comentario_estado = 1 THEN
        UPDATE tb_comentarios
        SET estado_comentario = 0
        WHERE id_comentario = comentario_id;
    ELSE
        UPDATE tb_comentarios
        SET estado_comentario = 1
        WHERE id_comentario = comentario_id;
    END IF;
END $$



-- Procedimiento almacenado de estado------
DROP PROCEDURE IF EXISTS cambiar_estado_detalle_pedido;
DELIMITER $$
CREATE PROCEDURE cambiar_estado_detalle_pedido(IN detalle_entrega_id INT)
BEGIN
    DECLARE detalle_estado BOOLEAN;
    -- Obtener el estado actual del cliente
    SELECT estado_pedido INTO detalle_estado
    FROM tb_detalles_pedidos
    WHERE id_detalle_entrega = detalle_entrega_id;
    -- Actualizar el estado del cliente
    IF detalle_estado = 1 THEN
        UPDATE tb_detalles_pedidos
        SET estado_pedido = 0
        WHERE id_detalle_entrega = detalle_entrega_id;
    ELSE
        UPDATE tb_detalles_pedidos
        SET estado_pedido = 1
        WHERE id_detalle_entrega = detalle_entrega_id;
    END IF;
END $$

