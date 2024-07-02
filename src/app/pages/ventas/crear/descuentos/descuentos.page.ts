import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ServicesService } from 'src/app/core/services/services.service';

@Component({
  selector: 'app-descuentos',
  templateUrl: './descuentos.page.html',
  styleUrls: ['./descuentos.page.scss'],
})
export class DescuentosPage implements OnInit {
  @Input() selectedItem: any;
  producto: any;
  descuentoPercent: number = 0;
  precioConDescuento: number = 0;

  constructor(
    private service: ServicesService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.service.descuentoProducto(this.selectedItem).subscribe(
      (data) => {
        this.producto = data;        
        this.precioConDescuento = this.producto.precio_mas_iva;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  actualizarDescuento(event: any) {
    this.descuentoPercent = event.detail.value;
    const descuentoDecimal = this.descuentoPercent / 100;
    this.precioConDescuento = this.producto.precio_mas_iva * (1 - descuentoDecimal);
  }

  aplicarDescuento() {
    const descuentoDecimal = this.descuentoPercent / 100;
    this.modalController.dismiss({
      descuento: descuentoDecimal
    });    
  }

  cancelar() {
    this.modalController.dismiss();
  }
}
