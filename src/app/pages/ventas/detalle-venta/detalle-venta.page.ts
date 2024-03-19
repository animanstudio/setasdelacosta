import { Component, Input, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/core/services/services.service';

@Component({
  selector: 'app-detalle-venta',
  templateUrl: './detalle-venta.page.html',
  styleUrls: ['./detalle-venta.page.scss'],
})
export class DetalleVentaPage implements OnInit {

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
      this.consultarPedido();      
  } 

  consultarPedido() {
    this.service.detalleVenta(this.idPedido).subscribe(
      (data) => {       
        this.datosPedido[0] = Object.values(data);
               
        
        console.log(this.datosPedido[0][0]);

        this.detallesPedido = this.datosPedido[0][0]
        this.totalPedido = this.datosPedido[0][1]
      
      },
      (error) => {
        console.error(error);
      }
    );    
  }

}
