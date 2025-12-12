import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UsuarioRequest } from '../Usuarios/usuario-request.model';
import { UsuarioResponse } from '../Usuarios/usuario-response.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'http://localhost:8081';

  constructor(protected http: HttpClient, private router: Router) {}

  login(usuario: UsuarioRequest): Observable<UsuarioResponse>{
    return this.http.post<UsuarioResponse>(`${this.apiUrl}/api/auth/authenticate`, usuario);
  }

  getIdDeTipoByIdDeUsuario(idUsuario: number): Observable<number>{
    return this.http.get<number>(`${this.apiUrl}/usuario/get-id_rol/${idUsuario}`);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

}
