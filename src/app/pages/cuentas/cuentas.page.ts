import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ServicesService } from 'src/app/core/services/services.service';

@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.page.html',
  styleUrls: ['./cuentas.page.scss'],
})
export class CuentasPage implements OnInit {

  clienteControl = new FormControl();
  
  acumuladoVentas: any[] = [];
  acumuladoAbonos: any[] = [];
  dbclientes: any[] = [];

  totalVenta: any; 
  totalAbono: any; 
  saldoPendiente: any; 

  paginaActual = 1;
  elementosPorPagina = 15;
  paginasTotales = 0;

  constructor(
    private service: ServicesService
  ) { }

  ngOnInit(): void {
    this.service.obtenerClientes().subscribe(
      (data) => {
        this.dbclientes = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  cargarAcumuladoVentas() {
    const clienteId = this.clienteControl.value;

    if (!clienteId) {
      console.error('No se ha seleccionado ningún cliente');
      return;
    }

    this.service.obtenerAcumuladoVentas(clienteId).subscribe(
      (data) => {
        this.acumuladoVentas = data;
        console.log(this.acumuladoVentas);
      },
      (error) => {
        console.error(error);
      }
    );

    this.service.obtenerAcumuladoAbonos(clienteId).subscribe(
      (data) => {
        this.acumuladoAbonos = data;
        console.log(this.acumuladoAbonos);
      },
      (error) => {
        console.error(error);
      }
    );

    this.service.obtenerTotalVentas(clienteId).subscribe(
      (data) => {
        this.totalVenta = data.Total_Ventas;
        console.log(this.totalVenta.Total_Ventas);
      },
      (error) => {
        console.error(error);
      }
    );

    this.service.obtenerTotalAbonos(clienteId).subscribe(
      (data) => {
        this.totalAbono = data.Total_Abonos;
        console.log(this.totalAbono);
      },
      (error) => {
        console.error(error);
      }
    );

    this.service.saldoPendiente(clienteId).subscribe(
      (data) => {
        this.saldoPendiente = data.saldo_pendiente_total;
        console.log(this.saldoPendiente);
      },
      (error) => {
        console.error(error);
      }
    );


  }

  calcularPaginasTotales() {
    this.paginasTotales = Math.ceil(this.acumuladoVentas.length / this.elementosPorPagina);
  }

  obtenerElementosPaginados() {
    const inicio = (this.paginaActual - 1) * this.elementosPorPagina;
    const fin = inicio + this.elementosPorPagina;
    return this.acumuladoVentas.slice(inicio, fin);
  }

  cambiarPagina(nuevaPagina: number) {
    this.paginaActual = nuevaPagina;
  }

}
