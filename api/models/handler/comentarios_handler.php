<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
*	Clase para manejar el comportamiento de los datos de la tabla COMENTARIOS.
*/
class ComentarioHandler
{
    /*
    *   Declaración de atributos para el manejo de datos.
    */
    protected $id = null;
    protected $comentario = null;
    protected $estado = null;
    protected $producto = null;
    protected $cliente = null;
    protected $estrella = null;
    protected $fecha = null;

    /*
    *   Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
    */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT c.id_comentario, c.comentario, p.nombre_producto AS nombre_producto, cl.nombre_cliente AS nombre_cliente, c.estado_comentario
            FROM tb_comentarios c
            INNER JOIN tb_productos p ON c.id_producto = p.id_producto
            INNER JOIN tb_clientes cl ON c.id_cliente = cl.id_cliente
            WHERE c.comentario LIKE ? OR p.nombre_producto LIKE ?
            ORDER BY c.fecha_comentario DESC, p.nombre_producto
            ';
        $params = array($value, $value);
        return Database::getRows($sql, $params);
    }

    /* 
    public function createRow()
    {
        $sql = 'CALL insertar_comentario(?, ?, ?, ?, 1);';
        $params = array($this->comentario,$this->estrella, $this->producto, $this->cliente, $this->estado);
        return Database::executeRow($sql, $params);
    }
    */


    public function createRow()
    {
        $sql = 'INSERT INTO tb_comentarios(comentario, estrella)
            VALUES(?, ?)';
        $params = array($this->comentario, $this->estrella);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT c.id_comentario, c.comentario,  p.nombre_producto AS nombre_producto, cl.nombre_cliente AS nombre_cliente, c.estado_comentario, c.estrella, c.fecha_comentario
                FROM tb_comentarios c
                INNER JOIN tb_productos p ON c.id_producto = p.id_producto
                INNER JOIN tb_clientes cl ON c.id_cliente = cl.id_cliente
                ORDER BY c.fecha_comentario DESC';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT *
                FROM tb_comentarios 
                WHERE id_comentario = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_comentarios
                SET  comentario = ?, estado_comentario = ?, estrella = ?, fecha_comentario = ?, id_producto = ?, id_cliente = ?
                WHERE id_comentario = ?';
        $params = array($this->comentario, $this->estado, $this->producto, $this->cliente, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_comentarios
                WHERE id_comentario = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    //Función para cambiar el estado de un comentario.
    public function changeState()
    {
        $sql = 'CALL cambiar_estado_comentario(?);';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }


    public function verifyPurchase()
    {
        // SQL query para verificar la compra de un producto específico por un cliente específico
        $sql = "SELECT dp.id_detalle_entrega as id
            FROM tb_detalles_pedidos dp
            INNER JOIN tb_pedidos p ON dp.id_pedido = p.id_pedido
            WHERE p.id_cliente = ?
            AND dp.id_producto = ?
            AND p.estado_pedido = 'Finalizado'
            ORDER BY dp.id_detalle_entrega DESC";
        // Parámetros para la consulta: idCliente y productos
        $params = array($_SESSION['idCliente'], $this->producto);
        $data = Database::getRow($sql, $params);
        // Ejecuta la consulta y obtiene una fila de resultado
        if ($data) {
            // Si se encuentra un registro, guarda el idDetalle y producto en la sesión
            $_SESSION['idDetalle'] = $data['id'];
            $_SESSION['producto'] = $this->producto;
            return true;
        } else {
            // Si no se encuentra ningún registro, retorna false
            return false;
        }
    }


    public function createComment()
    {
        // Verifica si el cliente ha comprado el producto
        if ($this->verifyPurchase()) {
            // Inserta un nuevo comentario en la tabla tb_comentarios
            $sql = 'INSERT INTO tb_comentarios(estrella, comentario, id_producto, id_cliente, estado_comentario)
                VALUES(?, ?, ?, ?, ?)';
            // Parámetros para la consulta: estrella, comentario, id_producto, id_cliente, estado_comentario
            $params = array($this->estrella, $this->comentario, $_SESSION['producto'], $_SESSION['idCliente'], 0);
            // Ejecuta la consulta y retorna el resultado
            return Database::executeRow($sql, $params);
        } else {
            // Si no ha comprado el producto, retorna false
            return false;
        }
    }


    // Generar gráfica
    public function ProductosmasComentados()
    {

        $sql = 'SELECT p.nombre_producto, COUNT(c.id_comentario) AS total_comentarios
        FROM tb_productos p
        INNER JOIN tb_comentarios c ON p.id_producto = c.id_producto
        GROUP BY p.nombre_producto ORDER BY total_comentarios DESC 
        LIMIT 5;';
        return Database::getRows($sql);
    }

    public function ProductosmejorCalificados()
    {
        $sql = 'SELECT p.id_producto, p.nombre_producto, c.estrella
        FROM tb_productos p 
        JOIN tb_comentarios c ON p.id_producto = c.id_producto 
        WHERE c.estrella = 5
        LIMIT 5;';;
        return Database::getRows($sql);
    }

}