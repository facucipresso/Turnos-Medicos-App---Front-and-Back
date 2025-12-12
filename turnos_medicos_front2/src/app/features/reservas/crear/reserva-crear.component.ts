import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ObraSocial } from '../../obras-sociales/obra-social.model';
import { Especialidad } from '../../especialidades/especialidad.model';
import { Medico } from '../../medicos/medico.model';
import { MedicoDto } from '../../medicos/medico-dto.model';
import { Turno } from '../../turnos/turno.model';
import { Reserva } from '../reservas.model';

import { ObraSocialService } from '../../obras-sociales/obra-social.service';
import { EspecialidadService } from '../../especialidades/especialidad.service';
import { MedicosService } from '../../medicos/medicos.service';
import { TurnoService } from '../../turnos/turno.service';
import { ReservaService } from '../reserva.service';

@Component({
  selector: 'app-reserva-crear',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule, MatIconModule ],
  templateUrl: './reserva-crear.component.html',
  styleUrls: ['./reserva-crear.component.css']
})
export class ReservaCrearComponent implements OnInit {

  obrasSociales: ObraSocial[] = [];
  especialidades: Especialidad[] = [];
  medicosFiltrados: MedicoDto[] = [];
  turnosDisponibles: Turno[] = [];

  obraSeleccionadaId: number | null = null;
  especialidadSeleccionadaId: number | null = null;
  medicoSeleccionadoId: number | null = null;

  pacienteId: number = 0;
  tieneMedicos: boolean = true;
  //esPaciente = false;

  constructor(
    private route: ActivatedRoute,
    private obraSocialService: ObraSocialService,
    private especialidadService: EspecialidadService,
    private medicoService: MedicosService,
    private turnoService: TurnoService,
    private reservaService: ReservaService,
    private router: Router
  ) {}

  ngOnInit(): void {

    //no importa si viene de la ruta lisa o del padre, va a tener la misma funcionalidad
    this.route.paramMap.subscribe(params => {
      let idPacienteParam = params.get('id_paciente');
      if (!idPacienteParam) {
        idPacienteParam = this.route.parent?.snapshot.paramMap.get('id_paciente') ?? null;
      }
  
      if (idPacienteParam) {
        this.pacienteId = Number(idPacienteParam);
      }
    });

    // Cargar listas desde backend
    this.obraSocialService.getObrasSociales().subscribe(data => {
      this.obrasSociales = data;
    });

    this.especialidadService.getEspecialidades().subscribe(data => {
      this.especialidades = data;
    });
  }

  //elige obra social
  onObraSocialChange(): void {
    this.resetSeleccionesHasta('obraSocial');
  }

  //elige especialidad
  onEspecialidadChange(): void {
    this.resetSeleccionesHasta('especialidad');
  
    if (!this.obraSeleccionadaId || !this.especialidadSeleccionadaId) {
      this.medicosFiltrados = [];
      this.tieneMedicos = true;
      return;
    }
  
    this.medicoService.getMedicosPorObraSocial(this.obraSeleccionadaId).subscribe({
        next: data => {
          this.medicosFiltrados = data.filter(
            m => m.idEspecialidades.some(e => e === this.especialidadSeleccionadaId)
          );
          this.tieneMedicos = this.medicosFiltrados.length > 0;
        },
        error: err => {
          console.error('Error cargando médicos filtrados:', err);
          this.medicosFiltrados = [];
          this.tieneMedicos = true;
        }
      });
  }

  //selecciono médico y cargo turnos libres
  onMedicoSeleccionado(): void {
    if (!this.medicoSeleccionadoId) return;

    this.turnoService.getTurnosDeMedico(this.medicoSeleccionadoId).subscribe((turnos: Turno[]) => {
      // Solo muestro los que NO están reservados
      this.turnosDisponibles = turnos.filter(t => !t.reservado);
    });
  }
  
  // reseteo pasos siguientes según lo que haya cambiado
  resetSeleccionesHasta(nivel: 'obraSocial' | 'especialidad'): void {
    if (nivel === 'obraSocial') {
      this.especialidadSeleccionadaId = null;
      this.medicoSeleccionadoId = null;
      this.medicosFiltrados = [];
      this.turnosDisponibles = [];
    }
    if (nivel === 'especialidad') {
      this.medicoSeleccionadoId = null;
      this.turnosDisponibles = [];
    }
  }

  // por ultimo reservo el turno
  reservarTurno(turno: Turno): void {
    if (!this.obraSeleccionadaId) {
      alert('Error: No se seleccionó una obra social.');
      return;
    }

    const reserva: Reserva = {
      id: 0, // backend lo asigna
      idTurno: turno.id,
      idPaciente: this.pacienteId,
      idObraSocial: this.obraSeleccionadaId
    };

    this.reservaService.crearReserva(reserva).subscribe({
      next: () => {
        alert('¡Turno reservado exitosamente!');
        this.turnosDisponibles = this.turnosDisponibles.filter(t => t.id !== turno.id);
        this.router.navigate(['paciente', this.pacienteId]);
      },
      error: (err) => {
        console.error(err);
        alert('No se pudo reservar el turno. Intentá de nuevo.');
      }
    });
  }

}
