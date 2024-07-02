import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import { ServicesService } from 'src/app/core/services/services.service';
import { ModalController } from '@ionic/angular';
import { ListaClientesPage } from '../lista-clientes/lista-clientes.page';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { switchMap } from 'rxjs';
import { PedidoPage } from 'src/app/core/page/ventas/pedido/pedido.page';
import { DescuentosPage } from './descuentos/descuentos.page';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-crear',
  templateUrl: './crear.page.html',
  styleUrls: ['./crear.page.scss'],
})
export class CrearPage implements OnInit {
  clienteControl = new FormControl();
  cantidadIngresada = new FormControl(1);
  descuentoIngresado = new FormControl(0.0);
  nombreCliente: any = 'Agregar cliente...';

  listaClientes: any[] = [];

  valorBusqueda: string = '';
  productosCompletos: any[] = [];

  dbclientes: any[] = [];
  productos: any[] = [];
  sellItems: any[] = [];

  selectedItems: any[] = [];
  formGroup: FormGroup;

  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 0;

  descuentoMaximo: any;

  /* DATOS PARA GENERAR EL PDF */
  detallesPedido: any[] = [];
  datosPedido: any[] = [];
  totalPedido!: number;

  cliente: any;
  datosCliente: any[] = [];
  idCliente: any;
  
  dirCliente: any;
  vendedor: any;
  telefono: any;
  idPedido: any;

