<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla empleados.
 */
class AdministradorHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $id = null;
    protected $nombre = null;
    protected $apellido = null;
    protected $correo = null;
    protected $telefono = null;
    protected $telefonoEmer = null;
    protected $dui = null;
    protected $alias = null;
    protected $clave = null;

    /*
     *  Métodos para gestionar la cuenta del empleado.
     */
    public function checkUser($username, $password)
    {
        $sql = 'SELECT id_admin, alias_admin, pass_admin
                FROM tb_administradores
                WHERE  alias_admin = ?';
        $params = array($username);
        if (!($data = Database::getRow($sql, $params))) {
            return false;
        } elseif (password_verify($password, $data['pass_admin'])) {
            $_SESSION['idAdministrador'] = $data['id_admin'];
            $_SESSION['aliasAdministrador'] = $data['alias_admin'];
            return true;
        } else {
            return false;
        }
    }

    public function checkPassword($password)
    {
        $sql = 'SELECT pass_admin
                FROM tb_administradores
                WHERE id_admin = ?';
        $params = array($_SESSION['idAdministrador']);
        $data = Database::getRow($sql, $params);
        // Se verifica si la contraseña coincide con el hash almacenado en la base de datos.
        if (password_verify($password, $data['pass_admin'])) {
            return true;
        } else {
            return false;
        }
    }

    public function changePassword()
    {
        $sql = 'UPDATE tb_administradores
                SET pass_admin = ?
                WHERE id_admin = ?';
        $params = array($this->clave, $_SESSION['idadministrador']);
        return Database::executeRow($sql, $params);
    }

    public function readProfile()
    {
        $sql = 'SELECT id_admin, nombre_admin, apellido_admin, correo_admin, telefono_admin, numero_emerjencia_admin,DUI_admin,alias_admin
                FROM tb_administradores
                WHERE id_admin = ?';
        $params = array($_SESSION['idAdministrador']);
        return Database::getRow($sql, $params);
    }

    public function editProfile()
    {
        $sql = 'UPDATE tb_administradores
                SET nombre_admin = ?, apellido_admin = ?, correo_admin = ?,telefono_admin = ?,numero_emerjencia_admin = ?, DUI_admin = ? ,  alias_admin = ?
                WHERE id_admin = ?';
        $params = array($this->nombre, $this->apellido, $this->correo, $this->telefono, $this->telefonoEmer, $this->dui, $this->alias, $_SESSION['idAdministrador']);
        return Database::executeRow($sql, $params);
    }

    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_admin, nombre_admin, apellido_admin, correo_admin, telefono_admin, numero_emerjencia_admin, DUI_admin, alias_admin
                FROM tb_administradores
                WHERE apellido_admin LIKE ? OR nombre_admin LIKE ?
                ORDER BY apellido_admin';
        $params = array($value, $value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO tb_administradores(nombre_admin, apellido_admin, correo_admin, telefono_admin, numero_emerjencia_admin, DUI_admin, alias_admin, pass_admin)
                VALUES(?, ?, ?, ?, ?, ?, ?, ?)';
        $params = array($this->nombre, $this->apellido, $this->correo, $this->telefono, $this->telefonoEmer, $this->dui, $this->alias, $this->clave);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT id_admin, nombre_admin, apellido_admin, correo_admin, telefono_admin, numero_emerjencia_admin, DUI_admin, alias_admin
                FROM tb_administradores
                ORDER BY apellido_admin';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT id_admin, nombre_admin, apellido_admin, correo_admin, telefono_admin, numero_emerjencia_admin, DUI_admin, alias_admin
                FROM tb_administradores
                WHERE id_admin = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_administradores
                SET nombre_admin = ?, apellido_admin = ?, correo_admin = ?
                WHERE id_admin = ?';
        $params = array($this->nombre, $this->apellido, $this->correo, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_administradores
                WHERE id_admin = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }
    public function checkDuplicate($value)
    {
        $sql = 'SELECT id_cliente
                FROM tb_administradores 
                WHERE DUI_admin = ? OR correo_admin = ?';
        $params = array($value, $value);
        return Database::getRow($sql, $params);
    }
}
