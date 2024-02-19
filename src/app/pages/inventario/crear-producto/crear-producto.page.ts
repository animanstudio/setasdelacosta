import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { ServicesService } from 'src/app/core/services/services.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.page.html',
  styleUrls: ['./crear-producto.page.scss'],
})
export class CrearProductoPage implements OnInit {

  nombre: string | undefined;
  unidad: string | undefined;
  precio: number | undefined;

  constructor(
    private service: ServicesService,
    private modalController: ModalController,
    private toastControl: ToastController
  ) { }

  ngOnInit() {
  }

  guardarProducto() {
    const producto = {
      nombre: this.nombre,
      unidad: this.unidad,
      precio: this.precio,
      estado: "activo"
    }
    console.log(producto); 
        
    this.service.crearProducto(producto).subscribe(
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
