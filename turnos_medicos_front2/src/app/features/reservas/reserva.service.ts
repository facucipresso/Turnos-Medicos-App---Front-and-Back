import { Injectable } from '@angular/core';
import { Reserva } from './reservas.model';
import { TurnoService } from '../turnos/turno.service';
import { Turno } from '../turnos/turno.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ReservaDto } from './reserva-dto.model';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private apiUrl = 'http://localhost:8081';

  constructor(private http: HttpClient){}

  //toma solamente la reserva
  crearReserva(reserva: Omit<Reserva, 'id'>): Observable<ReservaDto>{
    return this.http.post<ReservaDto>(`${this.apiUrl}/pacientes/turnos/create-reserva`, reserva);
  }
  //eliminar reserva, cambia el estado de turno a reservado=false
  eliminarReserva(idReserva: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/pacientes/turnos/delete-reserva/${idReserva}`);
  }

  //paciente ve sus reservas
  obtenerReservasPorPaciente(idPaciente: number): Observable<ReservaDto[]>{
    return this.http.get<ReservaDto[]>(`${this.apiUrl}/paciente/${idPaciente}/get-reservas`);
  }

  obtenerReservasPorMedico(idMedico: number): Observable<ReservaDto[]>{
    return this.http.get<ReservaDto[]>(`${this.apiUrl}/medico/${idMedico}/get-reservas`);
  }

  
}
