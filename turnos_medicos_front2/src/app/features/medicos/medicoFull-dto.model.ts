export interface MedicoFullDto {
    id: number;
    dni: string;
    matricula: string;
    nombre: string;
    apellido: string;
    email: string,
    direccion: string;
    idEspecialidades: number[];
    idUsuario: number,
    idObrasSociales: number[]
  }