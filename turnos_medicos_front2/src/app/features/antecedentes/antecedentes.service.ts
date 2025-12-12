import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Antecedente } from "./antecedente.model";
@Injectable({
    providedIn: 'root'
})
export class AntecedenteService{
    private apiUrl = 'http://localhost:8081';

    constructor(protected http: HttpClient) {}

    createAntecedente(antecedente:Antecedente ,idPaciente: number): Observable<Antecedente>{
        return this.http.post<Antecedente>(`${this.apiUrl}/medicos/pacientes/${idPaciente}/antecedentes/create-antecedentes`, antecedente);
    }

    updateAntecedente(antecedente: Antecedente, idPaciente: number): Observable<Antecedente>{
        return this.http.put<Antecedente>(`${this.apiUrl}/medicos/pacientes/${idPaciente}/antecedentes/update-antecedentes`, antecedente);
    }

    getAntecedentes(idPaciente: number): Observable<Antecedente>{
        return this.http.get<Antecedente>(`${this.apiUrl}/medicos/paciente/${idPaciente}/antecedentes/get-antecedentes`);
    }

}