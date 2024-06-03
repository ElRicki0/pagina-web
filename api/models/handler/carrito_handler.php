<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla PRODUCTO.
 */
class CarritoHandler
{
    /*
     *   Declaración de atributos para el manejo de datos.
     */
    protected $id = null;
    protected $pedido = null;
    protected $producto = null;
    protected $precio = null;
    protected $cantidad = null;

    /*
     *   Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT
    d.id_producto,
    p.nombre_producto,
    p.descripcion_producto,
    p.precio_producto,
    p.cantidad_producto,
    d.id_pedido,
    d.precio_pedido,
    d.cantidad_pedido,
FROM tb_pedidos ped
INNER JOIN tb_detalles_pedidos d ON ped.id_pedido = d.id_pedido
INNER JOIN tb_productos p ON d.id_producto = p.id_producto
WHERE p.nombre_producto LIKE ? OR p.descripcion_producto LIKE ?
ORDER BY p.nombre_producto;
';
        $params = array($value, $value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO tb_detalles_pedidos (id_pedido, id_producto, precio_pedido, cantidad_pedido, estado_pedido)
        VALUES (?, ?, ?, ?, ?)';
        $params = array($this->pedido, $this->producto, $this->precio, $this->cantidad, $this->estado);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {

        $sql = 'SELECT dp.id_detalle_entrega, dp.cantidad_pedido, dp.precio_pedido, ped.direccion_pedido AS direccion_pedido, ped.fecha_pedido AS fecha_pedido ,p.nombre_producto AS nombre_producto,c.nombre_cliente AS nombre_cliente
        FROM tb_detalles_pedidos dp
        INNER JOIN tb_pedidos ped ON dp.id_pedido = ped.id_pedido
        INNER JOIN tb_productos p ON dp.id_producto = p.id_producto
        INNER JOIN tb_clientes c ON ped.id_cliente = c.id_cliente
        ORDER BY dp.id_detalle_entrega';
        return Database::getRows($sql);
        //     $sql = 'SELECT dp.id_detalle_entrega, dp.cantidad_pedido, dp.precio_pedido, ped.direccion_pedido AS direccion_pedido, ped.fecha_pedido AS fecha_pedido ,p.nombre_producto AS nombre_producto,c.nombre_cliente AS nombre_cliente
        // FROM tb_detalles_pedidos dp
        // INNER JOIN tb_pedidos ped ON dp.id_pedido = ped.id_pedido
        // INNER JOIN tb_productos p ON dp.id_producto = p.id_producto
        // INNER JOIN tb_clientes c ON ped.id_cliente = c.id_cliente
        // ORDER BY dp.id_detalle_entrega';
        //     return Database::getRows($sql);
    }
    public function readOnee()
    {
        $sql = 'SELECT *
                FROM tb_detalles_pedidos
                WHERE id_detalle_entrega = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function readlistcarrito()
    {
        $sql = 'SELECT p.nombre_producto
        FROM tb_pedidos pe
        JOIN tb_detalles_pedidos dp ON pe.id_pedido = dp.id_pedido
        JOIN tb_productos p ON dp.id_producto = p.id_producto
        WHERE pe.id_pedido = ?';
        $params = array($this->id);
        return Database::getRows($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_detalles_pedidos
                SET id_pedido = ?, id_producto = ?, precio_pedido = ?, cantidad_pedido = ?, estado_pedido = ?
                WHERE id_detalle_entrega = ?';
        $params = array($this->pedido, $this->producto, $this->precio, $this->cantidad, $this->estado, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_detalles_pedidos
                WHERE id_detalle_entrega = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    //Función para cambiar el estado de un comentario.
    public function changeState()
    {
        $sql = 'CALL cambiar_estado_detalle_pedido(?);';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }
}
