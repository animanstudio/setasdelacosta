import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnalisisPrecioPageRoutingModule } from './analisis-precio-routing.module';

import { AnalisisPrecioPage } from './analisis-precio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnalisisPrecioPageRoutingModule
    
  ],
  declarations: [AnalisisPrecioPage]
})
export class AnalisisPrecioPageModule {}
