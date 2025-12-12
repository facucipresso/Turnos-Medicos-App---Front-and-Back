import { Medico } from "../medicos/medico.model";
export interface Turno{
    id: number;
    diaTurno: string;
    horaTurno: string;
    reservado: boolean;
    medico?: Medico;
}