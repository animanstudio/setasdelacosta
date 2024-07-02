import { Component, OnInit } from '@angular/core';
import { ModalController} from '@ionic/angular';
import { ServicesService } from 'src/app/core/services/services.service';
import { DetalleVentaPage } from './detalle-venta/detalle-venta.page';
import { Router } from '@angular/router';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.page.html',
  styleUrls: ['./ventas.page.scss'],
})
export class VentasPage implements OnInit {
  ventas: any[] = [];
  
  currentPage: number = 1;
  itemsPerPage: number = 9;
  displayedItems: any[] = [];
  totalPages: any;

  idventa!: number;
  pedidoId!: number;

  currentDate!: string;
  pastDate!:string;

  constructor(
    private service: ServicesService,
    private modalController: ModalController,
    private router: Router
  ) { }

  ngOnInit() {    
    this.getCurrentDate();
    this.subtractDaysFromCurrentDate(7);
    this.loadVentas();
  }

  getCurrentDate() {
    const date = new Date();
    this.currentDate = date.toISOString().split('T')[0]; 
    console.log(this.currentDate);
  }

  subtractDaysFromCurrentDate(days: number) {
    const date = new Date(this.currentDate);
    date.setDate(date.getDate() - days);
    this.pastDate = date.toISOString().split('T')[0]; 
    console.log(this.pastDate);
  }

  loadVentas() {
    this.service.obtenerVentasxFecha(this.pastDate, this.currentDate).subscribe(
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

  updateDates() {
    this.loadVentas();
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
