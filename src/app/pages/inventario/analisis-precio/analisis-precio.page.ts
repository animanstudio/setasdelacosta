import { Component, Input, OnInit} from '@angular/core';
import { ServicesService } from 'src/app/core/services/services.service';



@Component({
  selector: 'app-analisis-precio',
  templateUrl: './analisis-precio.page.html',
  styleUrls: ['./analisis-precio.page.scss'],
})
export class AnalisisPrecioPage implements OnInit {

  @Input() idProducto!: number;
  datosProducto: any[] = [];
  precios: any[] = [];
  fechas: any[] = [];


  constructor(
    private service: ServicesService
  ) {
  }

  ngOnInit() {
    console.log(this.idProducto);
    this.consultarPrecio();
  }

  
  consultarPrecio() {
    this.service.variacionPrecio(this.idProducto).subscribe(
      (data) => {
        this.datosProducto = Object.values(data);
        console.log(this.datosProducto);

        // Crear un nuevo array solo con los precios unitarios de compra
        const preciosUnitariosCompra = this.datosProducto.map(item => parseFloat(item.precio_unitario_compra));
        this.precios = preciosUnitariosCompra;
        console.log(this.precios);

        // Extraer solo la fecha de cada item, sin la hora
        const fechas = this.datosProducto.map(item => item.fecha.split(' ')[0]);
        this.fechas = fechas;
        console.log(this.fechas);

        // Llama a `crearGrafico` después de que los datos han sido actualizados
        
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
