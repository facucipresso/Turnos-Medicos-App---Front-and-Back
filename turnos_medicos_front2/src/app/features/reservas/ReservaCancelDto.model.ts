export interface ReservaCancelDto {
    dni?: string; 
    nombrePaciente?: string;
    apellidoPaciente?: string;
    fechaTurno: string; // yyyy-MM-dd
    horaTurno: string; // HH:mm
    nombreMedico: string;
    apellidoMedico: string;
  }