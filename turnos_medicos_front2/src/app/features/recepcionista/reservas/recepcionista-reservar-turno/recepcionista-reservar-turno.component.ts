import { Component, OnInit } from '@angular/core';
import { debounceTime } from 'rxjs';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ObraSocialService } from '../../../obras-sociales/obra-social.service';
import { PacienteService } from '../../../pacientes/paciente.service';
import { ObraSocial } from '../../../obras-sociales/obra-social.model';
import { Paciente } from '../../../pacientes/paciente.model';
import { PacienteEmailyDni } from '../../../pacientes/pacienteEmailyDni.model';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { EspecialidadService } from '../../../especialidades/especialidad.service';
import { MedicosService } from '../../../medicos/medicos.service';
import { MedicoDto } from '../../../medicos/medico-dto.model';
import { Turno } from '../../../turnos/turno.model';
import { TurnoService } from '../../../turnos/turno.service';
import { Reserva } from '../../../reservas/reservas.model';
import { ReservaService } from '../../../reservas/reserva.service';


@Component({
  selector: 'app-recepcionista-reservar-turno',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule, MatButtonModule],
  templateUrl: './recepcionista-reservar-turno.component.html',
  styleUrl: './recepcionista-reservar-turno.component.css'
})
export class RecepcionistaReservarTurnoComponent implements OnInit {

  paso1Form!: FormGroup;
  obrasSociales: ObraSocial[] = [];

  // datos guardados para el paso 2
  pacienteEncontrado: Paciente | null = null;
  obraSeleccionadaId: number | null = null;

  especialidades: any[] = [];
  especialidadSeleccionadaId: number | null = null;

  medicosFiltrados: MedicoDto[] = [];

  turnosDisponibles: Turno[] = [];

  medicoSeleccionadoId: number | null = null;

  paso1Completado = false;
  paso2Completado = false;
  paso3Completado = false;

  constructor(
    private fb: FormBuilder,
    private obraService: ObraSocialService,
    private pacienteService: PacienteService,
    private especialidadService: EspecialidadService,
    private medicoService: MedicosService,
    private turnoService: TurnoService,
    private reservaService: ReservaService
  ) {}

