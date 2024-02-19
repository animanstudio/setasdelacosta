import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/core/services/services.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {

  clientes: any[] = [];

  constructor(
    private service: ServicesService
  ) { }

  ngOnInit() {
    this.service.obtenerClientes().subscribe(
      (data) => {
        this.clientes = data;
        console.log(this.clientes);
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
