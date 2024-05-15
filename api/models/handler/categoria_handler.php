<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla CATEGORIA.
 */
class CategoriaHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $id = null;
    protected $nombre = null;
    protected $descripcion = null;
    protected $imagen = null;

    // Constante para establecer la ruta de las imágenes.
    const RUTA_IMAGEN = '../../images/categorias/';


    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_categoria_producto, nombre_categoria_producto, descripcion_categoria_producto, imagen_categoria_producto
                FROM tb_categorias_productos
                WHERE nombre_categoria_producto LIKE ? OR descripcion_categoria_producto LIKE ?
                ORDER BY nombre_categoria_producto';
        $params = array($value, $value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO tb_categorias_productos(nombre_categoria_producto, descripcion_categoria_producto, imagen_categoria_producto)
                VALUES(?, ?, ?)';
        $params = array($this->nombre, $this->descripcion, $this->imagen);
        return Database::executeRow($sql, $params);
    }
    public function readAll()
    {
        $sql = 'SELECT id_categoria_producto, nombre_categoria_producto, descripcion_categoria_producto, imagen_categoria_producto
                FROM tb_categorias_productos
                ORDER BY nombre_categoria_producto';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT id_categoria_producto, nombre_categoria_producto, descripcion_categoria_producto, imagen_categoria_producto
                FROM tb_categorias_productos
                WHERE id_categoria_producto = ?';
        $params = array($this->id,);
        return Database::getRow($sql, $params);
    }

    public function readFilename()
    {
        $sql = 'SELECT imagen_categoria_producto
                FROM tb_categorias_productos
                WHERE id_categoria_producto = ?';
        $params = array($this->id,);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_categorias_productos
                SET imagen_categoria_producto = ?, nombre_categoria_producto = ?, descripcion_categoria_producto = ?
                WHERE id_categoria_producto = ?';
        $params = array($this->imagen, $this->nombre, $this->descripcion, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_categorias_productos
                WHERE id_categoria_producto = ?';
        $params = array($this->id,);
        return Database::executeRow($sql, $params);
    }

}
