import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservaService } from '../../reserva.service';
import { Reserva } from '../../reservas.model';
import { ActivatedRoute } from '@angular/router';
import { Turno } from '../../../turnos/turno.model';
import { TurnoService } from '../../../turnos/turno.service';
import { Medico } from '../../../medicos/medico.model';
import { MedicosService } from '../../../medicos/medicos.service';
import { ObraSocial } from '../../../obras-sociales/obra-social.model';
import { ObraSocialService } from '../../../obras-sociales/obra-social.service';
import { Especialidad } from '../../../especialidades/especialidad.model';
import { EspecialidadService } from '../../../especialidades/especialidad.service';
import { MedicoDto } from '../../../medicos/medico-dto.model';
import { Subscription } from 'rxjs';
import { ReservaDto } from '../../reserva-dto.model';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardTitle } from '@angular/material/card';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-reservas-paciente',
  standalone: true,
  imports: [CommonModule,RouterModule, MatCardTitle, MatTableModule, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './reservas-paciente.component.html',
  styleUrl: './reservas-paciente.component.css'
})
export class ReservasPacienteComponent implements OnInit{

  detalleReservas: {reserva: Reserva, turno: Turno, medico: MedicoDto, obraSocial: ObraSocial, especialidad?: Especialidad}[] = [];
  medico!: Medico;
  reservasdto: ReservaDto[] = [];
  pacienteId!: number;
  esPaciente = false;

  constructor(
    private reservasService: ReservaService,
    private route: ActivatedRoute,
    private turnoService: TurnoService,
    private medicoService: MedicosService,
    private obraSocialService: ObraSocialService,
    private especialidadService: EspecialidadService
  ){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let idPacienteParam = params.get('id_paciente');
      if (!idPacienteParam) {
        idPacienteParam = this.route.parent?.snapshot.paramMap.get('id_paciente') ?? null;
      }
  
      if (idPacienteParam) {
        this.esPaciente = true;
        this.pacienteId = Number(idPacienteParam);
        this.verReservasPaciente(this.pacienteId);
      }
    });

  }

  verReservasPaciente(pac_id: number): void {
    this.detalleReservas = [];
  
    const reservasPaciente = this.reservasService.obtenerReservasPorPaciente(pac_id).subscribe({
      next: (data) => {
        this.reservasdto = data;
      },
      error: (err) => {
        console.error('Error al cargar las reservas del paciente: ', err);
      }
    })
  }
  

  cancelarReserva(idReserva: number): void {
    
    const confirmacion = confirm('Estas seguro que queres eliminar la reserva?');
    if(confirmacion){
      this.reservasService.eliminarReserva(idReserva).subscribe({
        next: () => {
          console.log('Reserva eliminada con éxito');
          this.verReservasPaciente(this.pacienteId);
        },
        error: (err) => {
          console.error('Error al intentar eliminar la reserva: ', err);
        }
      });
    }
  }

}
