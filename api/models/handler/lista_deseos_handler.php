<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
*	Clase para manejar el comportamiento de los datos de la tabla PRODUCTO.
*/
class ListaHandler
{

    protected $id = null;
    protected $idProducto = null;
    protected $idCliente = null;

    public function readOne()
    {
        $sql = 'SELECT 
                    tb_productos.id_producto,
                    tb_listas_deseos.id_lista_deseo,
                    tb_productos.imagen_producto, 
                    tb_productos.nombre_producto, 
                    tb_productos.cantidad_producto, 
                    tb_productos.precio_producto, 
                    tb_productos.descripcion_producto
                FROM tb_productos
                INNER JOIN tb_listas_deseos ON tb_productos.id_producto = tb_listas_deseos.id_producto
                WHERE tb_listas_deseos.id_cliente = ?';
        $params = array($_SESSION['idCliente']);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO tb_listas_deseos (id_producto, id_cliente)
                VALUES(?, ?);';
        $params = array($this->idProducto, $_SESSION['idCliente']);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_listas_deseos
                WHERE id_lista_deseo = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }
}
