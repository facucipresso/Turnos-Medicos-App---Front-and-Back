import { Injectable } from '@angular/core';
import { Medico } from './medico.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { TurnoService } from '../turnos/turno.service';
import { Turno } from '../turnos/turno.model';
import { HttpClient } from '@angular/common/http';
import { MedicoDto } from './medico-dto.model';
import { UsuarioRequest } from '../Usuarios/usuario-request.model';
import { UsuarioResponse } from '../Usuarios/usuario-response.model';

@Injectable({
  providedIn: 'root'
})
export class MedicosService {

  private apiUrl = 'http://localhost:8081';


  constructor(private http: HttpClient) {}

   addMedico(medicoDto: MedicoDto): Observable<MedicoDto>{
    return this.http.post<MedicoDto>(`${this.apiUrl}/medicos/create`, medicoDto);
   }
   
   getMedicos(): Observable<MedicoDto[]>{
    return this.http.get<MedicoDto[]>(`${this.apiUrl}/medicos/findAllMedicos`);
   }
    
   getMedicoById(id: number): Observable<Medico>{
    return this.http.get<Medico>(`${this.apiUrl}/admin/medicos/getMedico/${id}`);
   }

   editarMedico(id: number, medicoEditadoDto: MedicoDto): Observable<MedicoDto>{
    return this.http.put<MedicoDto>(`${this.apiUrl}/admin/medicos/updateMedico/${id}`, medicoEditadoDto);
   }

   eliminarMedico(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/admin/medicos/deleteMedico/${id}`);
   }

   agregarObraSocial(idMedico: number, idObraSocial: number): Observable<Medico> {
    return this.http.post<Medico>(`${this.apiUrl}/medicos/${idMedico}/obras-sociales/add-obra-social/${idObraSocial}`, {});
  }

  eliminarObraSocial(idMedico: number, idObraSocial: number): Observable<Medico> {
    return this.http.delete<Medico>(`${this.apiUrl}/medicos/${idMedico}/obras-sociales/delete-obra-social/${idObraSocial}`);
  }

  getMedicosPorEspecialidad(idEspecialidad: number): Observable<MedicoDto[]> {
    return this.http.get<MedicoDto[]>(`${this.apiUrl}/medicos/especialidad/${idEspecialidad}`);
  }

  getMedicosPorObraSocial(idObraSocial: number): Observable<MedicoDto[]>{
    return this.http.get<MedicoDto[]>(`${this.apiUrl}/medicos/obra-social/${idObraSocial}`);
  }

  getMedicoByTurno(idTurno: number): Observable<MedicoDto> {
    return this.http.get<MedicoDto>(`${this.apiUrl}/por-turno/${idTurno}`);
  }

  registrarUsuario(usuario: UsuarioRequest): Observable<UsuarioResponse>{
    return this.http.post<UsuarioResponse>(`${this.apiUrl}/api/auth/register/medico`, usuario);
  }
  
   
}
