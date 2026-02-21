import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../../../Service/producto.service';
import { Producto } from '../../../../Models/producto.model';
import { forkJoin, map, of, switchMap } from 'rxjs';
import { CategoriaService } from '../../../../Service/categoria.service';
import { Categoria } from '../../../../Models/categoria.model';

@Component({
  selector: 'app-productos-por-categoria-component',
  imports: [],
  standalone: true,
  templateUrl: './productos-por-categoria-component.html',
  styleUrl: './productos-por-categoria-component.css'
})
export class ProductosPorCategoriaComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private productoService = inject(ProductoService);
  categoriaId!: number;
  productos = signal<Producto[]>([]);
  loading = signal(true);
  ngOnInit(): void {

    this.route.paramMap
      .pipe(
        switchMap(params => {
          const id = params.get('id');
          if (!id) return of([]);
          this.categoriaId = Number(id);
          this.loading.set(true);
          return this.productoService.listarPorCategorias(this.categoriaId);
        }),
        switchMap(productos => {
          if (productos.length === 0) return of([]);
          const observables = productos.map(producto =>
            this.productoService.listarImagenesPorProductoBackend(producto.idproducto).pipe(
              map((rutasRelativas: string[]) => {
                const imagenes = this.productoService.listarImagenesProducto(producto.idproducto, rutasRelativas);
                return {
                  ...producto,
                  imagenes
                };
              })
            )
          );
          return forkJoin(observables);
        })
      )
      .subscribe({
        next: productosConImagenes => {
          console.log('Productos con imágenes:', productosConImagenes);
          this.productos.set(productosConImagenes as Producto[]);
          this.loading.set(false);
        },
        error: err => {
          console.error('Error cargando productos:', err);
          this.productos.set([]);
          this.loading.set(false);
        }
      });
  }

}