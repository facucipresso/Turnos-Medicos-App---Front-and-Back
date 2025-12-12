import { Especialidad } from "../especialidades/especialidad.model";

export interface MedicoDto {
    id: number;
    dni: string;
    matricula: string;
    nombre: string;
    apellido: string;
    direccion: string;
    //idEspecialidad: number;
    idEspecialidades: number[];  // voy a tomar solo los id de las especialidades ahora
    idUsuario: number
  }