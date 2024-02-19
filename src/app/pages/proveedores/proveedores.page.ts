import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/core/services/services.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.page.html',
  styleUrls: ['./proveedores.page.scss'],
})
export class ProveedoresPage implements OnInit {

  proveedores: any[] = [];

  constructor(
    private service: ServicesService
  ) { }

  ngOnInit() {
    this.service.obtenerProveedores().subscribe(
      (data) => {
        this.proveedores = data;
        console.log(this.proveedores);
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
