import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ServicesService } from 'src/app/core/services/services.service';
import { CrearProductoPage } from './crear-producto/crear-producto.page';
import { BehaviorSubject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.page.html',
  styleUrls: ['./inventario.page.scss'],
})
export class InventarioPage implements OnInit {

  inventario: any[] = [];

  productos: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 8;
  displayedItems: any[] = [];
  totalPages: any;
  searchTerm$ = new BehaviorSubject<string>('');
  
  productoId!: number;

  constructor(
    private service: ServicesService,
    private modalController: ModalController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.searchTerm$.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(() => {
      this.updateDisplayedItems();
    });
    this.loadInventario();
  }

  loadInventario() {
    this.service.obtenerInventario().subscribe(
      (data) => {
        this.productos = data;
        console.log('Productos cargados:', this.productos);
        this.updateDisplayedItems();
      },
      (error) => {
        console.error('Error al cargar inventario:', error);
      }
    );
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: CrearProductoPage,
      componentProps: {}
    });

    modal.onDidDismiss().then((data) => {
      if (data && data.data && data.data.cantidad) {
        const cantidadNueva = data.data.cantidad;

        // Aquí puedes llamar al servicio para actualizar la cantidad en el inventario
        const idProducto = 123; // Reemplaza con el id del producto adecuado
        this.service.actualizarCantidad(this.productoId, cantidadNueva)
          .subscribe(
            (response) => {
              console.log('Cantidad actualizada correctamente:', response);
              // Vuelve a cargar el inventario después de la actualización
              this.loadInventario();
            },
            (error) => {
              console.error('Error al actualizar cantidad:', error);
              // Maneja el error si es necesario
            }
          );
      }
    });

    return await modal.present();
  }
  
  async cargarInventario(id_producto: number) {
    this.productoId = id_producto;
    console.log(this.productoId);
    const alert = await this.alertController.create({
      header: 'Ingrese la nueva cantidad',
      inputs: [
        {
          name: 'cantidad',
          type: 'number',
          placeholder: 'Cantidad',
          min: 1 // Define un mínimo si es necesario
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Aceptar',
          handler: (data) => {
            const nuevaCantidad = data.cantidad;
            console.log(nuevaCantidad);
            // Aquí puedes llamar al servicio para actualizar la cantidad en el inventario
            this.service.actualizarCantidad(this.productoId, nuevaCantidad)
              .subscribe(
                (response) => {
                  console.log('Cantidad actualizada correctamente:', response);
                  // Vuelve a cargar el inventario después de la actualización
                  this.loadInventario();
                },
                (error) => {
                  console.error('Error al actualizar cantidad:', error);
                  // Maneja el error si es necesario
                }
              );
          }
        }
      ]
    });  
    await alert.present();
  }

  async confirmarEliminarProducto(id: number) {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Estás seguro de que deseas eliminar este producto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Eliminación cancelada');
          }
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.eliminarProducto(id);
          }
        }
      ]
    });

    await alert.present();
  }

  eliminarProducto(id: number) {
    console.log(id);
    this.service.eliminarProducto(id).subscribe(
      response => {
        console.log('Producto eliminado con éxito', response);
        // Lógica adicional para manejar la respuesta exitosa
      },
      error => {
        console.error('Error al eliminar el producto', error);
        // Lógica adicional para manejar errores
      }
    );
  }

  updateDisplayedItems() {
    const searchTerm = this.searchTerm$.value.toLowerCase();
    const filteredProductos = this.productos.filter(producto =>
      producto.nombre.toLowerCase().includes(searchTerm)
    );
  
    this.totalPages = Math.ceil(filteredProductos.length / this.itemsPerPage);
  
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, filteredProductos.length);
    this.displayedItems = filteredProductos.slice(startIndex, endIndex);
  }

  onSearchInput(event: any) {
    this.searchTerm$.next(event.target.value);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedItems();
    }
  }
  
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedItems();
    }
  }

}
