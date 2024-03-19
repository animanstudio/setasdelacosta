import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { ServicesService } from 'src/app/core/services/services.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.page.html',
  styleUrls: ['./crear.page.scss'],
})
export class CrearPage implements OnInit {

  nombre: string | undefined;
  direccion: string | undefined;
  telefono: number | undefined;

  constructor(
    private service: ServicesService,
    private modalController: ModalController,
    private toastControl: ToastController
  ) { }

  ngOnInit() {
  }

  crearCliente() {
    const cliente = {
      nombre: this.nombre,
      direccion: this.direccion,
      telefono: this.telefono,            
      estado: "activo"
    }
   

    console.log(cliente); 
        
    this.service.crearCliente(cliente).subscribe(
      async response => {
        console.log('Pedido enviado exitosamente:', response);  
        this.modalController.dismiss();    
        this.mostrarToast('Producto creado exitosamente');
      },
      error => {
        console.error('Error al enviar pedido:', error);        
      }
    );    
  }

  async mostrarToast(mensaje: string) {
    const toast = await this.toastControl.create({
      message: mensaje,
      duration: 2000, 
      position: 'bottom' 
    });
    toast.present();
  }

}

