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
    protected $id_categoria_producto = null;
    protected $nombre_categoria_producto = null;
    protected $descripcion_categoria_producto = null;
    protected $imagen_categoria_producto = null;

    // Constante para establecer la ruta de las imágenes.
    const RUTA_IMAGEN = '../../images/categorias';

    public function readFilename()
    {
        $sql = 'SELECT imagen_categoria_producto
                FROM tb_categorias_productos
                WHERE id_categoria_producto = ?';
        $params = array($this->id_categoria_producto);
        return Database::getRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT id_categoria_producto, nombre_categoria_producto, descripcion_categoria_producto, imagen_categoria_producto
                FROM tb_categorias_productos
                ORDER BY nombre_categoria_producto';
        return Database::getRows($sql);
    }
}
