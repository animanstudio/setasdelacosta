import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { ServicesService } from 'src/app/core/services/services.service';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.page.html',
  styleUrls: ['./actualizar.page.scss'],
})
export class ActualizarPage implements OnInit {
  vendedores: any[] = [];
  cliente: any; 
  clienteId: any; 

  nombre: any;
  direccion: any;
  telefono: any;
  vendedor: any;
  tipo_cliente: any;

  constructor(
    private service:ServicesService,
    private navParams: NavParams,
    private modalController: ModalController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.clienteId = this.navParams.get('clienteId');
    console.log('Cliente ID:', this.clienteId);
    this.cargarVendedores();
    this.cargarCliente();
  }

  cargarCliente(){
    this.service.datosCliente(this.clienteId).subscribe(
      (data) =>{
        this.cliente = data; 
        console.log("datos cliente: ", this.cliente);
      }
    )
  }

  cargarVendedores(){
    this.service.obtenerVendedores().subscribe(
      (data) =>{
        this.vendedores = data; 
        console.log("datos vendedores: ", this.vendedores);
      }
    )
  }

  actualizarCliente() {
    const updatedCliente = {
      nombre: this.cliente.nombre,
      direccion: this.cliente.direccion,
      telefono: this.cliente.telefono,
      vendedor: this.cliente.vendedor,
      tipo_cliente: this.cliente.tipo_cliente
    };

    this.service.actualizarCliente(this.clienteId, updatedCliente).subscribe(
      async (response) => {        
        this.modalController.dismiss();
        await this.presentToast('Cliente actualizado exitosamente');
      },
      (error) => {
        console.error('Error al actualizar cliente:', error);
      }
    );
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }

}
