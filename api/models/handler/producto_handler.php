<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
*	Clase para manejar el comportamiento de los datos de la tabla PRODUCTO.
*/
class ProductoHandler
{
    /*
    *   Declaración de atributos para el manejo de datos.
    */
    protected $id = null;
    protected $imagen = null;
    protected $nombre = null;
    protected $descripcion = null;
    protected $precio = null;
    protected $cantidad = null;
    protected $agregarCantidad = null;
    protected $categoria = null;
    protected $administrador = null;
    protected $marca = null;

    //Ruta para guardar imágenes
    const RUTA_IMAGEN = '../../images/productos/';


    /*
    *   Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
    */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT p.id_producto, p.imagen_producto, p.nombre_producto, p.descripcion_producto, p.precio_producto, p.cantidad_producto, m.nombre_marca,
                c.nombre_categoria_producto AS categoria_producto, 
                a.nombre_admin AS nombre_administrador, 
                m.nombre_marca AS nombre_marca
                FROM tb_productos p
                INNER JOIN tb_categorias_productos c ON p.id_categoria_producto = c.id_categoria_producto
                INNER JOIN tb_administradores a ON p.id_admin = a.id_admin
                INNER JOIN tb_marcas m ON p.id_marca = m.id_marca
                WHERE nombre_producto LIKE ? OR nombre_marca LIKE ? OR descripcion_producto LIKE ?
                ORDER BY nombre_producto';
        $params = array($value, $value, $value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO tb_productos (imagen_producto, nombre_producto, descripcion_producto, precio_producto, cantidad_producto, id_categoria_producto, id_admin, id_marca)
                VALUES(?, ?, ?, ?, ?, ?, ?, ?)';
        $params = array($this->imagen, $this->nombre, $this->descripcion, $this->precio, $this->cantidad, $this->categoria, $this->administrador, $this->marca);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT p.id_producto, p.imagen_producto, p.nombre_producto, p.descripcion_producto, p.precio_producto, p.cantidad_producto, 
                c.nombre_categoria_producto AS categoria_producto, 
                a.nombre_admin AS nombre_administrador, 
                m.nombre_marca AS nombre_marca
                FROM tb_productos p
                INNER JOIN tb_categorias_productos c ON p.id_categoria_producto = c.id_categoria_producto
                INNER JOIN tb_administradores a ON p.id_admin = a.id_admin
                INNER JOIN tb_marcas m ON p.id_marca = m.id_marca
                ORDER BY nombre_producto';
        return Database::getRows($sql);
    }

    public function readAllPublic()
    {
        $sql = 'SELECT p.id_producto, p.imagen_producto, p.nombre_producto, p.descripcion_producto, p.precio_producto, p.cantidad_producto, 
                c.nombre_categoria_producto AS categoria_producto,  
                m.nombre_marca AS nombre_marca
                FROM tb_productos p
                INNER JOIN tb_categorias_productos c ON p.id_categoria_producto = c.id_categoria_producto
                INNER JOIN tb_administradores a ON p.id_admin = a.id_admin
                INNER JOIN tb_marcas m ON p.id_marca = m.id_marca
                ORDER BY nombre_producto';
        return Database::getRows($sql);
    }

    public function read8Products()
    {
        $sql = 'SELECT p.id_producto, p.imagen_producto, p.nombre_producto, p.descripcion_producto, p.precio_producto, p.cantidad_producto, p.id_categoria_producto, 
                c.nombre_categoria_producto AS categoria_producto, 
                a.nombre_admin AS nombre_administrador, 
                m.nombre_marca AS nombre_marca
                FROM tb_productos p
                INNER JOIN tb_categorias_productos c ON p.id_categoria_producto = c.id_categoria_producto
                INNER JOIN tb_administradores a ON p.id_admin = a.id_admin
                INNER JOIN tb_marcas m ON p.id_marca = m.id_marca
                ORDER BY RAND()
                limit 8';
        return Database::getRows($sql);
    }

