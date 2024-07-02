import { Component, Input, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { ServicesService } from 'src/app/core/services/services.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-detalle-venta',
  templateUrl: './detalle-venta.page.html',
  styleUrls: ['./detalle-venta.page.scss'],
})
export class DetalleVentaPage implements OnInit {

  detallesPedido: any[] = [];
  datosPedido: any[] = [];
  totalPedido!: number;

  cliente: any;
  datosCliente: any[] = [];
  idCliente: any;

  nombreCliente: any;
  dirCliente: any;
  vendedor: any;
  telefono: any;

  @Input() idPedido!: number;

  constructor(
    private service: ServicesService
  ) { }

  ngOnInit() {
    console.log(this.idPedido);
    this.consultarPedido();
  }

  consultarPedido() {
    this.service.detalleVenta(this.idPedido).pipe(
      switchMap((data) => {
        // Manejar la respuesta de detalleVenta
        this.datosPedido[0] = Object.values(data);
        console.log(this.datosPedido);
        this.detallesPedido = this.datosPedido[0][0];
        this.totalPedido = this.datosPedido[0][1];
        this.idCliente = this.datosPedido[0][0][0].id_cliente;
        console.log(this.idCliente);

        // Llamar al servicio datosCliente usando el idCliente obtenido
        return this.service.datosCliente(this.idCliente);
      })
    ).subscribe(
      (data) => {
        // Manejar la respuesta de datosCliente
        this.datosCliente[0] = Object.values(data);
        this.nombreCliente = this.datosCliente[0][0];
        this.dirCliente = this.datosCliente[0][1];
        this.telefono = this.datosCliente[0][2];
        this.vendedor = this.datosCliente[0][3];
      },
      (error) => {
        console.error('Error en consultarPedido:', error);
      }
    );
  }

  generatePDF() {
    const detallesPedidoTable = this.detallesPedido.map(detalle => {
      return [
        detalle.nombre_producto,
        { text: detalle.descuento_venta, alignment: 'center' },
        { text: detalle.cantidad, alignment: 'center' },
        { text: "$ " + detalle.precio_unitario_venta, alignment: 'right' },
        { text: "$ " + detalle.subtotal, alignment: 'right' }
      ];
    });

    const totalPedidoRow = ['TOTAL COMPRA: ', '', '', '', { text: this.totalPedido.toLocaleString('en-US', { style: 'currency', currency: 'USD' }), alignment: 'right', bold: true }];
    detallesPedidoTable.push(totalPedidoRow);

    const documentDefinition = {
      content: [
        { text: 'DETALLE VENTA: ' + this.idPedido, style: 'header' },
        { text: 'Cliente: ' + this.nombreCliente, style: 'header' },
        { text: 'Dirección: ' + this.dirCliente, style: 'header' },
        { text: 'Teléfono: ' + this.telefono, style: 'header' },
        { text: 'Vendedor: ' + this.vendedor, style: 'header' },
        { text: '\n' }, // Espacio en blanco antes de la tabla

        // Definir la tabla con los detalles del pedido
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto', 'auto'], // Ancho de cada columna
            body: [
              ['Nombre Producto', 'Descuento', 'Cantidad', 'Precio Unitario', 'Subtotal'], // Encabezados de la tabla
              ...detallesPedidoTable // Filas de la tabla basadas en detallesPedido
            ]
          }
        }
      ],
      styles: {
        header: {
          fontSize: 14,
          bold: true
        },
        body: {
          fontSize: 12
        }
      }
    };
    const archivo = "pedido" + this.idPedido;
    pdfMake.createPdf(documentDefinition).download(archivo);
  }
}
