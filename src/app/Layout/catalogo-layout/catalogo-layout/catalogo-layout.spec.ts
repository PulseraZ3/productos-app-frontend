import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoLayout } from './catalogo-layout';

describe('CatalogoLayout', () => {
  let component: CatalogoLayout;
  let fixture: ComponentFixture<CatalogoLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogoLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
