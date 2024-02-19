import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InventarioPage } from './inventario.page';

const routes: Routes = [
  {
    path: '',
    component: InventarioPage
  },
  {
    path: 'crear-producto',
    loadChildren: () => import('./crear-producto/crear-producto.module').then( m => m.CrearProductoPageModule)
  },
  {
    path: 'analisis-precio',
    loadChildren: () => import('./analisis-precio/analisis-precio.module').then( m => m.AnalisisPrecioPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventarioPageRoutingModule {}
