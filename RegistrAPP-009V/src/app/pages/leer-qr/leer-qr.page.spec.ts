import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeerQrPage } from './leer-qr.page';

describe('LeerQrPage', () => {
  let component: LeerQrPage;
  let fixture: ComponentFixture<LeerQrPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LeerQrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
