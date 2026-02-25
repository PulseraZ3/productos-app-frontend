import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { Carrusel } from "../../carrusel/carrusel";
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../../Service/producto.service';
import { forkJoin, map } from 'rxjs';
import { Producto } from '../../../Models/producto.model';
import { Router } from '@angular/router';
import { CartService } from '../../../Service/cart';
import Swiper from 'swiper';

@Component({
  selector: 'app-home',
  imports: [Carrusel, CommonModule],
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Home implements OnInit, AfterViewInit {
  @ViewChild('swiper') swiperRef!: ElementRef;
  private router = inject(Router);
  private productoService = inject(ProductoService);
  constructor(public cartService: CartService) {}

  loading = signal(true);
  productos = signal<Producto[]>([]);
  productosPorSlide = signal<Producto[][]>([]);
  swiper!: Swiper;

  ngOnInit(): void {
    // carga de productos e imagen
    this.productoService.listarProductos()
      .pipe(
        map(prods => prods || []),
        map(prods => {
          // productos con su imagen
          const observables = prods.map(prod =>
            this.productoService.listarImagenesPorProductoBackend(prod.idproducto).pipe(
              map(rutas => {
                const imagenes = this.productoService.listarImagenesProducto(prod.idproducto, rutas) || [];
                return { ...prod, imagenes: imagenes.length ? imagenes : ['assets/img/placeholder.png'] };
              })
            )
          );
          return forkJoin(observables);
        }),
        //conbinar multiples observables para ejecutarlo en paralelo 
        map(obsFork => obsFork)
      )
      .subscribe(fork => {
        fork.subscribe((productosConImagenes: Producto[]) => {
          this.productos.set(productosConImagenes);

          // Agrupar 2 productos por slide
          const grupos: Producto[][] = [];
          const lista = productosConImagenes;
          for (let i = 0; i < lista.length; i += 2) {
            grupos.push([lista[i], lista[i + 1]].filter(Boolean));
          }
          this.productosPorSlide.set(grupos);

          this.loading.set(false);
        });
      });
  }

  ngAfterViewInit(): void {
    const swiperEl = this.swiperRef.nativeElement;
    this.swiper = new Swiper(swiperEl, {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      navigation: true,
      pagination: { clickable: true, dynamicBullets: true },
      autoplay: { delay: 3000 },
    });
  }

  verDetalle(id: number) {
    this.router.navigate(['/catalogo/producto', id]);
  }
}