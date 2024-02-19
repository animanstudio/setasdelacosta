import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VentasPage } from './ventas.page';

const routes: Routes = [
  {
    path: '',
    component: VentasPage
  },
  {
    path: 'crear',
    loadChildren: () => import('./crear/crear.module').then( m => m.CrearPageModule)
  },
  {
    path: 'detalle-venta',
    loadChildren: () => import('./detalle-venta/detalle-venta.module').then( m => m.DetalleVentaPageModule)
  },
  {
    path: 'nueva-venta',
    loadChildren: () => import('./nueva-venta/nueva-venta.module').then( m => m.NuevaVentaPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VentasPageRoutingModule {}
