import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { debounceTime } from 'rxjs';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
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
import { EspecialidadService } from '../../../especialidades/especialidad.service';
import { MedicosService } from '../../../medicos/medicos.service';
import { MedicoDto } from '../../../medicos/medico-dto.model';
import { Turno } from '../../../turnos/turno.model';
import { TurnoService } from '../../../turnos/turno.service';
import { Reserva } from '../../../reservas/reservas.model';
import { ReservaCancelDto } from '../../../reservas/ReservaCancelDto.model';
import { ReservaDto } from '../../../reservas/reserva-dto.model';
import { ReservaService } from '../../../reservas/reserva.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../../carteles/confirm-dialog/confirm-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { Medico } from '../../../medicos/medico.model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCard, MatCardActions } from '@angular/material/card';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-recepcionista-cancelar-reserva',
  standalone: true,
  imports: [CommonModule, MatDividerModule, FormsModule,ReactiveFormsModule, MatCardModule,MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule, MatButtonModule, MatDialogModule, MatSnackBarModule, MatIconModule, MatDatepickerModule, MatNativeDateModule, MatCard, MatCardActions],
  templateUrl: './recepcionista-cancelar-reserva.component.html',
  styleUrl: './recepcionista-cancelar-reserva.component.css'
})
export class RecepcionistaCancelarReservaComponent implements OnInit{

  formBusqueda!: FormGroup;

    /** Fecha mínima = hoy */
    minDate: Date = new Date();

    reservaEncontrada: ReservaDto | null = null;
    buscando = false;


  constructor(
    private fb: FormBuilder,
    private obraService: ObraSocialService,
    private pacienteService: PacienteService,
    private especialidadService: EspecialidadService,
    private medicoService: MedicosService,
    private turnoService: TurnoService,
    private reservaService: ReservaService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
    this.formBusqueda = this.fb.group(
      {
        // este seria el paso 1
        dni: ['', [Validators.pattern('^[0-9]{7,8}$')]],
        nombrePaciente: [''],
        apellidoPaciente: [''],

        //este seria el paso 2
        fecha: ['', [Validators.required, this.fechaNoPasadaValidator]],
        hora: ['', [Validators.required, this.horaValidaValidator]],
        nombreMedico: [''],
        apellidoMedico: ['']
      },
      { validators: [this.dniONombreValidator, this.nombreMedicoValidator] }
    );
    
  }

  dniONombreValidator(form: FormGroup) {
    const dni = form.get('dni')?.value;
    const nombre = form.get('nombrePaciente')?.value;
    const apellido = form.get('apellidoPaciente')?.value;
  
    const tieneDni = !!dni; // '!!' asigna true si el contenido es valido
    const tieneNombreCompleto = !!nombre && !!apellido;
  
    if (tieneDni || tieneNombreCompleto) {
      return null; // Un validator devuelve null cuando TODO ESTÁ BIEN
    }
  
    return { dniONombreRequerido: true }; // el validator NO lanza errores, NO muestra mensajes, NO corta el flujo.simplemente devuelve un objeto de errores:
  }

  nombreMedicoValidator(form: FormGroup) {
    const nombre = form.get('nombreMedico')?.value;
    const apellido = form.get('apellidoMedico')?.value;
  
    const tieneNombreCompleto = !!nombre && !!apellido;
  
    if (tieneNombreCompleto) {
      return null; // Un validator devuelve null cuando TODO ESTÁ BIEN
    }
  
    return { nombreRequerido: true }; // el validator NO lanza errores, NO muestra mensajes, NO corta el flujo.simplemente devuelve un objeto de errores:
  }

