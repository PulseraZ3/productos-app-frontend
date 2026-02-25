import { Component, inject, signal, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { AuthService } from '../../../Service/auth';
import { CategoriaService } from '../../../Service/categoria.service';
import { RouterLink, RouterModule } from "@angular/router";

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterModule],
  templateUrl: './navbar.html',
  standalone: true
})
export class Navbar implements AfterViewInit {
  menuOpen = signal(false);
  userMenuOpen = signal(false);
  username: string | null = '';

  @ViewChild('userBtn', { read: ElementRef }) userBtn!: ElementRef;
  dropdownTop = 0;
  dropdownLeft = 0;

  private authService = inject(AuthService);
  private categoriaService = inject(CategoriaService);

  categorias = signal<any[]>([]);
  loading = signal(true);

  ngOnInit(): void {
    this.username = this.authService.getUsername();
    this.categoriaService.listarCategorias().subscribe({
      next: data => {
        this.categorias.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  ngAfterViewInit(): void {
    this.setDropdownPosition();
  }

  toggleUserMenu() {
    this.userMenuOpen.set(!this.userMenuOpen());
    if (this.userMenuOpen()) this.setDropdownPosition();
  }

  setDropdownPosition() {
    if (!this.userBtn) return;
    const rect = this.userBtn.nativeElement.getBoundingClientRect();
    this.dropdownTop = rect.bottom + window.scrollY; // justo debajo del texto
    this.dropdownLeft = rect.left + window.scrollX;
  }

  cerrarSesion() {
    this.authService.logout();
    window.location.reload();
  }

  toggleMenu() {
    this.menuOpen.update(v => !v);
  }

  closeMenu() {
    this.menuOpen.set(false);
  }
}