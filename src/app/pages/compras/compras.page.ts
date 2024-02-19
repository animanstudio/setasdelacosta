import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ServicesService } from 'src/app/core/services/services.service';
import { CrearPage } from './crear/crear.page';
import { DetalleCompraPage } from './detalle-compra/detalle-compra.page';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.page.html',
  styleUrls: ['./compras.page.scss'],
})
export class ComprasPage implements OnInit {

  compras: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 8;
  displayedItems: any[] = [];
  totalPages: any;
  pedidoId!: number;

  constructor(
    private service: ServicesService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.loadCompras();
  }

  loadCompras() {
    this.service.obtenerCompras().subscribe(
      (data) => {
        this.compras = data;
        this.totalPages = Math.ceil(this.compras.length / this.itemsPerPage); // Calcula el número total de páginas
        this.updateDisplayedItems(); // Actualiza los elementos mostrados
        console.log(this.compras);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: CrearPage,
      componentProps: {}
    });

    modal.onDidDismiss().then(() => {
      this.loadCompras(); 
    });

    return await modal.present();
  }

  updateDisplayedItems() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    console.log(this.itemsPerPage);
    this.displayedItems = this.compras.slice(startIndex, endIndex);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedItems();
    }
  }

  nextPage() {
    const totalPages = Math.ceil(this.compras.length / this.itemsPerPage);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.updateDisplayedItems();
    }
  }

  async verDetalle(idPedido: string) {
    this.pedidoId = Number(idPedido)
    console.log('ID del pedido:', idPedido);
    const modal = await this.modalController.create({
      component: DetalleCompraPage,
      componentProps: {
        idPedido: idPedido
      }
    });
    await modal.present();
  }
}
