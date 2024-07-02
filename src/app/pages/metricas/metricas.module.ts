import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MetricasPageRoutingModule } from './metricas-routing.module';

import { MetricasPage } from './metricas.page';
import { NgxChartsModule } from '@swimlane/ngx-charts';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MetricasPageRoutingModule,
    NgxChartsModule  
    
  ],
  declarations: [MetricasPage]
})
export class MetricasPageModule {}
