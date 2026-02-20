import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { Producto } from '../Models/producto.model';
import { ProductoCategoria } from '../Models/productoCategoria.model';
import { ProductoUsuario } from '../Models/productoUsuario.model';
import { GenericResponse } from '../Models/generic-response.model';

interface ProductoResponse {
  response: Producto[];
}

@Injectable({ providedIn: 'root' })
export class ProductoService {
  private apiUrl = 'http://localhost:8080/api/productos';
  productos = signal<Producto[]>([]);
  loading = signal(false);

  constructor(private http: HttpClient) { }

  crearProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, producto);
  }

  listarProductos(): Observable<Producto[]> {
    return this.http.get<ProductoResponse>(this.apiUrl).pipe(map(res => res.response));
  }
  listarProductoPorCategoria(): Observable<ProductoCategoria[]> {
    return this.http.get<{ response: ProductoCategoria[] }>(`${this.apiUrl}/categoria`)
      .pipe(
        map(res => res.response)
      );
  }
  listarProductoPorUsuario(): Observable<ProductoUsuario[]> {
    return this.http.get<{ response: ProductoUsuario[] }>(`${this.apiUrl}/usuario`).pipe(map(res => res.response));
  }
  cambiarEstado(id: number): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/cambiarEstado/${id}`, null);
  }

  listarPorCategorias(idcategoria: number): Observable<Producto[]> {
    this.loading.set(true);
    return this.http.get<GenericResponse<Producto[]>>(
      `http://localhost:8080/api/productos/categoria/${idcategoria}`
    ).pipe(
      tap({
        next: (data) => {
          if (data && data.response) {
            this.productos.set(data.response);
          } else {
            this.productos.set([]);
          }
          this.loading.set(false);
        },
        error: () => {
          this.productos.set([]);
          this.loading.set(false);
        }
      }),
      map(data => data?.response ?? []) // si data es null, devolvemos array vacío
    );
  }
  listarImagenesProducto(idProducto: number, rutasRelativas: string[]): string[] {
    // rutasRelativas = ["/uploads/xxxx.png"]
    return rutasRelativas.map(ruta => {
      const nombreArchivo = ruta.split('/').pop(); // "xxxx.png"
      return `http://localhost:8080/imagenes/${idProducto}/imagenes/${nombreArchivo}`;
    });
  }
  listarImagenesPorProductoBackend(idProducto: number): Observable<string[]> {
    return this.http.get<string[]>(`http://localhost:8080/imagenes/${idProducto}/imagenes`);
  }

}
