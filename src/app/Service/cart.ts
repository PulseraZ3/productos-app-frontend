import { Injectable, signal, computed } from '@angular/core';

export interface CartItem {
  idProducto: number;
  nombre: string;
  precio: number;
  imagen?: string;
  cantidad: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {

  private items = signal<CartItem[]>(this.loadFromStorage());

  cartItems = this.items.asReadonly();

  totalItems = computed(() => this.items().reduce((acc, i) => acc + i.cantidad, 0));
  totalPrecio = computed(() => this.items().reduce((acc, i) => acc + i.precio * i.cantidad, 0));

  agregarProducto(producto: any) {
    const carrito = [...this.items()];
    const existente = carrito.find(i => i.idProducto === producto.idproducto);

    if (existente) {
      existente.cantidad++;
    } else {
      carrito.push({
        idProducto: producto.idproducto,
        nombre: producto.nombre,
        precio: producto.precio,
        imagen: producto.imagenes?.[0],
        cantidad: 1
      });
    }

    this.items.set(carrito);
    this.saveToStorage();
  }

  eliminarProducto(idProducto: number) {
    this.items.set(this.items().filter(i => i.idProducto !== idProducto));
    this.saveToStorage();
  }

  limpiarCarrito() {
    this.items.set([]);
    this.saveToStorage();
  }

  private saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(this.items()));
  }

  private loadFromStorage(): CartItem[] {
    const data = localStorage.getItem('cart');
    return data ? JSON.parse(data) : [];
  }
}