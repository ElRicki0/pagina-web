<?php
// Se incluye la clase con las plantillas para generar reportes.
require_once('../../helpers/report.php');

// Se instancia la clase para crear el reporte.
$pdf = new Report;

// Se verifica si existe un valor para el cliente, de lo contrario se muestra un mensaje.
if (isset($_GET['idCliente'])) {
    // Se incluyen las clases para la transferencia y acceso a datos.
    require_once('../../models/data/cliente_data.php');
    require_once('../../models/data/pedidos_data.php');

    // Se instancian las entidades correspondientes.
    $cliente = new ClienteData;
    $pedido = new PedidoData;

    // Se establece el valor del cliente, de lo contrario se muestra un mensaje.
    if ($cliente->setId($_GET['idCliente']) && $pedido->setPedido($_GET['idCliente'])) {
        // Se verifica si el cliente existe, de lo contrario se muestra un mensaje.
        if ($rowCliente = $cliente->readOne()) {
            // Se inicia el reporte con el encabezado del documento.
            $pdf->startReport('Pedidos realizados por : ' . $rowCliente['nombre_cliente']);

            // Se verifica si existen registros para mostrar, de lo contrario se imprime un mensaje.
            if ($dataClientes = $cliente->reporteCliente()) {
                // Se establece un color de relleno para los encabezados.
                $pdf->setFillColor(0, 21, 26);
                // Se establece la fuente para los encabezados.
                $pdf->setFont('Times', 'B', 15);
                $pdf->SetTextColor(237, 237, 237);
                // Se imprimen las celdas con los encabezados.
                $pdf->cell(85, 10, 'Nombre Producto', 1, 0, 'C', 1);
                $pdf->cell(40, 10, $pdf->encodeString('Dirección Pedido'), 1, 0, 'C', 1);
                $pdf->cell(30, 10, 'Cantidad', 1, 0, 'C', 1);
                $pdf->cell(40, 10, 'Fecha de pedido', 1, 1, 'C', 1);


                // Se establece la fuente para los datos de los productos.
                $pdf->setFont('Times', 'B', 15);

                // Se recorren los registros fila por fila.
                foreach ($dataClientes as $rowCliente) {
                    // Guardar la posición Y actual
                    $yStart = $pdf->GetY();
                    // Guardar la posición X antes de la multicelda
                    $xStart = $pdf->GetX();

                    // Imprimir la multicelda y obtener su altura
                    $pdf->MultiCell(85, 10, $pdf->encodeString($rowCliente['productos_pedidos']), 1, 'C');
                    $yEnd = $pdf->GetY();
                    $multiCellHeight = $yEnd - $yStart;

                    // Volver a la posición X inicial y Y inicial
                    $pdf->SetXY($xStart + 85, $yStart);

                    // Imprimir las celdas fijas con la altura de la multicelda
                    $pdf->cell(40, $multiCellHeight, $rowCliente['direccion_pedido'], 1, 0, 'C');
                    $pdf->cell(30, $multiCellHeight, $rowCliente['cantidad_productos_pedidos'], 1, 0, 'C');
                    $pdf->cell(40, $multiCellHeight, $rowCliente['fecha_registro'], 1, 1, 'C');
                }
            } else {
                // Si no hay pedidos, se muestra un mensaje en el reporte.
                $pdf->cell(0, 10, $pdf->encodeString('No hay pedidos de este cliente'), 1,  'C');
            }

            // Se llama implícitamente al método footer() y se envía el documento al navegador web.
            $pdf->output('I', 'Pedidos_cliente.pdf');
        } else {
            // Mensaje en caso de que el cliente no exista.
            print('Cliente inexistente');
        }
    } else {
        // Mensaje en caso de que el cliente sea incorrecto.
        print('Cliente incorrecto');
    }
} else {
    // Mensaje en caso de que no se haya seleccionado un cliente.
    print('Debe seleccionar un cliente');
}
