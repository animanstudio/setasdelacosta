import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { ServicesService } from 'src/app/core/services/services.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.page.html',
  styleUrls: ['./crear.page.scss'],
})
export class CrearPage implements OnInit {
  clienteControl = new FormControl();
  cantidadIngresada = new FormControl(1);

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

  constructor(
    private formBuilder: FormBuilder,
    private service: ServicesService,
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

    this.productos = filtrados.slice(0, 9); // Actualiza `productos` con los primeros 9 productos filtrados
  }

  onSearchChange(event: any) {
    this.valorBusqueda = event.detail.value;
    this.filtrarProductos();
  }

  addItem(item: any): void {
    const cantidadProducto = this.cantidadIngresada.value ?? 1;
    const newItem = {
      nombre: item.nombre,
      id_producto: item.id_producto,
      unidad: item.unidad,
      cantidad: cantidadProducto,
      total: item.precio_unitario_venta
    };
    this.selectedItems.push(newItem);

    const sellItem = {
      id_producto: item.id_producto,
      cantidad: cantidadProducto
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

  async crearVenta() {
    if (!this.clienteControl.value) {
      this.mostrarToast("Falta agregar el cliente.");
      return;
    }

    const clienteSeleccionado = this.clienteControl.value;
    const clientePedido = {
      "id_cliente": clienteSeleccionado.id_cliente,
      "productos": this.sellItems
    };

    try {
      const response = await this.service.crearVenta(clientePedido).toPromise();              
      console.log('Pedido enviado exitosamente:', response);
      console.log(clientePedido);
      this.mostrarToast("Venta realizada satisfactoriamente");
    } catch (error) {
      console.error('Error al enviar pedido:', error);
      this.mostrarToast("Error al realizar la venta");
    }
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
    }
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
