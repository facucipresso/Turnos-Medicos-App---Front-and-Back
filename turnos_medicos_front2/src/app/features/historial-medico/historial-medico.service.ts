import { Injectable } from "@angular/core";
import { HistorialMedico } from "./historial-medico.model";
import { HistorialMedicoDto } from "./historial-medico-dto.model";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";


@Injectable({
    providedIn: 'root'
})
export class HistorialMedicoService{

    private apiUrl = 'http://localhost:8081';

    constructor(protected http: HttpClient) {}
  
    addHistorialAPaciente(id_medico: number, id_paciente: number, historial: HistorialMedicoDto): Observable<HistorialMedicoDto>{
        return this.http.post<HistorialMedicoDto>(`${this.apiUrl}/medicos/${id_medico}/pacientes/${id_paciente}/historial-medico/add-historial-medico`, historial);
    }

    getHistorialDePaciente(id_medico: number, id_paciente: number): Observable<HistorialMedico[]>{
        return this.http.get<HistorialMedico[]>(`${this.apiUrl}/medicos/${id_medico}/pacientes/${id_paciente}/historial-medico/get-historial-medico`);
    }

    deleteHistorial(id_medico: number, id_paciente: number, id_historial: number): Observable<void>{
        return this.http.delete<void>(`${this.apiUrl}/medicos/${id_medico}/pacientes/${id_paciente}/historial-medico/delete-historial-medico/${id_historial}`);
    }

}