  filtroFechas = (date: Date | null): boolean => {
    if (!date) return false;
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  horaValidaValidator(control: any) {
    if (!control.value) return null;
  
    const [hora, minutos] = control.value.split(':').map(Number);
    const totalMin = hora * 60 + minutos;
  
    const min = 8 * 60;
    const max = 18 * 60;
  
    return totalMin >= min && totalMin <= max
      ? null
      : { horaInvalida: true };
  }

  fechaNoPasadaValidator(control: any) {
    if (!control.value) return null;
  
    const fechaSeleccionada = new Date(control.value);
    const hoy = new Date();
  
    // Normalizamos para comparar solo fechas (sin horas)
    fechaSeleccionada.setHours(0, 0, 0, 0);
    hoy.setHours(0, 0, 0, 0);
  
    return fechaSeleccionada < hoy
      ? { fechaPasada: true }
      : null;
  }
  

  get paso1Valido(): boolean {
    return (
      !this.formBusqueda.hasError('dniONombreRequerido') &&
      (this.formBusqueda.get('dni')?.valid ||
       (this.formBusqueda.get('nombrePaciente')?.value &&
        this.formBusqueda.get('apellidoPaciente')?.value))
    );
  }
  
  get paso2Valido(): boolean {
    return (
      this.formBusqueda.get('fecha')?.valid &&
      !this.formBusqueda.get('fecha')?.hasError('fechaPasada') &&
      this.formBusqueda.get('hora')?.valid &&
      this.formBusqueda.get('nombreMedico')?.value &&
      this.formBusqueda.get('apellidoMedico')?.value
    );
  }

  private buildCancelDto(): ReservaCancelDto {
    const fecha: Date = this.formBusqueda.get('fecha')!.value;
  
    return {
      dni: this.formBusqueda.get('dni')?.value || null,
      nombrePaciente: this.formBusqueda.get('nombrePaciente')?.value || null,
      apellidoPaciente: this.formBusqueda.get('apellidoPaciente')?.value || null,
  
      //transformaciones IMPORTANTES
      fechaTurno: fecha.toISOString().split('T')[0], // yyyy-MM-dd
      horaTurno: this.formBusqueda.get('hora')!.value, // HH:mm
  
      nombreMedico: this.formBusqueda.get('nombreMedico')!.value,
      apellidoMedico: this.formBusqueda.get('apellidoMedico')!.value
    };
  }

  buscarReserva(): void {
    if (!this.formBusqueda.valid) {
      this.formBusqueda.markAllAsTouched();
      return;
    }
  
    this.buscando = true;
    const reservaCancel = this.buildCancelDto();
    console.log('DTO cancelación:', reservaCancel);
  
    this.reservaService.buscarReservaParaCancelar(reservaCancel).subscribe({
      next: (reserva) => {
        this.reservaEncontrada = reserva;
        this.buscando = false;
      },
      error: (err) => {

        this.reservaEncontrada = null;
        this.formBusqueda.reset();
        this.buscando = false;

        /* this.reservaEncontrada = null;
        this.buscando = false;

        this.snackBar.open(
          err.error?.message || 'No se encontró la reserva',
          'Cerrar',
          { duration: 4000 }
        ); */

        if (err.status === 404 && err.error?.message) {
            // Error controlado desde el backend
            this.snackBar.open(
              "No se encontró ninguna reserva de turno con los datos ingresados.",
              'Cerrar',
              {
                duration: 50000,
                panelClass: ['snackbar-error']
              }
            );
          
          
        } else {
          // Error genérico (500, network, etc)
          this.snackBar.open(
            'Ups, paso algo inesperado en el servidor',
            'Cerrar',
            {
              duration: 40000,
              panelClass: ['snackbar-error']
            }
          );
        }

      }
    });
  }

  confirmarCancelacion() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        titulo: 'Cancelar reserva',
        mensaje: '¿Está seguro que desea cancelar esta reserva?'
      }
    });
  
    dialogRef.afterClosed().subscribe(confirmado => {
      if (confirmado) {
        this.cancelarReserva();
      }else{
        this.reservaEncontrada = null;
      }
      
    });
  }

  cancelarReserva() {
    this.reservaService.eliminarReserva(this.reservaEncontrada!.id)
      .subscribe(() => {
        this.snackBar.open(
          'La reserva ha sido eliminada correctamente',
          'Cerrar',
          { duration: 3000 }
        );
        this.reservaEncontrada = null;
        this.formBusqueda.reset();
      });
  }
  
  
  

}
