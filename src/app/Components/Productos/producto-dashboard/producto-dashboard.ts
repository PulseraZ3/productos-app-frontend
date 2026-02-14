// dashboard.component.ts
import { Component } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { ProductoService } from '../../../Service/producto.service';
import { BaseChartDirective } from 'ng2-charts'; // <-- IMPORTAR AQUÍ
import { ProductoUsuario } from '../../../Models/productoUsuario.model';
import { RouterLink } from '@angular/router';
export interface ProductoCategoria {
    categoria: string;
    cantidad: number;
}

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard-component.html',
    styleUrl:'./menu-component.css',
    imports: [BaseChartDirective,RouterLink]
})
export class DashboardComponent {
    public barChartData: ChartData<'bar'> = {
        labels: [],
        datasets: [{ data: [], label: 'Productos' }]
    };
    public usuariosChar: ChartData<'bar'> = {
        labels: [],
        datasets: [{ data: [], label: 'Usuarios' }]
    }
    public barChartOptions: ChartOptions<'bar'> = { responsive: true };
    public barCharUsuario: ChartOptions<'bar'> = { responsive: true };
    constructor(private productoService: ProductoService) {
        this.productoService.listarProductoPorCategoria().subscribe((data: ProductoCategoria[]) => {
            this.barChartData.labels = data.map(d => d.categoria);
            this.barChartData.datasets[0].data = data.map(d => d.cantidad);
        });


        this.productoService.listarProductoPorUsuario().subscribe((data: ProductoUsuario[]) => {
            this.usuariosChar.labels = data.map(d => d.id_usuario);
            this.usuariosChar.datasets[0].data = data.map(d => d.cantidad);
        })
    }
}
