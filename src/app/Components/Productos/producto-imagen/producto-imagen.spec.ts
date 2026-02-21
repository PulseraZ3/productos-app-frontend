import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoImagen } from './producto-imagen';

describe('ProductoImagen', () => {
  let component: ProductoImagen;
  let fixture: ComponentFixture<ProductoImagen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductoImagen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductoImagen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
