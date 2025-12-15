export interface ReservaDto {
    id: number;
    fechaReserva: string;
    horaReserva: string;
    nombrePaciente: String;
    apellidoPaciente: string;
    apellidoMedico: string;
    especialidadMedico?: string;
    nombreObraSocial: String;
  }