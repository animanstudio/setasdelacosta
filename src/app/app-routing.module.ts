import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'ventas',
    pathMatch: 'full'
  },
  {
    path: 'ventas',
    loadChildren: () => import('./pages/ventas/ventas.module').then( m => m.VentasPageModule)
  },
  {
    path: 'clientes',
    loadChildren: () => import('./pages/clientes/clientes.module').then( m => m.ClientesPageModule)
  },
  {
    path: 'proveedores',
    loadChildren: () => import('./pages/proveedores/proveedores.module').then( m => m.ProveedoresPageModule)
  },
  {
    path: 'compras',
    loadChildren: () => import('./pages/compras/compras.module').then( m => m.ComprasPageModule)
  },
  {
    path: 'inventario',
    loadChildren: () => import('./pages/inventario/inventario.module').then( m => m.InventarioPageModule)
  },
  {
    path: 'abonos',
    loadChildren: () => import('./pages/abonos/abonos.module').then( m => m.AbonosPageModule)
  },
  {
    path: 'productos',
    loadChildren: () => import('./pages/productos/productos.module').then( m => m.ProductosPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
