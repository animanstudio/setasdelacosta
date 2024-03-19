import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private apiUrl = 'http://localhost/setas_app_dashboard/public/';

  private apiUrl2 = 'https://calzadomisterr.com.co/matte-be/';


  constructor(
    private http: HttpClient
  ) { }


  // PETICIONES GET  
  public obtenerVentas(): Observable<any> {
    return this.http.get(this.apiUrl + "ventas");
  }

  public detalleVenta(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}ventas/detalle/${id}`);
  }

  public obtenerCompras(): Observable<any> {
    return this.http.get(this.apiUrl + "compras");
  }

  public detalleCompra(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}compras/detalle/${id}`);
  }

  public obtenerClientes(): Observable<any> {
    return this.http.get(this.apiUrl + "clientes");
  }

  public obtenerProveedores(): Observable<any> {
    return this.http.get(this.apiUrl + "proveedores");
  }

  public obtenerProductos(): Observable<any> {
    return this.http.get(this.apiUrl + "productos");
  }

  public obtenerInventario(): Observable<any> {
    return this.http.get(this.apiUrl + "inventario");
  }

  public variacionPrecio(idProducto: number): Observable<any> {
    return this.http.get(`${this.apiUrl}productos/precio/${idProducto}`);
  }

  public obtenerAbonos(): Observable<any> {
    return this.http.get(this.apiUrl + "abonos");
  }

  public obtenerAcumuladoVentas(idCliente: number): Observable<any> {
    return this.http.get(`${this.apiUrl}ventas/acumulado/${idCliente}`);
  }

  public obtenerAcumuladoAbonos(idCliente: number): Observable<any> {
    return this.http.get(`${this.apiUrl}abonos/acumulado/${idCliente}`);
  }

  public obtenerTotalVentas(idCliente: number): Observable<any> {
    return this.http.get(`${this.apiUrl}ventas/total/${idCliente}`).pipe(
      map(response => response)
    );
  };

  public obtenerTotalAbonos(idCliente: number): Observable<any> {
    return this.http.get(`${this.apiUrl}abonos/total/${idCliente}`);
  }

  public saldoPendiente(idCliente: number): Observable<any> {
    return this.http.get(`${this.apiUrl}saldo-pendiente/${idCliente}`);
  }


  // PETICIONES POST

  crearCliente(productoData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'clientes/crear', productoData);
  }

  
  crearVenta(ventaData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'crear/venta', ventaData);
  }

  crearCompra(compraData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'crear/compra', compraData);
  }

  crearProducto(productoData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'productos/crear', productoData);
  }



}

