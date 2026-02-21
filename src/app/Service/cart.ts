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

  private items = signal<CartItem[]>([]);

  // lectura pública
  cartItems = this.items.asReadonly();

  // total productos
  totalItems = computed(() =>
    this.items().reduce((acc, item) => acc + item.cantidad, 0)
  );

  // total precio
  totalPrecio = computed(() =>
    this.items().reduce(
      (acc, item) => acc + item.precio * item.cantidad,
      0
    )
  );

  // ✅ agregar producto
  agregarProducto(producto: any) {

    const carrito = [...this.items()];
    const existente = carrito.find(
      i => i.idProducto === producto.idproducto
    );

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
    console.log('Producto enviado:', producto);
    this.items.set(carrito);
  }

  // eliminar
  eliminarProducto(idProducto: number) {
    this.items.set(
      this.items().filter(i => i.idProducto !== idProducto)
    );
  }

  limpiarCarrito() {
    this.items.set([]);
  }
}