  ngOnInit(): void {
    this.paso1Form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      dni: ['', [Validators.required]],
      obraSocialId: ['', Validators.required],
      especialidadId: ['', Validators.required], //esto es para el paso 2
      medicoId: ['']
    });


    this.obraService.getObrasSociales().subscribe(data => {
      this.obrasSociales = data;
    });


    this.paso1Form.valueChanges
      .pipe(
        debounceTime(400) // espera 400 ms sin escribir antes de validar
      )
      .subscribe(() => {
        const {email, dni, obraSocialId} = this.paso1Form.value;
        if(email && dni && obraSocialId){
          this.validarPacienteAutomatico();
        }else{
          this.paso1Completado = false;
        }
      });

          // Cuando cambia especialidad
    this.paso1Form.get('especialidadId')?.valueChanges.subscribe(idEsp => {
      this.especialidadSeleccionadaId = idEsp;
      if (idEsp) {
        this.cargarMedicos();
        this.paso2Completado = true;
      } else {
        this.paso2Completado = false;
        this.medicosFiltrados = [];
      }
    });

    //cuando elige medico
    this.paso1Form.get('medicoId')?.valueChanges.subscribe(idMed => {
      this.medicoSeleccionadoId = idMed;
    
      if (idMed) {
        this.cargarTurnos();
        this.paso3Completado = true;
      } else {
        this.turnosDisponibles = [];
        this.paso3Completado = false;
      }
    });
    
  }
  continuarPaso2(): void {
    if (this.paso1Form.invalid) {
      alert('Por favor, completá todos los campos correctamente.');
      return;
    }

    const email = this.paso1Form.value.email;
    const dni = this.paso1Form.value.dni;

    this.obraSeleccionadaId = this.paso1Form.value.obraSocialId;

    const pacienteEmailyDni: PacienteEmailyDni = {
      email: this.paso1Form.value.email,
      dni: this.paso1Form.value.dni
    }

    this.pacienteService.buscarPorEmailYDni(pacienteEmailyDni).subscribe({
      next: paciente => {
        this.pacienteEncontrado = paciente;
        this.paso1Completado = true;
        console.log("Paciente encontrado:", paciente);
      },
      error: () => {
        alert("No existe un paciente con ese email y DNI. Debe registrarlo primero.");
      }
    });
  }

  validarPacienteAutomatico(): void {
    const email = this.paso1Form.value.email;
    const dni = this.paso1Form.value.dni;
  
    if (!email || !dni) return;
  
    const pacienteEmailyDni: PacienteEmailyDni = { email, dni };
  
    this.pacienteService.buscarPorEmailYDni(pacienteEmailyDni).subscribe({
      next: (paciente) => {
        this.pacienteEncontrado = paciente;
        this.obraSeleccionadaId = this.paso1Form.value.obraSocialId;
        this.paso1Completado = true;
        this.cargarEspecialidades();
        console.log("Paciente encontrado:", paciente);
      },
      error: () => {
        this.paso1Completado = false;
        this.pacienteEncontrado = null;
      }
    });
  }

  cargarEspecialidades(): void {
    this.especialidadService.getEspecialidades().subscribe({
      next: (data) => {
        this.especialidades = data;
        console.log("Especialidades cargadas:", data);
      },
      error: () => {
        alert("Error al cargar las especialidades");
      }
    });
  }
  
  cargarMedicos(): void {
    if (!this.obraSeleccionadaId || !this.especialidadSeleccionadaId) return;

    this.medicoService.getMedicosPorObraSocial(this.obraSeleccionadaId).subscribe({
      next: data => {
        this.medicosFiltrados = data.filter(
          m => m.idEspecialidades.includes(this.especialidadSeleccionadaId!)
        );
        const todos: MedicoDto = {
          id: -1, 
          dni: "00000000",
          matricula: "000000000000",
          nombre: "Ver Todos",
          apellido: "Ver Todos",
          direccion: "Ver Todos",
          idEspecialidades: [],
          idUsuario: -1


        }
        this.medicosFiltrados.push(todos);
      },
      error: () => {
        this.medicosFiltrados = [];
        console.error("Error cargando médicos");
      }
    });
  }

  cargarTurnos(): void {
    if (!this.medicoSeleccionadoId || this.medicoSeleccionadoId === -1) return;
  
    this.turnoService.getTurnosDeMedico(this.medicoSeleccionadoId)
      .subscribe({
        next: turnos => {
          this.turnosDisponibles = turnos.sort((a, b) =>
            (a.diaTurno + 'T' + a.horaTurno).localeCompare(b.diaTurno + 'T' + b.horaTurno)
          );
          console.log("Turnos disponibles:", this.turnosDisponibles);
        },
        error: err => {
          console.error("Error cargando turnos:", err);
          this.turnosDisponibles = [];
        }
      });
  }

  reservarTurno(turno: Turno): void {
    if (!this.obraSeleccionadaId || !this.pacienteEncontrado) {
      alert("Faltan datos para completar la reserva.");
      return;
    }
  
    const reserva: Reserva = {
      id: 0,
      idTurno: turno.id,
      idPaciente: this.pacienteEncontrado.id,
      idObraSocial: this.obraSeleccionadaId
    };
  
    this.reservaService.crearReserva(reserva).subscribe({
      next: () => {
        alert("¡Turno reservado correctamente!");
        // Sacar ese turno de la lista
        this.turnosDisponibles =
          this.turnosDisponibles.filter(t => t.id !== turno.id);
      },
      error: () => {
        alert("No se pudo reservar el turno.");
      }
    });
  }
  
}


