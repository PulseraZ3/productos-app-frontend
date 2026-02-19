import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../../../Service/producto.service';
import { Producto } from '../../../../Models/producto.model';
import { CurrencyPipe } from '@angular/common';
import { switchMap } from 'rxjs';
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
          if (!id) return [];
          this.categoriaId = Number(id);
          this.loading.set(true);
          return this.productoService.listarPorCategorias(this.categoriaId);
        })
      )
      .subscribe({
        next: (productos) => {
          this.productos.set(productos);
          this.loading.set(false);
        },
        error: () => {
          this.productos.set([]);
          this.loading.set(false);
        }
      });
  }
}