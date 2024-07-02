import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ServicesService } from 'src/app/core/services/services.service';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.page.html',
  styleUrls: ['./lista-clientes.page.scss'],
})
export class ListaClientesPage implements OnInit {

  clientes: any[] = [];
  displayedItems: any[] = [];
  searchText: string = '';

  constructor(
    private service: ServicesService,
    private modalController: ModalController,
    private navParams: NavParams    
  ) { 
    this.displayedItems = this.navParams.data['displayedItems'];
  }

  ngOnInit() {
    this.cargarClientes();
  }  

  async agregarCliente(idCliente: string) {    
    await this.modalController.dismiss({ idCliente });
  }

  async seleccionarCliente(cliente: any) {
    const idCliente = cliente.id_cliente; // Asegúrate de usar la propiedad correcta para el ID
    const nombre = cliente.nombre; // Asegúrate de usar la propiedad correcta para el nombre
    await this.modalController.dismiss({ idCliente, nombre });
  }


  cargarClientes(){
    this.service.obtenerClientes().subscribe(
      (data) => {
        this.clientes = data;
        this.updateDisplayedItems();
        console.log(this.clientes);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
  filterItems(event: any) {
    const searchTerm = event.detail.value;
    this.displayedItems = this.clientes.filter(item => 
      item.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 9); // Filtra y limita a 7 elementos
  }

  updateDisplayedItems() {
    this.displayedItems = this.clientes.slice(0, 9); // Muestra máximo 7 elementos inicialmente
  }

  
}
