export interface Usuario {
    idUsuario: number;
    correo: string;
    nombre: string;
    idRol: number;
    idDistrito: number | null; 
}