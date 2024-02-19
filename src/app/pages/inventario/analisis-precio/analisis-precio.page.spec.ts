import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnalisisPrecioPage } from './analisis-precio.page';

describe('AnalisisPrecioPage', () => {
  let component: AnalisisPrecioPage;
  let fixture: ComponentFixture<AnalisisPrecioPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AnalisisPrecioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
