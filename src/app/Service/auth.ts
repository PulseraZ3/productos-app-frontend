import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RegisterRequest } from '../Models/register.model';
import { Observable } from 'rxjs';
import { Rol } from '../Models/rol.model';
import { Distrito } from '../Models/distrito.model';
import { GenericResponse } from '../Models/generic-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);

  private API = 'http://localhost:8080/api/v1/auth';

  register(data: RegisterRequest): Observable<any> {
    return this.http.post(`${this.API}/register`, data);
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    localStorage.removeItem('username');
    localStorage.removeItem('idUsuario');

  }
  login(data: any) {
    return this.http.post(`${this.API}/login`, data);
  }
  getRoles() {
    return this.http.get<Rol[]>("http://localhost:8080/api/v1/rol");
  }
  getDistritos(): Observable<GenericResponse<Distrito[]>> {
    return this.http.get<GenericResponse<Distrito[]>>("http://localhost:8080/api/v1/distrito")
  }
  guardarSesion(usaurio: any) {
    localStorage.setItem('token', usaurio.token);
    localStorage.setItem('rol', usaurio.rol);
    localStorage.setItem('username', usaurio.username);
    localStorage.setItem('idUsuario', usaurio.idUsuario);
  }
  getUsername(): string | null {
    return localStorage.getItem('username');
  }
  getRol(): string | null {
    return localStorage.getItem('rol');
  }
  getIdUsuario(): number {

    const usuarioStorage = localStorage.getItem('usuario');

    if (!usuarioStorage) return 0;

    const usuario = JSON.parse(usuarioStorage);

    return usuario.id_usuario ?? 0;
  }
}
