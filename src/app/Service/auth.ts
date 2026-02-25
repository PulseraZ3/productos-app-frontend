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
    localStorage.removeItem('username')
    localStorage.removeItem('id_usuario');
    localStorage.removeItem('rol');
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
  guardarSesion(usuario: any) {

    const expirationTime = new Date().getTime() + (3600000);

    localStorage.setItem('token', usuario.token);
    localStorage.setItem('rol', usuario.rol);
    localStorage.setItem('username', usuario.username);
    localStorage.setItem('id_usuario', usuario.idUsuario);
    localStorage.setItem('session_expiration', expirationTime.toString());
  }
  getUsername(): string | null {
    return localStorage.getItem('username');
  }
  getRol(): string | null {
    return localStorage.getItem('rol');
  }
  getIdUsuario(): number {
    return Number(localStorage.getItem('id_usuario')) || 0;
  }
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
  //verificar si ya expiro el Session 
  checkSessionExpiration() {

    const expiration = localStorage.getItem('session_expiration');

    if (!expiration) return;

    const now = new Date().getTime();

    if (now > Number(expiration)) {
      this.logout();
    }
  }
  startAutoLogout() {

    const expiration = localStorage.getItem('session_expiration');
    if (!expiration) return;

    const timeLeft = Number(expiration) - new Date().getTime();

    if (timeLeft <= 0) {
      this.logout();
      return;
    }

    setTimeout(() => {
      this.logout();
    }, timeLeft);
  }
}
