import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/core/services/services.service';

@Component({
  selector: 'app-abonos',
  templateUrl: './abonos.page.html',
  styleUrls: ['./abonos.page.scss'],
})
export class AbonosPage implements OnInit {

  abonos: any[] = [];

  currentPage: number = 1;
  itemsPerPage: number = 8;
  displayedItems: any[] = [];
  totalPages: any;

  constructor(
    private service: ServicesService
  ) { }

  ngOnInit() {
    this.loadAbonos();
  }

  loadAbonos() {
    this.service.obtenerAbonos().subscribe(
      (data) => {
        this.abonos = data;        
        console.log(this.abonos);
        this.updateDisplayedItems();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  updateDisplayedItems() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedItems = this.abonos.slice(startIndex, endIndex);
  }

  
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedItems();
    }
  }

  nextPage() {
    const totalPages = Math.ceil(this.abonos.length / this.itemsPerPage);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.updateDisplayedItems();
    }
  }

}
