import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComprasPage } from './compras.page';

const routes: Routes = [
  {
    path: '',
    component: ComprasPage
  },
  {
    path: 'crear',
    loadChildren: () => import('./crear/crear.module').then( m => m.CrearPageModule)
  },
  {
    path: 'detalle-compra',
    loadChildren: () => import('./detalle-compra/detalle-compra.module').then( m => m.DetalleCompraPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComprasPageRoutingModule {}
