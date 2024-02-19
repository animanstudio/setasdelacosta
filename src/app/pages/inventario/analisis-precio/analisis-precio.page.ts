import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexNonAxisChartSeries,
} from 'ng-apexcharts';
import { ServicesService } from 'src/app/core/services/services.service';

// Aquí hemos quitado Partial, asegurando que todas las propiedades sean definidas
export type ChartOptions = {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries; // Asegúrate de que este tipo sea correcto según lo esperado por el componente
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-analisis-precio',
  templateUrl: './analisis-precio.page.html',
  styleUrls: ['./analisis-precio.page.scss'],
})
export class AnalisisPrecioPage implements OnInit {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions!: ChartOptions; // Ya no es Partial

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

  crearGrafico() {
    this.chartOptions = {
      series: [
        {
          name: 'papa capira',
          data: this.precios
        },
      ],
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
      },
      title: {
        text: 'VARIACIÓN PRECIO',
        align: 'left',
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: this.fechas
      },
    };
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
        this.crearGrafico();
      },
      (error) => {
        console.error(error);
      }
    );
  }



}
