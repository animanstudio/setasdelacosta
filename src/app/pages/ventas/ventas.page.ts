import { Component, OnInit } from '@angular/core';
import { ModalController} from '@ionic/angular';
import { ServicesService } from 'src/app/core/services/services.service';
import { DetalleVentaPage } from './detalle-venta/detalle-venta.page';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.page.html',
  styleUrls: ['./ventas.page.scss'],
})
export class VentasPage implements OnInit {
  ventas: any[] = [];
  
  currentPage: number = 1;
  itemsPerPage: number = 8;
  displayedItems: any[] = [];
  totalPages: any;

  idventa!: number;
  pedidoId!: number;

  constructor(
    private service: ServicesService,
    private modalController: ModalController,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadVentas();
  }

  loadVentas() {
    this.service.obtenerVentas().subscribe(
      (data) => {
        this.ventas = data;
        this.updateDisplayedItems();
        console.log(this.ventas);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  updateDisplayedItems() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedItems = this.ventas.slice(startIndex, endIndex);
  }

  iraVentas() {    
    this.router.navigate(['ventas', 'crear']);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedItems();
    }
  }

  nextPage() {
    const totalPages = Math.ceil(this.ventas.length / this.itemsPerPage);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.updateDisplayedItems();
    }
  }

  async verDetalle(idPedido: string) {
    this.pedidoId = Number(idPedido)
    console.log('ID del pedido:', idPedido);
    const modal = await this.modalController.create({
      component: DetalleVentaPage,
      componentProps: {
        idPedido: idPedido
      }
    });
    await modal.present();
  }
}
