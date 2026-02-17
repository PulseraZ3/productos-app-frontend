import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Producto } from '../Models/producto.model';
import { ProductoCategoria } from '../Models/productoCategoria.model';
import { ProductoUsuario } from '../Models/productoUsuario.model';

interface ProductoResponse {
  response: Producto[];
}

@Injectable({ providedIn: 'root' })
export class ProductoService {
  private apiUrl = 'http://localhost:8080/api/productos';

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


}
