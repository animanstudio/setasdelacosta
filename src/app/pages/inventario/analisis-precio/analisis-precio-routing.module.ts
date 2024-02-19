import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnalisisPrecioPage } from './analisis-precio.page';

const routes: Routes = [
  {
    path: '',
    component: AnalisisPrecioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnalisisPrecioPageRoutingModule {}
