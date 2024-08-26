<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
*	Clase para manejar el comportamiento de los datos de la tabla CLIENTE.
*/
class ClienteHandler
{
    /*
    *   Declaración de atributos para el manejo de datos.
    */
    protected $id = null;
    protected $nombre = null;
    protected $apellido = null;
    protected $telefono = null;
    protected $direccion = null;
    protected $alias = null;
    protected $correo = null;
    protected $clave = null;
    protected $imagen = null;
    protected $estado = null;
    
    protected $pregunta = null;
    protected $respuesta = null;

    // Constante para establecer la ruta de las imágenes.
    const RUTA_IMAGEN = '../../images/clientes/';

    /*
    *   Métodos para gestionar la cuenta del cliente.
    */
    public function checkUser($mail, $password)
    {
        $sql = 'SELECT id_cliente, correo_cliente, pass_cliente, estado_cliente
                FROM tb_clientes
                WHERE correo_cliente = ?';
        $params = array($mail);
        if (!($data = Database::getRow($sql, $params))) {
            return false;
        } elseif (password_verify($password, $data['pass_cliente'])) {
            $this->id = $data['id_cliente'];
            $this->correo = $data['correo_cliente'];
            $this->estado = $data['estado_cliente'];
            return true;
        } else {
            return false;
        }
    }

    public function checkStatus()
    {
        if ($this->estado) {
            $_SESSION['idCliente'] = $this->id;
            $_SESSION['correoCliente'] = $this->correo;
            return true;
        } else {
            return false;
        }
    }

