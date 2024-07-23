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

    protected $id_pedido = null;
    protected $id_detalle = null;
    protected $precio = null;
    protected $cliente = null;
    protected $producto = null;
    protected $cantidad = null;
    protected $id = null;
    protected $fecha = null;
    protected $estado = null;
    /*
     *   Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */


    // Método para verificar si existe un pedido en proceso con el fin de iniciar o continuar una compra.
    public function getOrder()
    {
        $this->estado = 'Pendiente';
        $sql = 'SELECT id_pedido
                FROM tb_pedidos
                WHERE estado_pedido = ? AND id_cliente = ?';
        $params = array($this->estado, $_SESSION['idCliente']);
        if ($data = Database::getRow($sql, $params)) {
            $_SESSION['idPedido'] = $data['id_pedido'];
            return true;
        } else {
            return false;
        }
    }

    public function startOrder()
    {
        if ($this->getOrder()) {
            return true;
        } else {
            $this->estado = 'Pendiente';
            // cambiar dirección_cliente por residencia_cliente según db
            $sql = 'INSERT INTO tb_pedidos(direccion_pedido, id_cliente)
                    VALUES((SELECT residencia_cliente FROM tb_clientes WHERE id_cliente = ?), ?)';
            $params = array($_SESSION['idCliente'], $_SESSION['idCliente']);
            // Se obtiene el ultimo valor insertado de la llave primaria en la tabla pedido.
            if ($_SESSION['idPedido'] = Database::getLastRow($sql, $params)) {
                return true;
            } else {
                return false;
            }
        }
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
    }

    public function readlistcarrito()
    {
        $sql = 'SELECT p.nombre_producto, dp.cantidad_pedido, 
        dp.cantidad_pedido * dp.precio_pedido as precio 
                FROM tb_pedidos pe
        JOIN tb_detalles_pedidos dp ON pe.id_pedido = dp.id_pedido 
        JOIN tb_productos p ON dp.id_producto = p.id_producto 
        WHERE pe.id_pedido =  ?';
        $params = array($this->id);
        return Database::getRows($sql, $params);
    }

    /**    definición de valor para estado_pedido
     *  0 - pendiente
     *  1 - finalizado
     *  2 - cancelado
     */

    // Método para agregar un producto al carrito de compras.
    public function createDetail()
    {
        // Se realiza una subConsulta para obtener el precio del producto.
        $sql = 'INSERT INTO tb_detalles_pedidos(id_producto, precio_pedido, cantidad_pedido, id_pedido)
                VALUES(?, (SELECT precio_producto FROM tb_productos WHERE id_producto = ?), ?, ?)';

        $params = array($this->producto, $this->producto, $this->cantidad, $_SESSION['idPedido']);
        return Database::executeRow($sql, $params);
    }

    // Método para obtener los productos que se encuentran en el carrito de compras.
    public function readDetail()
    {
        $sql = 'SELECT dp.id_detalle_entrega, dp.precio_pedido,
        p.nombre_producto, dp.cantidad_pedido, ROUND(dp.cantidad_pedido * dp.precio_pedido, 2) as precio 
        FROM tb_pedidos pe 
        JOIN tb_detalles_pedidos dp ON pe.id_pedido = dp.id_pedido 
        JOIN tb_productos p ON dp.id_producto = p.id_producto 
        WHERE pe.id_pedido = ? AND dp.estado_pedido = ?';
        $params = array($_SESSION['idPedido'], 0);
        return Database::getRows($sql, $params);
    }

    // Método para finalizar un pedido por parte del cliente.
    public function finishOrder()
    {
        $this->estado = 'Finalizado';
        $sql = 'UPDATE tb_pedidos
                SET estado_pedido = ?
                WHERE id_pedido = ?';
        $params = array($this->estado, $_SESSION['idPedido']);
        $exec = Database::executeRow($sql, $params);
        // cambiando el estado de los items del carrito
        if (!$this->finishDetail()) {
            $exec = false;
        }
        return $exec;
    }

    // método para cambiar el estado de la orden de un detalle
    public function finishDetail()
    {
        // estado de detalle comprado
        $estado = 2;
        $sql = 'UPDATE tb_detalles_pedidos
                SET estado_pedido = ?
                WHERE id_pedido = ?';
        $params = array($estado, $_SESSION['idPedido']);
        return Database::executeRow($sql, $params);
    }

    // Método para actualizar la cantidad de un producto agregado al carrito de compras.
    public function updateDetail()
    {
        $sql = 'UPDATE tb_pedidos
                SET estado_pedido = ?
                WHERE id_pedido = ?';
        $params = array('Cancelado', $_SESSION['idPedido']);
        return Database::executeRow($sql, $params);
    }

    // Método para eliminar un producto que se encuentra en el carrito de compras.
    public function deleteDetail()
    {
        $sql = 'UPDATE tb_detalles_pedidos SET estado_pedido = ?
                WHERE id_detalle_entrega = ?';
        $params = array(2, $this->id);
        return Database::executeRow($sql, $params);
    }
}
