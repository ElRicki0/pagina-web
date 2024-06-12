<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
*	Clase para manejar el comportamiento de los datos de la tabla PRODUCTO.
*/
class HistorialHandler 
{
    protected $id = null;

    public function readAll()
    {
        $sql = 'SELECT p.fecha_pedido, p.direccion_pedido AS direccion_pedido, pr.nombre_producto AS nombre_producto
                    FROM tb_pedidos p
                    INNER JOIN tb_clientes c ON p.id_cliente = c.id_cliente
                    INNER JOIN tb_detalles_pedidos dp ON p.id_pedido = dp.id_pedido
                    INNER JOIN tb_productos pr ON dp.id_producto = pr.id_producto
                    where c.id_cliente=?';
        $params = array($_SESSION['idCliente']);
        return Database::getRows($sql, $params);
    }
}