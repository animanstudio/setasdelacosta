import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ServicesService } from 'src/app/core/services/services.service';
import { CrearPage } from './crear/crear.page';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {

  clientes: any[] = [];

  constructor(
    private service: ServicesService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.cargarClientes();
  }

  cargarClientes(){
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

  
  async agregarCliente() {
    const modal = await this.modalController.create({
      component: CrearPage,
      componentProps: {}
    });
    modal.onDidDismiss().then(() => {
      this.cargarClientes(); 
    });
    return await modal.present();
  }

}
