<?php
// Se incluye la clase con las plantillas para generar reportes.
require_once('../../helpers/report.php');
// Se incluyen las clases para la transferencia y acceso a datos.
require_once('../../models/data/productos_data.php');
require_once('../../models/data/categoria_data.php');

// Se instancia la clase para crear el reporte.
$pdf = new Report;
// Se inicia el reporte con el encabezado del documento.
$pdf->startReport('Productos por Categoria');
// Se instancia el módelo Categoría para obtener los datos.
$categoria = new CategoriaData;
// Se verifica si existen registros para mostrar, de lo contrario se imprime un mensaje.
if ($dataCategorias = $categoria->readAll()) {
    // Se establece un color de relleno para los encabezados.
    $pdf->setFillColor(0, 21, 26);
    // Se establece la fuente para los encabezados.
    $pdf->setFont('Times', 'B', 18);
    $pdf->SetTextColor(223, 223, 223);
    // Se imprimen las celdas con los encabezados.
    $pdf->cell(120, 10, 'Nombre del producto    ', 1, 0, 'C', 1);
    $pdf->cell(40, 10, 'Precio (US$)', 1, 0, 'C', 1);
    $pdf->cell(30, 10, 'Cantidad', 1, 1, 'C', 1);

    // Se establece un color de relleno para mostrar el nombre de la categoría.
    $pdf->setFillColor(0, 21, 26);
    // Se establece la fuente para los datos de los productos.
    $pdf->setFont('Times', '', 14);

    // Se recorren los registros fila por fila.
    foreach ($dataCategorias as $rowCategoria) {
        $pdf->SetTextColor(223, 223, 223);
        $pdf->setFont('Times', 'B', 20);
        // Se imprime una celda con el nombre de la categoría.
        $pdf->cell(190, 12, $pdf->encodeString('Nombre de la categoria: ' . $rowCategoria['nombre_categoria_producto']), 1, 1, 'C', 1);
        // Se instancia el módelo Producto para procesar los datos.
        $producto = new ProductoData;
        // Se establece la categoría para obtener sus productos, de lo contrario se imprime un mensaje de error.
        if ($producto->setCategoria($rowCategoria['id_categoria_producto'])) {
            // Se verifica si existen registros para mostrar, de lo contrario se imprime un mensaje.
            if ($dataProductos = $producto->productosCategoria()) {
                // Se recorren los registros fila por fila.
                foreach ($dataProductos as $rowProducto) {
                    $pdf->SetTextColor(10, 10, 10);
                    $pdf->setFont('Times', 'B', 16);
                    // Se imprimen las celdas con los datos de los productos.
                    $pdf->cell(120, 10, $pdf->encodeString($rowProducto['nombre_producto']), 1, 0);
                    $pdf->cell(40, 10, $rowProducto['precio_producto'], 1, 0);
                    $pdf->cell(30, 10, $rowProducto['cantidad_producto'], 1, 1);
                }
            } else {
                $pdf->SetTextColor(10, 10, 10);
                $pdf->setFont('Times', 'B', 16);
                $pdf->cell(190, 10, $pdf->encodeString('No hay productos para la categoria'), 1, 1);
            }
        } else {
            $pdf->cell(0, 10, $pdf->encodeString('Categoria incorrecta o inexistente'), 1, 1);
        }
    }
} else {
    $pdf->SetTextColor(10, 10, 10);
    $pdf->setFont('Times', 'B', 16);
    $pdf->cell(0, 10, $pdf->encodeString('No hay categorias para mostrar'), 1, 1);
}
// Se llama implícitamente al método footer() y se envía el documento al navegador web.
$pdf->output('I', 'productos.pdf');
