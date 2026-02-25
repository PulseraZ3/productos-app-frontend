import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../../Service/producto.service';
import { Producto } from '../../../Models/producto.model';
import { map, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-producto-detalle',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './producto-detalle.html',
  styleUrl: './producto-detalle.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductoDetalle implements OnInit {

  private route = inject(ActivatedRoute);
  private productoService = inject(ProductoService);

  producto = signal<Producto | null>(null);
  loading = signal(true);

  imagenActiva = signal<string>("");
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.productoService.obtenerPorId(id)
      .subscribe(prod => {
        this.producto.set(prod);
        if (prod.imagenes?.length) {
          this.imagenActiva.set(prod.imagenes[0]);
        }
      });
    this.route.paramMap
      .pipe(
        switchMap(params => {
          const id = Number(params.get('id'));
          return this.productoService.obtenerPorId(id);
        }),
        switchMap(producto =>
          this.productoService
            .listarImagenesPorProductoBackend(producto.idproducto)
            .pipe(
              map(rutas => {
                const imagenes =
                  this.productoService.listarImagenesProducto(
                    producto.idproducto,
                    rutas
                  );

                return {
                  ...producto,
                  imagenes
                };
              })
            )
        )
      )
      .subscribe({
        next: productoCompleto => {
          this.producto.set(productoCompleto);
          if(productoCompleto.imagenes?.length){
            this.imagenActiva.set(productoCompleto.imagenes[0])
          }
          this.loading.set(false);
        },
        error: err => {
          console.error(err);
          this.loading.set(false);
        }
      });
  }

  cambiarImagen(img: string) {
    this.imagenActiva.set(img);
  }
}