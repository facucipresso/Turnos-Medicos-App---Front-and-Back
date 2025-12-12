import { Injectable } from '@angular/core';
import { Especialidad } from './especialidad.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  private apiUrl = 'http://localhost:8081/especialidades';

  private especialidades: Especialidad[] = [];
  private especialidadesSubject: BehaviorSubject<Especialidad[]> = new BehaviorSubject<Especialidad[]>([]);
  private storageKey = 'especialidades';

  constructor(private http: HttpClient) {}

 

  getEspecialidades(): Observable<Especialidad[]> {
    return this.http.get<Especialidad[]>(`${this.apiUrl}`);
  }

  agregarEspecialidad(nombre: string): Observable<Especialidad> {
    const nueva: Especialidad = { 
      id: Date.now(),
      nombre 
    };
    return this.http.post<Especialidad>(`${this.apiUrl}/nueva`, nueva);
  }

  eliminarEspecialidad(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  editarEspecialidad(especialidad: Especialidad): Observable<Especialidad> {
    return this.http.put<Especialidad>(`${this.apiUrl}/update/${especialidad.id}`, especialidad);
  }
  

  getEspecialidadPorId(id: number): Observable<Especialidad> {
    return this.http.get<Especialidad>(`${this.apiUrl}/get/${id}`);
  }
  
}

