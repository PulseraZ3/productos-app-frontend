import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RegisterRequest } from '../Models/register.model';
import { Observable } from 'rxjs';
import { Rol } from '../Models/rol.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);

  private API = 'http://localhost:8080/api/v1/auth';

  register(data: RegisterRequest): Observable<any> {
    return this.http.post(`${this.API}/register`, data);
  }
  login(data:any){
    return this.http.post(`${this.API}/login`, data);
  }
  getRoles(){
    return this.http.get<Rol[]>("http://localhost:8080/api/v1/rol");
  }
}
