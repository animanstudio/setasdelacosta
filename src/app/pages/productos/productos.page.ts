import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/core/services/services.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {

  productos: any[] = [];

  constructor(
    private service: ServicesService
  ) { }

  ngOnInit() {
    this.service.obtenerProductos().subscribe(
      (data) => {
        this.productos = data;
        console.log(this.productos);
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
