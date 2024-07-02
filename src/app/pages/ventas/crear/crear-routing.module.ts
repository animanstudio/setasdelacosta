import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearPage } from './crear.page';

const routes: Routes = [
  {
    path: '',
    component: CrearPage
  },
  {
    path: 'descuentos',
    loadChildren: () => import('./descuentos/descuentos.module').then( m => m.DescuentosPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearPageRoutingModule {}
