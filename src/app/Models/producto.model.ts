export interface Producto {
    idproducto: number;
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    peso: number;
    fvencimiento: string;
    estado: boolean;
    idcategoria: number;   // snake_case
    id_usuario: number;    // snake_case
}
