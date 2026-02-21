import { Component, inject } from '@angular/core';
import { CartService } from '../../Service/cart';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.html'
})
export class Carrito {
  cartService = inject(CartService);
  private http = inject(HttpClient);

  comprarTodo() {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Debes iniciar sesión para comprar');
      return;
    }

    const items = this.cartService.cartItems().map(i => ({
      idProducto: i.idProducto,
      cantidad: i.cantidad
    }));

    const body = {
      metodoPago: 'YAPE',
      items
    };

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.post('http://localhost:8080/api/pedidos', body, { headers })
      .subscribe({
        next: res => {
          alert('Pedido realizado con éxito');
          this.cartService.limpiarCarrito();
        },
        error: err => {
          console.error(err);
          alert('Error al realizar pedido');
        }
      });
  }
}