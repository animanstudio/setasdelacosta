import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { ServicesService } from 'src/app/core/services/services.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.page.html',
  styleUrls: ['./crear.page.scss'],
})
export class CrearPage implements OnInit {

  vendedores: any[] = [];

  nombre: string | undefined;
  direccion: string | undefined;
  telefono: number | undefined;
  vendedor: string | undefined;
  tipo_cliente: string | undefined;

  constructor(
    private service: ServicesService,
    private modalController: ModalController,
    private toastControl: ToastController
  ) { }

  ngOnInit() {
    this.cargarVendedores();
  }

  crearCliente() {
    if (this.telefono && (this.telefono === 2147483647 || this.telefono < 100000 || this.telefono > 9999999999)) {
      this.mostrarToast('Número de teléfono no válido.');
      return;
    }

    const cliente = {
      nombre: this.nombre,
      direccion: this.direccion,
      telefono: this.telefono,    
      vendedor: this.vendedor,
      tipo_cliente: this.tipo_cliente,        
      estado: "activo"
    }  

    console.log(cliente); 
        
    this.service.crearCliente(cliente).subscribe(
      async response => {
        console.log('Cliente creado exitosamente:', response);  
        this.modalController.dismiss();    
        this.mostrarToast('Cliente creado exitosamente');
      },
      error => {
        console.error('Error al crear cliente:', error);        
      }
    );    
  }

  cargarVendedores(){
    this.service.obtenerVendedores().subscribe(
      (data) =>{
        this.vendedores = data; 
        console.log(this.vendedores);
      }
    )
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
