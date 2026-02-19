import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Categoria } from '../Models/categoria.model';
import { Producto } from '../Models/producto.model';
interface CategoriaResponse {
  response: Categoria[];
}
@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private apiUrl = 'http://localhost:8080/api/categoria';
  productos = signal<Producto[]>([]);
  loading = signal(false);
  constructor(private http: HttpClient) { }

  listarCategorias(): Observable<Categoria[]> {
    return this.http.get<CategoriaResponse>(this.apiUrl).pipe(map(res => res.response));
  }


  buscarCategoria(termino: string, categoria: Categoria[]): Categoria[] {
    if (!termino.trim()) return categoria;

    const terminoLower = termino.toLowerCase().trim();

    return categoria.filter(categoria =>
      categoria.nombre.toLowerCase().includes(terminoLower) ||
      categoria.descripcion.toLowerCase().includes(terminoLower) ||
      categoria.idcategoria.toString().includes(termino)
    );
  }
  
}
