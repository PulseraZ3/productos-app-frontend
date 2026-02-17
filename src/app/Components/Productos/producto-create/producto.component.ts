import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../Models/producto.model';
import { Categoria } from '../../../Models/categoria.model';
import { Usuario } from '../../../Models/usuario.model';
import { ProductoService } from '../../../Service/producto.service';
import { CategoriaService } from '../../../Service/categoria.service';
import { UsuarioService } from '../../../Service/usuario.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-producto',
    templateUrl: './producto-component.html',
    styleUrl:'./menu-component.css',
    imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink]
})
export class ProductoComponent implements OnInit {
    producto: Producto = {
        idproducto: 0,
        nombre: '',
        descripcion: '',
        precio: 0,
        stock: 0,
        peso: 0,
        fvencimiento: '',
        estado: true,
        idcategoria: 0,
        id_usuario: 0
    };


    categorias: Categoria[] = [];
    usuarios: Usuario[] = [];

    constructor(
        private productoService: ProductoService,
        private categoriaService: CategoriaService,
        private usuarioService: UsuarioService
    ) { }

    ngOnInit(): void {
        this.categoriaService.listarCategorias().subscribe((data) => {
            this.categorias = data;
        });

        this.usuarioService.listarUsuarios().subscribe((data) => {
            this.usuarios = data;
        });
    }

    guardarProducto() {
        console.log("DEBUG PRODUCTO:", this.producto); 
        
        if (!this.producto.idcategoria || this.producto.idcategoria === 0 ||
            !this.producto.id_usuario || this.producto.id_usuario === 0) {
            alert('Debes seleccionar usuario y categoría');
            return;
        }

        this.productoService.crearProducto(this.producto).subscribe({
            next: (res) => {
                console.log('Producto registrado:', res);
                alert('Producto registrado con éxito!');
            },
            error: (err) => {
                console.error('Error al registrar producto:', err);
                alert('Error al registrar el producto');
            }
        });
    }

}