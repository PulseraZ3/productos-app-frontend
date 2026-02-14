import { Component, OnInit } from "@angular/core";
import { Producto } from "../../../Models/producto.model";
import { Categoria } from "../../../Models/categoria.model";
import { Usuario } from "../../../Models/usuario.model";
import { ProductoService } from "../../../Service/producto.service";
import { CategoriaService } from "../../../Service/categoria.service";
import { UsuarioService } from "../../../Service/usuario.service";
import { CommonModule, CurrencyPipe } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { ChartData, ChartOptions } from "chart.js";

@Component({
    selector: "app-producto",
    templateUrl: "./producto-listar.html",
    styleUrl:"./menu-component.css",
    imports: [CommonModule, ReactiveFormsModule, RouterLink, FormsModule]
})
export class ProductoComponentListar implements OnInit {
    producto: Producto[] = [];
    productoFiltrados: Producto[] = [];
    categorias: Categoria[] = [];
    usuarios: Usuario[] = [];
    terminoBusqueda: string = '';
    public barChartData: ChartData<'bar'> = {
        labels: [],
        datasets: [{ data: [], label: 'Productos' }]
    };

    public barChartOptions: ChartOptions<'bar'> = {
        responsive: true,
        plugins: {
            legend: { display: true, position: 'top' },
            tooltip: { enabled: true }
        },
        scales: {
            x: { title: { display: true, text: 'Categorías' } },
            y: { title: { display: true, text: 'Cantidad de Productos' }, beginAtZero: true }
        }
    };
    constructor(
        private productoService: ProductoService,
        private categoriaService: CategoriaService,
        private usuarioService: UsuarioService
    ) { }

    ngOnInit(): void {
        this.productoService.listarProductos().subscribe((data) => {
            this.producto = data;
            this.productoFiltrados = data;
        });
        this.usuarioService.listarUsuarios().subscribe((data) => {
            this.usuarios = data;
        });
        this.categoriaService.listarCategorias().subscribe((data) => {
            this.categorias = data;
        });
    }


    filtrarProductos(): void {
        if (!this.terminoBusqueda.trim()) {
            this.productoFiltrados = this.producto;
            return;
        }

        const terminoLower = this.terminoBusqueda.toLowerCase().trim();
        this.productoFiltrados = this.producto.filter(producto =>
            producto.nombre.toLowerCase().includes(terminoLower) ||
            producto.descripcion.toLowerCase().includes(terminoLower) ||
            producto.idproducto.toString().includes(terminoLower) ||
            producto.precio.toString().includes(terminoLower)
        );
    }

    limpiarBusqueda(): void {
        this.terminoBusqueda = '';
        this.productoFiltrados = this.producto;
    }
    cambiarEstadoProducto(id: number): void {
        this.productoService.cambiarEstado(id).subscribe({
            next: (res) => {
                window.location.reload();
                this.productoService.listarProductos().subscribe((data) => {
                    this.producto = data;
                    this.productoFiltrados = this.producto;
                });
            },
            error: (err) => {
                console.error('Error al cambiar estado', err);
            }
        });
    }
    isStockBajo(stock: number): boolean {
        return stock <= 5;
    }
}