  constructor(
    private formBuilder: FormBuilder,
    private service: ServicesService,
    private toastControl: ToastController,
    private modalController: ModalController,
    private alertController: AlertController,
    private cdr: ChangeDetectorRef
  ) {
    this.formGroup = this.formBuilder.group({
      clienteControl: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadInitialData();
  }

  async verDetalle() {        
    const modal = await this.modalController.create({
      component: PedidoPage,      
    });
    await modal.present();
  }

  loadInitialData() {
    this.service.obtenerProductos().subscribe(
      (data) => {
        this.productosCompletos = data;
        this.filtrarProductos();
      },
      (error) => {
        console.error(error);
      }
    );

    this.service.obtenerClientes().subscribe(
      (data) => {
        this.dbclientes = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  filtrarProductos() {
    let filtrados = this.productosCompletos;

    if (this.valorBusqueda && this.valorBusqueda.trim() !== '') {
      filtrados = filtrados.filter((producto) =>
        producto.nombre.toLowerCase().includes(this.valorBusqueda.toLowerCase())
      );
    }
    this.productos = filtrados.slice(0, 9); 
  }

  onSearchChange(event: any) {
    this.valorBusqueda = event.detail.value;
    this.filtrarProductos();
  }

  resetearCliente() {
    this.nombreCliente = 'Agregar cliente...';    
  }

  async buscarClientes() {
    const modal = await this.modalController.create({
      component: ListaClientesPage,
      componentProps: {
        displayedItems: this.listaClientes,
      },
    });

    modal.onDidDismiss().then(async (data) => {
      const idCliente = data?.data?.idCliente;

      if (idCliente) {        
        this.obtenerDatosCliente(idCliente);
        this.clienteControl.setValue(idCliente);
      }
    });

    await modal.present();
  }

  obtenerDatosCliente(idCliente: number): void {
    this.service.datosCliente(idCliente).subscribe(
      (data) => {
        console.log('Datos del cliente:', data);
        
        this.nombreCliente = data.nombre;
        console.log('Nombre del cliente:', this.nombreCliente);
      },
      (error) => {
        console.error('Error al obtener datos del cliente:', error);
      }
    );
  }


  addItem(item: any): void {
    const cantidadProducto = this.cantidadIngresada.value ?? 1;
    const descuentoProducto = 0;
    const newItem = {
      nombre: item.nombre,
      id_producto: item.id_producto,
      unidad: item.unidad,
      cantidad: cantidadProducto,
      total: item.precio_unitario_venta,
      descuento: descuentoProducto
    };
    this.selectedItems.push(newItem);
    const sellItem = {
      id_producto: item.id_producto,
      cantidad: cantidadProducto,
      descuento: descuentoProducto
    };
    this.sellItems.push(sellItem);
    console.log("items a vender", this.sellItems);
  }

  onCantidadChange(selectedItem: any, event: any): void {
    const newCantidad = event.detail.value;
    selectedItem.cantidad = newCantidad;
    
    const sellItemIndex = this.sellItems.findIndex(item => item.id_producto === selectedItem.id_producto);
    if (sellItemIndex !== -1) {
      this.sellItems[sellItemIndex].cantidad = newCantidad;
    }
  }

  async crearVenta() {    
    if (this.selectedItems.length === 0) {
      this.mostrarToast("Agregue al menos un producto para realizar la venta.");
      return;
    }
      
    if (!this.clienteControl.value) {
      this.mostrarToast("Falta agregar el cliente.");
      return;
    }
      
    const alert = await this.alertController.create({
      header: 'Seleccione Tipo de Venta',
      inputs: [
        {
          name: 'tipoVenta',
          type: 'radio',
          label: 'Remisión',
          value: 'REM',
          checked: true
        },
        {
          name: 'tipoVenta',
          type: 'radio',
          label: 'Contingencia',
          value: 'CON'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Aceptar',
          handler: (selectedValue) => {
            const clientePedido = {
              "id_cliente": this.clienteControl.value,
              "productos": this.sellItems,
              "tipo_venta": selectedValue
            };
  
            console.log(clientePedido);
            this.enviarSolicitudVenta(clientePedido);
          }
        }
      ]
    });
    await alert.present();
  }
  

  async enviarSolicitudVenta(clientePedido: any) {
    try {
      const response = await this.service.crearVenta(clientePedido).toPromise();
      console.log('Pedido enviado exitosamente:', response);
      this.mostrarToast("Venta realizada satisfactoriamente");
      this.resetearCampos();
      this.verDetalle();
    } catch (error) {
      console.error('Error al enviar pedido:', error);
      this.mostrarToast("Error al realizar la venta");
    }
  }

  resetearCampos() {    
    this.clienteControl.reset();
    this.cantidadIngresada.reset(1);
    this.descuentoIngresado.reset(0.0);
    this.nombreCliente = 'Agregar cliente...';
    this.selectedItems = [];
    this.sellItems = [];
  }

  async mostrarToast(mensaje: string) {
    const toast = await this.toastControl.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  cancelarItem(selectedItem: any): void {
    const index = this.selectedItems.indexOf(selectedItem);
    if (index !== -1) {
      this.selectedItems.splice(index, 1);
      this.selectedItems = [...this.selectedItems]; 
      this.cdr.detectChanges();
    }
        
    const sellItemIndex = this.sellItems.findIndex(item => item.id_producto === selectedItem.id_producto);
    if (sellItemIndex !== -1) {
      this.sellItems.splice(sellItemIndex, 1);
    }
  }
  
  async cambiarDescuento(selectedItem: any) {
    const modal = await this.modalController.create({
      component: DescuentosPage,
      componentProps: { selectedItem: selectedItem.id_producto }
    });

    modal.onDidDismiss().then((data) => {
      if (data.data) {
        const { descuento } = data.data;
        selectedItem.descuento = descuento;
        this.actualizarDescuentoItem(selectedItem.id_producto, descuento);
        this.actualizarPrecioConDescuento(selectedItem);        
        this.cdr.detectChanges();
      }
    });

    await modal.present();
  }

  actualizarDescuentoItem(idProducto: number, descuento: number) {
    const sellItem = this.sellItems.find(item => item.id_producto === idProducto);
    if (sellItem) {
      sellItem.descuento = descuento;
    }
  }

  actualizarPrecioConDescuento(item: any) {
    console.log("éste es el item", item);        
    const descuentoDecimal = item.descuento ;
    item.descuento =  descuentoDecimal;    
    item.total = item.total * (1 - descuentoDecimal);
  }

  consultarPedido() {        
    this.service.detalleVenta(this.idPedido).pipe(
      switchMap((data) => {        
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
  
  updateSelectedItems(item: any) {
    this.selectedItems.push(item);
    this.updatePagination();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.selectedItems.length / this.itemsPerPage);
    this.currentPage = 1;
    this.updatePageItems();
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePageItems();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePageItems();
    }
  }

  updatePageItems() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

  }

}
