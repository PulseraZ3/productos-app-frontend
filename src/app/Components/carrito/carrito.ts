import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../Service/cart';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule], // ✅ ESTA LÍNEA FALTABA
  templateUrl: './carrito.html',
  styleUrl: './carrito.css'
})
export class Carrito {
  cartService = inject(CartService);
}