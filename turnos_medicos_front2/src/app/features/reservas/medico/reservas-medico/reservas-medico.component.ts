import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../../reserva.service';
import { Reserva } from '../../reservas.model';
import { ActivatedRoute } from '@angular/router';
import { Turno } from '../../../turnos/turno.model';
import { TurnoService } from '../../../turnos/turno.service';
import { Medico } from '../../../medicos/medico.model';
import { MedicosService } from '../../../medicos/medicos.service';
import { ObraSocial } from '../../../obras-sociales/obra-social.model';
import { ObraSocialService } from '../../../obras-sociales/obra-social.service';
import { Paciente } from '../../../pacientes/paciente.model';
import { PacienteService } from '../../../pacientes/paciente.service';
import { ReservaDto } from '../../reserva-dto.model';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-reservas-medico',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule, MatButtonModule],
  templateUrl: './reservas-medico.component.html',
  styleUrl: './reservas-medico.component.css'
})
export class ReservasMedicoComponent implements OnInit {

  //este lo dejo de usar
  detalleReservasMedico: {reserva: Reserva, turno: Turno, paciente: Paciente, obraSocial: ObraSocial}[] = [];

  //reemplazo por este
  reservasDtoMedico!: ReservaDto[];

  columnas: string[] = ['nombrePaciente', 'apellidoPaciente', 'obraSocial', 'fechaReserva', 'horaReserva'];


  constructor(
    private route: ActivatedRoute,
    private reservaService: ReservaService,
    private turnosService: TurnoService,
    private pacienteService: PacienteService,
    private obraSocialService: ObraSocialService,
    private medicoService: MedicosService
  ) {}

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe(params => {
      const id = params.get('id_medico');
      if (id) {
        const medicoId = Number(id);
        this.verReservasDelMedico(medicoId);
      }
    });
  }
  
  verReservasDelMedico(medicoId: number): void {
    this.reservaService.obtenerReservasPorMedico(medicoId).subscribe({
      next: (data) => {
        this.reservasDtoMedico = data;
      },
      error: (err) => {
        console.error('Error al cargar las reservas del medico: ', err);
      }
    });
  } 

}
