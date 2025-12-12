import { Especialidad } from "../especialidades/especialidad.model";
import { ObraSocial } from "../obras-sociales/obra-social.model";
import { Usuario } from "../Usuarios/usuario.model";

export interface Medico {
    id: number;
    nombre: string;
    apellido: string;
    direccion: string;
    usuario: Usuario;
    //especialidadId: number;
    //obrasSocialesId: number[];
    especialidad: Especialidad;
    obrasSociales: ObraSocial[];
  }