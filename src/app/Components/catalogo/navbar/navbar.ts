import { Component, inject, OnInit, signal } from '@angular/core';
import { CategoriaService } from '../../../Service/categoria.service';
import { Categoria } from '../../../Models/categoria.model';
import { RouterLink, RouterModule } from "@angular/router";
import { Producto } from '../../../Models/producto.model';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterModule],
  templateUrl: './navbar.html',
  standalone: true,
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit{
  menuOpen = signal(false);
  private categoriaService = inject(CategoriaService)
  categorias = signal<Categoria[]>([]);
  loading = signal(true);

  ngOnInit(): void {
    this.categoriaService.listarCategorias().subscribe({
      next: (data) => {
        this.categorias.set(data);
        this.loading.set(false);
      },
      error: () =>{
        this.loading.set(false);
      }
    });
  }
  toggleMenu() {
    this.menuOpen.update(v => !v);
  }

  closeMenu() {
    this.menuOpen.set(false);
  }

}
