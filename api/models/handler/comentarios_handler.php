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

    public function createRow()
    {
        $sql = 'CALL insertar_comentario(?, ?, ?, ?, 1);';
        $params = array($this->comentario,$this->estrella, $this->producto, $this->cliente, $this->estado);
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
}
