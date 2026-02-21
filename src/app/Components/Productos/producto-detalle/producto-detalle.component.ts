import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../../Service/producto.service';
import { Producto } from "../../../Models/producto.model";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-producto-detalle',
  standalone: true,
  templateUrl: './producto-detalle.component.html',
  styleUrls: ['./producto-detalle.component.css'],
  imports: [CommonModule]
})
export class ProductoDetalleComponent implements OnInit {

  producto!: Producto;

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService
  ) {}

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    //this.productoService.obtenerPorId(id).subscribe(data => {
      //this.producto = data;
   // });
  }
}