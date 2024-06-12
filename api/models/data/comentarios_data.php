<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');
// Se incluye la clase padre.
require_once('../../models/handler/comentarios_handler.php');
/*
 *	Clase para manejar el encapsulamiento de los datos de la tabla COMENTARIOS.
 */
class ComentarioData extends ComentarioHandler
{

    /*
     *  Atributos adicionales.
     */
    private $data_error = null;

    /*
     *   Métodos para validar y establecer los datos.
     */

    public function setId($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del producto es incorrecto';
            return false;
        }
    }

    public function setComentario($value, $min = 2, $max = 300)
    {
        if (!Validator::validateString($value)) {
            $this->data_error = 'El comentario contiene caracteres prohibidos';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->comentario = $value;
            return true;
        } else {
            $this->data_error = 'El comentario debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    public function setEstado($value)
    {
        // Valida que el estado esté en la lista de estados posibles.
        if (in_array($value, array_column($this->estado, 0))) {
            $this->estado = $value; // Asigna el estado del comentario.
            return true;
        } else {
            $this->data_error = 'Estado incorrecto'; // Almacena mensaje de error.
            return false;
        }
    }

    public function setProducto($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->producto = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del producto es incorrecto';
            return false;
        }
    }

    public function setCliente($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->cliente = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del cliente es incorrecto';
            return false;
        }
    }

    public function setEstrella($value)
    {
        // Valida que el identificador sea un número natural.
        if (Validator::validateNaturalNumber($value)) {
            $this->estrella = $value; // Asigna el valor de la nota.
            return true;
        } else {
            $this->data_error = 'No se ha seleccionado una o mas  estrella/as'; // Almacena mensaje de error.
            return false;
        }
    }

    /*
     *  Métodos para obtener el valor de los atributos adicionales.
     */
    public function getDataError()
    {
        return $this->data_error;
    }
}
