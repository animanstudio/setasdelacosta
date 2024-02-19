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

  clienteControl = new FormControl();
  cantidadIngresada = new FormControl(1);

  dbclientes: any[] = [];
  productos: any[] = [];

  sellItems: {
    id_producto: number,
    cantidad: number
  }[] = [];

  selectedItems: {
    nombre: string,
    id_producto: number,
    cantidad: number,
    total: number
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

    this.service.obtenerClientes().subscribe(
      (data) => {
        this.dbclientes = data;
        console.log(this.dbclientes);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  addItem(item: any): void {
    const cantidadProducto = this.cantidadIngresada.value ?? 1; 
    const newItem = {
      nombre: item.nombre,
      id_producto: item.id_producto,
      cantidad: cantidadProducto,
      total: item.precio_unitario_venta
    };
    this.selectedItems.push(newItem);

    const sellItem = {
      id_producto: item.id_producto,
      cantidad: cantidadProducto
    };
    this.sellItems.push(sellItem);
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

  crearVenta() {
    const clienteSeleccionado = this.clienteControl.value;
    const clientePedido =
    {
      "id_cliente": clienteSeleccionado.id_cliente,
      "productos": this.sellItems
    }
    console.log(clientePedido);
    
    this.service.crearVenta(clientePedido).subscribe(
      async response => {
        console.log('Pedido enviado exitosamente:', response);   
        this.modalController.dismiss();     
        this.mostrarToast("Venta realizada satisfactoriamente");
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