    public function changePassword()
    {
        $sql = 'UPDATE tb_clientes
                SET pass_cliente = ?
                WHERE id_cliente = ?';
        $params = array($this->clave, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function readProfile()
    {
        $sql = 'SELECT id_cliente, nombre_cliente, apellido_cliente, correo_cliente, telefono_cliente,residencia_cliente,alias_cliente, imagen_cliente
                FROM tb_clientes
                WHERE id_cliente = ?';
        $params = array($_SESSION['idCliente']);
        return Database::getRow($sql, $params);
    }


    public function editProfile()
    {
        $sql = 'UPDATE tb_clientes
                SET nombre_cliente = ?, apellido_cliente = ?,  telefono_cliente = ?, residencia_cliente = ?, alias_cliente = ?, imagen_cliente = ?
                WHERE id_cliente = ?';
        $params = array($this->nombre, $this->apellido, $this->telefono, $this->direccion, $this->alias, $this->imagen,  $_SESSION['idCliente']);
        return Database::executeRow($sql, $params);
    }


    public function editProfileMobile()
    {
        $sql = 'UPDATE tb_clientes
                SET nombre_cliente = ?, apellido_cliente = ?,  telefono_cliente = ?,  residencia_cliente = ?, alias_cliente = ?
                WHERE id_cliente = ?';
        $params = array($this->nombre, $this->apellido, $this->telefono, $this->direccion, $this->alias,  $_SESSION['idCliente']);
        return Database::executeRow($sql, $params);
    }

    public function changeStatus()
    {
        $sql = 'UPDATE tb_clientes
                SET estado_cliente = ?
                WHERE id_cliente = ?';
        $params = array($this->estado, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function checkPassword($password)
    {
        $sql = 'SELECT pass_cliente
                FROM tb_clientes
                WHERE id_cliente = ?';
        $params = array($_SESSION['idCliente']);
        $data = Database::getRow($sql, $params);
        // Se verifica si la contraseña coincide con el hash almacenado en la base de datos.
        if (password_verify($password, $data['pass_cliente'])) {
            return true;
        } else {
            return false;
        }
    }


    /*
    *   Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
    */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_cliente, nombre_cliente, apellido_cliente, correo_cliente, telefono_cliente, residencia_cliente, imagen_cliente
                FROM tb_clientes
                WHERE apellido_cliente LIKE ? OR nombre_cliente LIKE ? OR correo_cliente LIKE ?
                ORDER BY apellido_cliente';
        $params = array($value, $value, $value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        // Inserta el nuevo cliente en tb_clientes
        $sql = 'INSERT INTO tb_clientes(nombre_cliente, apellido_cliente, alias_cliente, correo_cliente, telefono_cliente, residencia_cliente, pass_cliente, estado_cliente, imagen_cliente)
                VALUES(?, ?, ?, ?, ?, ?, ?, true, ?)';
        $params = array($this->nombre, $this->apellido, $this->alias, $this->correo, $this->telefono, $this->direccion, $this->clave, $this->imagen);
        $clientCreated = Database::executeRow($sql, $params);

        if ($clientCreated) {
            // Consulta para obtener el ID del último cliente creado
            $sql = 'SELECT MAX(id_cliente) AS last_id FROM tb_clientes';
            $lastClientId = Database::getRow($sql);  // Asumiendo que tienes un método que devuelve un resultado de una consulta

            if ($lastClientId) {
                $lastClientId = $lastClientId['last_id'];

                // Inserta un nuevo registro en tb_pedidos con el ID del cliente
                $sql = 'INSERT INTO tb_pedidos (id_cliente) VALUES(?)';
                $params = array($lastClientId);
                return Database::executeRow($sql, $params);
            } else {
                throw new Exception("No se pudo obtener el ID del cliente recién creado.");
            }
        }
        return false;
    }

    public function createRowMovil()
    {
        $sql = 'INSERT INTO tb_clientes(nombre_cliente, apellido_cliente, alias_cliente, correo_cliente, telefono_cliente, residencia_cliente, pass_cliente, estado_cliente, imagen_cliente, pregunta_seguridad, respuesta_seguridad)
                VALUES(?, ?, ?, ?, ?, ?, ?, true, ?, ?, ?)';
        $params = array($this->nombre, $this->apellido, $this->alias, $this->correo, $this->telefono, $this->direccion, $this->clave, $this->imagen , $this->pregunta, $this->respuesta);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT id_cliente, nombre_cliente, apellido_cliente, correo_cliente, estado_cliente, imagen_cliente
                FROM tb_clientes
                ORDER BY apellido_cliente';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT id_cliente, nombre_cliente, apellido_cliente, correo_cliente, telefono_cliente, residencia_cliente, estado_cliente, alias_cliente,imagen_cliente
                FROM tb_clientes
                WHERE id_cliente = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_clientes
                SET estado_cliente = ?, imagen_cliente = ?
                WHERE id_cliente = ?';
        $params = array($this->estado, $this->imagen, $this->id);
        print_r($params);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_clientes
                WHERE id_cliente = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    public function checkDuplicate($value)
    {
        $sql = 'SELECT id_cliente
                FROM tb_clientes
                WHERE alias_cliente = ? OR correo_cliente = ?';
        $params = array($value, $value);
        return Database::getRow($sql, $params);
    }

    public function readFilename()
    {
        $sql = 'SELECT imagen_cliente
                FROM tb_clientes
                WHERE id_cliente = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    //Función para cambiar el estado de un cliente.
    public function changeState()
    {
        $sql = 'CALL cambiar_estado_cliente(?);';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    /*
    *   Métodos para generar gráficas.
    */
    // Función para gráfica : Mostrar el top 5 de clientes con mas pedidos o compras.
    public function ClientesMasCompras()
    {
        $sql = 'SELECT 
    c.nombre_cliente,  COUNT(p.id_pedido) AS total_compras
    FROM tb_clientes c
    INNER JOIN tb_pedidos p ON c.id_cliente = p.id_cliente
    GROUP BY c.nombre_cliente
    ORDER BY total_compras DESC
	LIMIT 5';
        return Database::getRows($sql);
    }

    // Función para obtener la cantidad de usuarios conectados y desconectados
    public function GraficaUsuariosEstados()
    {
        $sql = 'SELECT 
        CASE 
            WHEN estado_cliente = 1 THEN "Conectados"
            ELSE "Desconectados"
        END AS estado,
        COUNT(*) AS cantidad
    FROM tb_clientes
    GROUP BY estado_cliente';
        return Database::getRows($sql);
    }

    /*
    *   Métodos para generar reportes.
    */
    public function reporteCliente()
    {
        $sql = ' 
          SELECT 
    p.id_pedido, 
    p.fecha_registro, 
    c.nombre_cliente, 
    p.direccion_pedido AS direccion_pedido, 
    GROUP_CONCAT(DISTINCT pr.nombre_producto ORDER BY pr.nombre_producto ASC SEPARATOR ", ") AS productos_pedidos, 
    COUNT(pr.id_producto) AS cantidad_productos_pedidos
FROM 
    tb_pedidos p
INNER JOIN 
    tb_clientes c ON p.id_cliente = c.id_cliente
INNER JOIN 
    tb_detalles_pedidos dp ON p.id_pedido = dp.id_pedido
INNER JOIN 
    tb_productos pr ON dp.id_producto = pr.id_producto
WHERE 
    c.id_cliente = ?
GROUP BY 
    p.id_pedido, 
    p.fecha_registro, 
    c.nombre_cliente, 
    p.direccion_pedido;';
        $params = array($this->id);
        return Database::getRows($sql, $params);
    }
}
