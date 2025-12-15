import { Injectable } from '@angular/core';
import { Turno } from './turno.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  private apiUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) {}

  getTurnosDeMedico(medicoId: number): Observable<Turno[]> {
    return this.http.get<Turno[]>(`${this.apiUrl}/medico/${medicoId}/find-my-turnos`);
  }

  
  obtenerTurnosReservadosDeMedico(medicoId: number): Observable<Turno[]> {
    return this.http.get<Turno[]>(`${this.apiUrl}/medico/${medicoId}/find-turnos-reservados`);
  }
  

  crearTurno(medicoId: number, turno: Omit<Turno, 'id'>): Observable<Turno> {
    const nuevoTurno = {
      diaTurno: turno.diaTurno,
      horaTurno: turno.horaTurno
      //reservado: false
    }
    return this.http.post<Turno>(`${this.apiUrl}/medicos/${medicoId}/create-turno`, nuevoTurno);
  }

  eliminarTurno(medicoId: number, turnoId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/medicos/${medicoId}/delete-turno/${turnoId}`);
  }


  editarTurno(medicoId: number, turno: Turno): Observable<Turno> {
    const nuevoTurno = {
      diaTurno: turno.diaTurno,
      horaTurno: turno.horaTurno
      //reservado: false
    }
    return this.http.put<Turno>(`${this.apiUrl}/medicos/${medicoId}/update-turno/${turno.id}`,nuevoTurno);
  }

  
  reservarTurno(idTurno: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/paciente/reservar-turno/${idTurno}`);
  }

  //impelmentar conectando con el back
  getTurno(idTurno: number): Observable<Turno> {
    return this.http.get<Turno>(`${this.apiUrl}/medico/find-turno/${idTurno}`);
  }

  getTurnosDispDeTodosLosMeds(idsMedicos : number[]) : Observable<Turno[]> {
    return this.http.post<Turno[]>(`${this.apiUrl}/turnos/por-medicos`, idsMedicos);
  }
  
}
