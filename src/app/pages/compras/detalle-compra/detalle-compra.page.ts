import { Component, Input, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/core/services/services.service';

@Component({
  selector: 'app-detalle-compra',
  templateUrl: './detalle-compra.page.html',
  styleUrls: ['./detalle-compra.page.scss'],
})
export class DetalleCompraPage implements OnInit {

  detallesPedido: any[] = [];
  datosPedido: any [] = [];
  totalPedido!: number; 

  cliente: any;  

  @Input() idPedido!: number;
  
  constructor(
    private service: ServicesService
  ) { }

  ngOnInit() {
    console.log(this.idPedido);
    this.consultarCompra();
  }

  consultarCompra() {
    this.service.detalleCompra(this.idPedido).subscribe(
      (data) => {       
        this.datosPedido = Object.values(data);
        console.log(this.datosPedido[3]);
        
        this.detallesPedido = this.datosPedido[3];  
        console.log(this.detallesPedido);
        this.totalPedido = this.datosPedido[1];

        this.cliente = this.datosPedido[2];
        console.log(this.datosPedido);
      
      },
      (error) => {
        console.error(error);
      }
    );    
  }

}
