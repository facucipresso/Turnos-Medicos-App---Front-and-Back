import { Injectable } from '@angular/core';
import { Paciente } from './paciente.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UsuarioRequest } from '../Usuarios/usuario-request.model';
import { UsuarioResponse } from '../Usuarios/usuario-response.model';
import { PacienteEmailyDni } from './pacienteEmailyDni.model';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private apiUrl = 'http://localhost:8081';

  constructor(protected http: HttpClient) {}

  addPaciente(paciente: Paciente): Observable<Paciente> {
   return this.http.post<Paciente>(`${this.apiUrl}/singin/create-paciente`, paciente);
  }

  getPacientes(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(`${this.apiUrl}/medicos/findAllPacientes`);
  }

  getPacienteById(id: number): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.apiUrl}/medicos/pacientes/${id}`);
  }

  editarPaciente(id: number, pacienteEdit: Paciente): Observable<Paciente> {
    return this.http.put<Paciente>(`${this.apiUrl}/singin/update-paciente/${id}`, pacienteEdit);
  }

  eliminarPaciente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/medicos/pacientes/${id}/delete-paciente`);
  }

  registrarUsuario(usuario: UsuarioRequest): Observable<UsuarioResponse>{
    return this.http.post<UsuarioResponse>(`${this.apiUrl}/api/auth/register/paciente`, usuario);
  }

  //agregado para la nueva funcionalidad de recepcionista
  buscarPorEmailYDni(pac : PacienteEmailyDni): Observable<Paciente>{
    return this.http.post<Paciente>(`${this.apiUrl}/recepcionistas/get-idPaciente`, pac);
  }

}