    public function read2Products()
    {
        $sql = 'SELECT p.id_producto, p.imagen_producto, p.nombre_producto, p.descripcion_producto, p.precio_producto, p.cantidad_producto, p.id_categoria_producto, 
                c.nombre_categoria_producto AS categoria_producto, 
                a.nombre_admin AS nombre_administrador, 
                m.nombre_marca AS nombre_marca
                FROM tb_productos p
                INNER JOIN tb_categorias_productos c ON p.id_categoria_producto = c.id_categoria_producto
                INNER JOIN tb_administradores a ON p.id_admin = a.id_admin
                INNER JOIN tb_marcas m ON p.id_marca = m.id_marca
                ORDER BY RAND()
                limit 2';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT *
                FROM tb_productos
                WHERE id_producto = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function readOneMarca()
    {
        $sql = 'SELECT tb_marcas.id_marca, tb_marcas.nombre_marca, tb_marcas.descripcion_marca, tb_marcas.imagen_marca
        FROM tb_marcas
        JOIN tb_productos ON tb_marcas.id_marca = tb_productos.id_marca
        WHERE tb_productos.id_producto = ?;
        ';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function readFilename()
    {
        $sql = 'SELECT imagen_producto
                FROM tb_productos
                WHERE id_producto = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_productos
                SET  nombre_producto = ?, descripcion_producto = ?, precio_producto = ?, cantidad_producto = ?, id_categoria_producto = ?, id_admin = ?, imagen_producto = ?, id_marca=?
                WHERE id_producto = ?';
        $params = array($this->nombre, $this->descripcion, $this->precio, $this->cantidad, $this->categoria, $this->administrador, $this->imagen, $this->marca, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function agregarProducto()
    {
        $sql = 'UPDATE tb_productos
                SET cantidad_producto = cantidad_producto + ?
                WHERE id_producto = ?;
        ';
        $params = array($this->agregarCantidad, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_productos
                WHERE id_producto = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    public function readProductosCategoria()
    {
        $sql = 'SELECT id_producto, imagen_producto, nombre_producto, descripcion_producto, precio_producto, cantidad_producto
                FROM tb_productos
                INNER JOIN tb_categorias_productos USING(id_categoria_producto)
                WHERE id_categoria_producto = ?
                ORDER BY nombre_producto';
        $params = array($this->categoria);
        return Database::getRows($sql, $params);
    }

    public function readProductosMarca()
    {
        $sql = 'SELECT id_producto, imagen_producto, nombre_producto, descripcion_producto, precio_producto, cantidad_producto
    FROM tb_productos p
    INNER JOIN tb_marcas USING(id_marca)
    WHERE id_marca = ? 
    ORDER BY nombre_producto;
    ';
        $params = array($this->marca);
        return Database::getRows($sql, $params);
    }

    public function readProductosInicio()
    {
        $sql = 'SELECT 
        p.id_producto,
        p.nombre_producto, 
        p.imagen_producto, 
        p.descripcion_producto, 
        c.nombre_categoria_producto AS categoria_producto, 
        a.nombre_admin AS nombre_administrador, 
        m.nombre_marca AS nombre_marca
    FROM 
        tb_productos p
    INNER JOIN 
        tb_categorias_productos c ON p.id_categoria_producto = c.id_categoria_producto
    INNER JOIN 
        tb_administradores a ON p.id_admin = a.id_admin
    INNER JOIN 
        tb_marcas m ON p.id_marca = m.id_marca
    ORDER BY 
        RAND()
    LIMIT 6;
    ';
        return Database::getRows($sql);
    }

    public function readComentarios()
    {
        $sql = 'SELECT c.id_comentario, c.comentario, c.estrella, c.id_producto, cl.nombre_cliente, cl.imagen_cliente,
                c.estado_comentario, c.fecha_comentario
                FROM tb_comentarios c
                INNER JOIN tb_clientes cl ON c.id_cliente = cl.id_cliente
                WHERE c.id_producto = ? AND c.estado_comentario = 1';

        $params = array($this->id);
        return Database::getRows($sql, $params);
    }


    /*
    *   Métodos para generar gráficos.
    */
    public function porcentajeProductosCategoria()
    {
        $sql = 'SELECT nombre_categoria_producto, 
                   ROUND((COUNT(id_producto) * 100.0 / (SELECT COUNT(id_producto) FROM tb_productos)), 2) AS porcentaje
            FROM tb_productos
            INNER JOIN tb_categorias_productos 
            ON tb_productos.id_categoria_producto = tb_categorias_productos.id_categoria_producto
            GROUP BY nombre_categoria_producto 
            ORDER BY porcentaje DESC';
        return Database::getRows($sql);
    }

    public function productosMasVendidos()
    {
        $sql = 'SELECT p.nombre_producto, SUM(dp.cantidad_pedido) AS total_vendido
            FROM tb_productos p
            INNER JOIN tb_detalles_pedidos dp ON p.id_producto = dp.id_producto
            GROUP BY p.nombre_producto
            ORDER BY total_vendido DESC
            limit 5';
        return Database::getRows($sql);
    }

    /*
    *   Métodos para generar reportes.
    */
    public function productosCategoria()
    {
        $sql = 'SELECT nombre_producto, precio_producto, cantidad_producto
                FROM tb_productos
                INNER JOIN tb_categorias_productos USING(id_categoria_producto)
                WHERE id_categoria_producto = ?
                ORDER BY nombre_producto';
        $params = array($this->categoria);
        return Database::getRows($sql, $params);
    }


    /*
    *   Métodos para generar reportes.
    */
    public function productosMarca()
    {
        $sql = 'SELECT nombre_producto, precio_producto, cantidad_producto
                from tb_productos 
                inner join tb_marcas  using(id_marca)
                where id_marca=?';
        $params = array($this->marca);
        return Database::getRows($sql, $params);
    }
}
