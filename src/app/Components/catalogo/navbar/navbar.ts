import { Component, inject, OnInit, signal } from '@angular/core';
import { CategoriaService } from '../../../Service/categoria.service';
import { Categoria } from '../../../Models/categoria.model';
import { RouterLink, RouterModule } from "@angular/router";
import { Producto } from '../../../Models/producto.model';
import { AuthService } from '../../../Service/auth';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterModule],
  templateUrl: './navbar.html',
  standalone: true,
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {
  menuOpen = signal(false);
  private categoriaService = inject(CategoriaService)
  private authService = inject(AuthService)
  categorias = signal<Categoria[]>([]);
  loading = signal(true);
  username: string | null = '';

  ngOnInit(): void {
    this.username = this.authService.getUsername();
    this.categoriaService.listarCategorias().subscribe({
      next: (data) => {
        this.categorias.set(data);
        this.loading.set(false);
      },
      error: () => {
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
