import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbonosPage } from './abonos.page';

describe('AbonosPage', () => {
  let component: AbonosPage;
  let fixture: ComponentFixture<AbonosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AbonosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
