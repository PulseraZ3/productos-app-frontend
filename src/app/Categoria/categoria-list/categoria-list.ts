import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriaService } from '../../Service/categoria.service';
import { Categoria } from '../../Models/categoria.model';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-categoria-list',
  standalone: true, 
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './categoria-list.html',
  styleUrls: ['./categoria-list.css','./menu-component.css']
})
export class CategoriaList implements OnInit {

  categorias: Categoria[] = [];
  categoriasFiltradas: Categoria[] = [];
  terminoBusqueda: string = '';
  loading: boolean = true;
  error: string = '';

  constructor(
    private categoriaService: CategoriaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCategorias();
  }

  getCategorias(): void {
    this.loading = true;
    this.error = '';

    this.categoriaService.listarCategorias().subscribe({
      next: (data) => {
        this.categorias = data;
        this.categoriasFiltradas = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar las categorías';
        this.loading = false;
        console.error('Error:', err);
      }
    });
  }

  filtrarCategorias(): void {
    if (!this.terminoBusqueda.trim()) {
      this.categoriasFiltradas = this.categorias;
      return;
    }

    const termino = this.terminoBusqueda.toLowerCase().trim();

    this.categoriasFiltradas = this.categorias.filter(c =>
      (c.nombre?.toLowerCase().includes(termino) ?? false) ||
      (c.descripcion?.toLowerCase().includes(termino) ?? false) ||
      (c.idcategoria?.toString().includes(termino) ?? false)
    );
  }

  limpiarBusqueda(): void {
    this.terminoBusqueda = '';
    this.categoriasFiltradas = this.categorias;
  }
}