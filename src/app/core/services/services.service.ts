import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private apiUrl = 'http://localhost/setas_app_dashboard/public/';

  private apiUrl2 = 'https://www.setasdelacosta.com.co/api/';

  constructor(
    private http: HttpClient
  ) { }

  
  // PETICIONES GET  
    public obtenerVentas(): Observable<any> {
    return this.http.get(this.apiUrl + "ventas");
  }

  // PETICIONES GET  
  public obtenerVentasxFecha(inicio: string, fin: string): Observable<any> {
    return this.http.get(`${this.apiUrl}ventas/fecha/${inicio}/${fin}`);
  }

  public datosCliente(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}clientes/${id}`);
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

  public obtenerVentasPorMes(): Observable<any> {
    return this.http.get(`${this.apiUrl}ventas-por-mes`);
  }

  public obtenerVentasPorVendedor(): Observable<any> {
    return this.http.get(`${this.apiUrl}ventas-por-vendedor`);
  }

  public obtenerProductosMasVendidos(): Observable<any> {
    return this.http.get(`${this.apiUrl}productos-mas-vendidos/${4}`);
  }

  public obtenerVendedores(): Observable<any> {
    return this.http.get(this.apiUrl + "vendedores");
  }

  descuentoProducto(idProducto: any): Observable<any> {
    return this.http.get(`${this.apiUrl}descuento/${idProducto}`);
  }

  public ultimaVenta(): Observable<any> {
    return this.http.get(this.apiUrl + "ultima-venta");
  }


  // PETICIONES POST

  crearCliente(clienteData: any): Observable<any> {
    console.log("Datos enviados al servidor: ", clienteData); // 
    return this.http.post<any>(this.apiUrl + 'clientes/crear', clienteData);    
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
 

  // PETICIONES UPDATE  
  actualizarCantidad(idProducto: number, cantidad: number): Observable<any> {
    const url = `${this.apiUrl}inventario/actualizar-cantidad/${idProducto}`;
    const data = { cantidad: cantidad };
    return this.http.put<any>(url, data);
  }
    
  eliminarCliente(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}clientes/eliminar/${id}`, {});
  }

  eliminarProducto(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}productos/eliminar/${id}`, {});
  }

  actualizarCliente(clienteId: number, clienteData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/clientes/actualizar/${clienteId}`, clienteData);
  }

}

