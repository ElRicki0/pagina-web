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
            // cambiar direccion_cliente por residencia_cliente según db
            $sql = 'INSERT INTO tb_pedidos(direccion_pedido, id_cliente, estado_pedido, fecha_pedido)
                    VALUES((SELECT direccion_cliente FROM tb_clientes WHERE id_cliente = ?), ?, ?, CURDATE())';
            $params = array($_SESSION['idCliente'], $_SESSION['idCliente'], $this->estado);
            // Se obtiene el ultimo valor insertado de la llave primaria en la tabla pedido.
            if ($_SESSION['idPedido'] = Database::getLastRow($sql, $params)) {
                return true;
            } else {
                return false;
            }
        }
    }

    public function createRow()
    {
        // Insert the new client into tb_clientes
        $sql = 'INSERT INTO tb_clientes(nombre_cliente, apellido_cliente, alias_cliente, correo_cliente, telefono_cliente, residencia_cliente, pass_cliente, estado_cliente, imagen_cliente)
                 VALUES(?, ?, ?, ?, ?, ?, ?, true, ?)';
        $params = array($this->nombre, $this->apellido, $this->alias, $this->correo, $this->telefono, $this->direccion, $this->clave, $this->imagen);
        $clientCreated = Database::executeRow($sql, $params);

        if ($clientCreated) {
            // Get the ID of the newly created client
            $lastClientId = Database::getLastId();

            // Insert a new record in tb_pedidos with the client's ID
            $sql = 'INSERT INTO tb_pedidos (id_cliente) VALUES(?)';
            $params = array($lastClientId);
            return Database::executeRow($sql, $params);
        }
        return false;
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
        $sql = 'SELECT p.nombre_producto, dp.cantidad_pedido, 
        dp.cantidad_pedido * dp.precio_pedido as precio 
                FROM tb_pedidos pe
        JOIN tb_detalles_pedidos dp ON pe.id_pedido = dp.id_pedido 
        JOIN tb_productos p ON dp.id_producto = p.id_producto 
        WHERE pe.id_pedido =  ?';
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

    // Método para agregar un producto al carrito de compras.
    public function createDetail()
    {
        // Se realiza una subconsulta para obtener el precio del producto.
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
        WHERE pe.id_pedido = ?';
        $params = array($_SESSION['idPedido']);
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
    // no se usa
    public function deleteDetail()
    {
        $sql = 'DELETE FROM detalle_pedido
                WHERE id_detalle = ? AND id_pedido = ?';
        $params = array($this->id_detalle, $_SESSION['idPedido']);
        return Database::executeRow($sql, $params);
    }
}
