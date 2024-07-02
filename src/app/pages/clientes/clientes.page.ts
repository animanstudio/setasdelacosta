import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ServicesService } from 'src/app/core/services/services.service';
import { CrearPage } from './crear/crear.page';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ActualizarPage } from './actualizar/actualizar.page';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {

  clientes: any[] = [];
  displayedItems: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 8;
  searchTerm$ = new BehaviorSubject<string>(''); 
  totalPages: any;
  clienteForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: ServicesService,
    private modalController: ModalController,
    private alertController: AlertController
  ) { 
    this.clienteForm = this.fb.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      vendedor: ['', Validators.required],
      tipo_cliente: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.searchTerm$.pipe(
      debounceTime(300), 
      distinctUntilChanged() 
    ).subscribe(() => {
      this.updateDisplayedItems(); 
    });
    this.cargarClientes(); 
  }

  // Método para mostrar el alert y confirmar eliminación
  async confirmarBorrarCliente(id: number) {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Estás seguro de que deseas eliminar este cliente?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Eliminación cancelada');
          }
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.borrarCliente(id);
          }
        }
      ]
    });
    await alert.present();
  }
  
  borrarCliente(id: number) {
    console.log(id);
    this.service.eliminarCliente(id).subscribe(
      response => {
        
      },
      error => {
        
      }
    );
  } 

  async actualizarCliente(id: any) {
    console.log("id del cliente: ", id);
    const modal = await this.modalController.create({
      component: ActualizarPage,
      componentProps: { clienteId: id } 
    });    
    modal.onDidDismiss().then(() => {
      this.cargarClientes(); 
    });  
    return await modal.present();
  }

  cargarClientes() {
    this.service.obtenerClientes().subscribe(
      (data) => {
        this.clientes = data;        
        this.updateDisplayedItems(); 
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

  updateDisplayedItems() {
    const searchTerm = this.searchTerm$.value.toLowerCase(); 
    const filteredClients = this.clientes.filter(cliente =>
      cliente.nombre.toLowerCase().includes(searchTerm)
    );

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, filteredClients.length);
    this.displayedItems = filteredClients.slice(startIndex, endIndex);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedItems();
    }
  }

  nextPage() {
    const totalPages = Math.ceil(this.clientes.length / this.itemsPerPage);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.updateDisplayedItems();
    }
  }

  onSearchInput(event: any) {
    this.searchTerm$.next(event.target.value); 
  }
}
