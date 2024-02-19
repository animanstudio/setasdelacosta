import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { ServicesService } from 'src/app/core/services/services.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.page.html',
  styleUrls: ['./crear.page.scss'],
})
export class CrearPage implements OnInit {

  proveedorControl = new FormControl();
  cantidadIngresada = new FormControl(1);
  precioCompra = new FormControl(100);

  dbproveedores: any[] = [];
  productos: any[] = [];

  sellItems: {
    precio_unitario_compra: any;
    id_producto: number,
    cantidad: number
  }[] = [];

  selectedItems: {
    nombre: string,
    id_producto: number,
    cantidad: number,
    total: number,
    precio_unitario_compra: any //
  }[] = [];

  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: ServicesService,
    private modalController: ModalController,
    private toastControl: ToastController
  ) {
    this.formGroup = this.formBuilder.group({
      clienteControl: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadInitialData();
  }

  loadInitialData() {
    this.service.obtenerProductos().subscribe(
      (data) => {
        this.productos = data;
        console.log(this.productos);
      },
      (error) => {
        console.error(error);
      }
    );

    this.service.obtenerProveedores().subscribe(
      (data) => {
        this.dbproveedores = data;
        console.log(this.dbproveedores);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  addItem(item: any): void {
    const cantidadProducto = this.cantidadIngresada.value ?? 1; 
    const precioUnitarioVenta = this.precioCompra.value;
    const newItem = {
      nombre: item.nombre,
      id_producto: item.id_producto,
      cantidad: cantidadProducto,
      precio_unitario_compra: precioUnitarioVenta,
      total: item.precio_unitario_venta
    };
    this.selectedItems.push(newItem);

    const sellItem = {
      id_producto: item.id_producto,
      cantidad: cantidadProducto,
      precio_unitario_compra: precioUnitarioVenta
    };
    this.sellItems.push(sellItem);
    console.log(this.sellItems);
  }

  onCantidadChange(selectedItem: any, event: any): void {
    const newCantidad = event.detail.value; 
    selectedItem.cantidad = newCantidad; 
  
    // Busca el elemento correspondiente en sellItems y actualiza su cantidad
    const sellItemIndex = this.sellItems.findIndex(item => item.id_producto === selectedItem.id_producto);
    if (sellItemIndex !== -1) {
      this.sellItems[sellItemIndex].cantidad = newCantidad;
    }
  }
  

  onPrecioChange(selectedItem: any, event: any): void {
    const newPrice = event.detail.value; 
    selectedItem.precio_unitario_compra = newPrice; 
  
    // Busca el elemento correspondiente en sellItems y actualiza su cantidad
    const sellItemIndex = this.sellItems.findIndex(item => item.id_producto === selectedItem.id_producto);
    if (sellItemIndex !== -1) {
      this.sellItems[sellItemIndex].precio_unitario_compra = newPrice;
    }
  }

  crearCompra() {
    const clienteSeleccionado = this.proveedorControl.value;    
    const proveedorPedido =
    {
      "id_proveedor": clienteSeleccionado.id_proveedor,
      "productos": this.sellItems
    }
    console.log(proveedorPedido);    
    
    this.service.crearCompra(proveedorPedido).subscribe(
      async response => {
        console.log('Pedido enviado exitosamente:', response); 
        this.modalController.dismiss();     
        this.mostrarToast("Se ha realizado una compra");     
      },
      error => {
        console.error('Error al enviar pedido:', error);        
      }
    );    
  }  

  async mostrarToast(mensaje: string) {
    const toast = await this.toastControl.create({
      message: mensaje,
      duration: 2000, 
      position: 'bottom' 
    });
    toast.present();
  }
}
