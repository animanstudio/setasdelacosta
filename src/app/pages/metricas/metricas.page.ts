import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/core/services/services.service';
import { Color, ScaleType } from '@swimlane/ngx-charts';


@Component({
  selector: 'app-metricas',
  templateUrl: './metricas.page.html',
  styleUrls: ['./metricas.page.scss'],
})
export class MetricasPage implements OnInit {
  view: [number, number] = [350, 500]; // Dimensiones del gráfico

  ventasPorMes: any[] = [];
  ventasPorVendedor: any[] = [];
  productosMasVendidos: any[] = [];
  
  multi: any[] = []; // Datos para el gráfico
  multiMes: any[] = []; // Datos para el gráfico
  pieData: any[] = []; // Datos para el gráfico de pie

  // Configuración del gráfico
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;  
  showDataLabel: boolean = true;
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;
  labels: boolean = true;
  yAxisLabel: string = 'Ventas';
  /*xAxisLabel: string = 'Vendedores';*/
  colorScheme: Color = {
    name: 'custom', // Nombre del esquema de colores
    selectable: true, // Permite seleccionar colores
    group:  ScaleType.Ordinal, // Tipo de grupo (Ordinal, Linear)
    domain: ['#5AA454', '#E44D25', '#C7B42C', '#AAAAAA'], // Arreglo de colores
  };
  

  constructor(private service: ServicesService) {    
  }

  ngOnInit() {
    this.ObtenerVentasVendedor();
    this.ObtenerVentasMes();
    this.ObtenerMasVendidos();
  }

  ObtenerVentasVendedor() {
    this.service.obtenerVentasPorVendedor().subscribe(
      (data) => {
        this.ventasPorVendedor = data;
        this.GraficoVendedor();
        console.log(this.ventasPorVendedor);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  ObtenerMasVendidos() {
    this.service.obtenerProductosMasVendidos().subscribe(
      (data) => {
        this.productosMasVendidos = data;
        this.GraficoMasVendidos();
        console.log(this.productosMasVendidos);
      },
      (error) => {
        console.error(error);
      }
    );
  }



  ObtenerVentasMes() {
    this.service.obtenerVentasPorMes().subscribe(
      (data) => {
        this.ventasPorMes = data;        
        console.log(this.ventasPorMes);
        this.GraficoVentasMes();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  GraficoVendedor() {
    // Transformar los datos de ventasPorMes al formato requerido por ngx-charts
    this.multi = this.ventasPorVendedor.map((item) => {
      return {
        name: item.vendedor, // Nombre del mes
        value: item.total_ventas, // Valor de las ventas
      };
    });
  }

  GraficoVentasMes(){
    // Transformar los datos de ventasPorMes al formato requerido por ngx-charts
    this.multiMes = this.ventasPorMes.map((item) => {
      return {
        name: item.mes, // Nombre del mes
        value: item.total_ventas, // Valor de las ventas
      };
    });
  }

  GraficoMasVendidos(){
    // Transformar los datos de ventasPorMes al formato requerido por ngx-charts
    this.pieData = this.productosMasVendidos.map((item) => {
      return {
        name: item.producto, // Nombre del mes
        value: item.cantidad_vendida, // Valor de las ventas
      };
    });
  }


  onSelect(event: any) {
    console.log('Item clicked', event);
  }

  onActivate(event: any) {
    console.log('Activate', event);
  }

  onDeactivate(event: any) {
    console.log('Deactivate', event);
  }
}
