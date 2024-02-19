import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ServicesService } from 'src/app/core/services/services.service';
import { CrearProductoPage } from './crear-producto/crear-producto.page';
import { AnalisisPrecioPage } from './analisis-precio/analisis-precio.page';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.page.html',
  styleUrls: ['./inventario.page.scss'],
})
export class InventarioPage implements OnInit {

  inventario: any[] = [];

  currentPage: number = 1;
  itemsPerPage: number = 8;
  displayedItems: any[] = [];
  totalPages: any;
  
  productoId!: number;

  constructor(
    private service: ServicesService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.loadInventario();
  }

  loadInventario(){
    this.service.obtenerInventario().subscribe(
      (data) => {
        this.inventario = data;
        this.updateDisplayedItems();
        console.log(this.inventario);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: CrearProductoPage,
      componentProps: {}
    });
    modal.onDidDismiss().then(() => {
      this.loadInventario(); 
    });
    return await modal.present();
  }

  async analisisPrecio(idProducto: number) {
    this.productoId = Number(idProducto)
    console.log('ID del pedido:', idProducto);
    const modal = await this.modalController.create({
      component: AnalisisPrecioPage,
      componentProps: {
        idProducto: idProducto
      }
    });
    await modal.present();
  }

  updateDisplayedItems() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedItems = this.inventario.slice(startIndex, endIndex);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedItems();
    }
  }

  nextPage() {
    const totalPages = Math.ceil(this.inventario.length / this.itemsPerPage);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.updateDisplayedItems();
    }
  }
  

}
