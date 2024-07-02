import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MetricasPage } from './metricas.page';

const routes: Routes = [
  {
    path: '',
    component: MetricasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MetricasPageRoutingModule {}
