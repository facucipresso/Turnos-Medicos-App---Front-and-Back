import { Injectable } from '@angular/core';
import { ObraSocial } from './obra-social.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ObraSocialService {

  private apiUrl = 'http://localhost:8081';

  constructor (private http : HttpClient){}

  getObrasSociales(): Observable<ObraSocial[]> {
    return this.http.get<ObraSocial[]>(`${this.apiUrl}/obras-sociales`);
  }

  addObraSocial(obraSocial: ObraSocial): Observable<ObraSocial>{
    return this.http.post<ObraSocial>(`${this.apiUrl}/admin/saveObraSocial`, obraSocial);
  }

  editarObraSocial(obra: ObraSocial): Observable<ObraSocial>{
    const dto = {
      nombreObraSocial: obra.nombreObraSocial,
      planObraSocial: obra.planObraSocial
    };

    return this.http.put<ObraSocial>(`${this.apiUrl}/admin/updateObraSocial/${obra.id}`, dto);
  }

  eliminarObraSocial(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/admin/deleteObraSocial/${id}`);
  }

  getMedicoByObraSocial(id: number): Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/pacientes/obraSocial/${id}/medicos`);
  }

  getObraSocialById(id: number): Observable<ObraSocial> {
    return this.http.get<ObraSocial>(`${this.apiUrl}/obras-sociales/${id}`);
  }
  
  getObrasSocialesDeUnMedico(id_medico: number): Observable<ObraSocial[]>{
    return this.http.get<ObraSocial[]>(`${this.apiUrl}/medicos/${id_medico}/mis-obras-sociales`);
  }


}
