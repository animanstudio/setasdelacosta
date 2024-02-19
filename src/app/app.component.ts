import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Ventas', url: '/pages/ventas', icon: 'bag-check' },
    { title: 'Abonos', url: '/folder/abonos', icon: 'cash' },
    { title: 'Compras', url: '/folder/compras', icon: 'cart' },
    { title: 'Proveedores', url: '/folder/proveedores', icon: 'apps' },
    { title: 'Clientes', url: '/folder/clientes', icon: 'business' },
    { title: 'Inventario', url: '/folder/inventario', icon: 'list' },
    { title: 'Productos', url: '/folder/productos', icon: 'pricetags' }
  ];  
  constructor() {}
}



