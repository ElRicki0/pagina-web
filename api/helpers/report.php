<?php
// Se incluye la clase para generar archivos PDF.
require_once('../../libraries/fpdf185/fpdf.php');

/*
*   Clase para definir las plantillas de los reportes del sitio privado.
*   Para más información http://www.fpdf.org/
*/

class Report extends FPDF
{
    // Constante para definir la ruta de las vistas del sitio privado.
    const CLIENT_URL = 'http://localhost/PAGINA-WEB/views/admin/';
    // Propiedad para guardar el título del reporte.
    private $title = null;

    /*
    *   Método para iniciar el reporte con el encabezado del documento.
    *   Parámetros: $title (título del reporte).
    *   Retorno: ninguno.
    */
    public function startReport($title)
    {
        // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en los reportes.
        session_start();
        // Se verifica si un administrador ha iniciado sesión para generar el documento, de lo contrario se direcciona a la página web principal.
        if (isset($_SESSION['idAdministrador'])) {
            // Se asigna el título del documento a la propiedad de la clase.
            $this->title = $title;
            // Se establece el título del documento (true = utf-8).
            $this->setTitle('IvaneCare - Reporte', true);
            // Se establecen los margenes del documento (izquierdo, superior y derecho).
            $this->setMargins(15, 15, 15);
            // Se añade una nueva página al documento con orientación vertical y formato carta, llamando implícitamente al método header()
            $this->addPage('p', 'letter');
            // Se define un alias para el número total de páginas que se muestra en el pie del documento.
            $this->aliasNbPages();
        } else {
            header('location:' . self::CLIENT_URL);
        }
    }

    /*
    *   Método para codificar una cadena de alfabeto español a UTF-8.
    *   Parámetros: $string (cadena).
    *   Retorno: cadena convertida.
    */
    public function encodeString($string)
    {
        return mb_convert_encoding($string, 'ISO-8859-1', 'utf-8');
    }

    /*
    *   Se sobrescribe el método de la librería para establecer la plantilla del encabezado de los reportes.
    *   Se llama automáticamente en el método addPage()
    */
    public function header()
    {
        // Agregar imagen de fondo
        $this->image('../../images/FondoReporte3.png', 0, 0, 215.9, 279.4);
        // Se establece el logo.
        $this->image('../../images/logo.png', 15, 15, 20);
        // Se ubica el título.
        $this->cell(20);
        $this->setFont('Times', '', 30);
        $this->SetTextColor(0, 0, 0);
        $this->cell(166, 10, $this->encodeString($this->title), 0, 1, 'C');
        // Se ubica la fecha y hora del servidor.
        $this->cell(20);
        $this->setFont('Times', '', 14);
        $this->cell(166, 10, 'Fecha/Hora: ' . date('d-m-Y H:i:s'), 0, 1, 'C');
        // Se agrega un salto de línea para mostrar el contenido principal del documento.
        $this->ln(10);
    }

    /*
    *   Se sobrescribe el método de la librería para establecer la plantilla del pie de los reportes.
    *   Se llama automáticamente en el método output()
    */
    public function footer()
    {
        // Se establece la posición para el número de página (a 15 milímetros del final).
        $this->setY(-25);
        // Se establece la fuente para el número de página.
        $this->setFont('Times', 'I', 20);
        // Se estable un color al texto, en este caso color blanco
        $this->SetTextColor(237, 237, 237);
        // Se imprime una celda con el número de página.
        $this->cell(0, 10, $this->encodeString('Página ') . $this->pageNo() . '/{nb}', 0, 0, 'C');
        $this->Ln(10); // Salto de línea
        $this->setFont('Times', 'I', 25);
        $this->cell(0, 10, "Reporte generado por el usuario : ' ".$this->encodeString($_SESSION['aliasAdministrador']) . " ' ", 0, 0, 'C');
        $this->Ln(10); // Salto de línea
    }
}
