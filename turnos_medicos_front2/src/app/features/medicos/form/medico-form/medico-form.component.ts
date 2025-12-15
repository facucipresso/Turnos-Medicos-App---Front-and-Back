import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { MedicosService } from '../../medicos.service';
import { ObraSocialService } from '../../../obras-sociales/obra-social.service';
import { ObraSocial } from '../../../obras-sociales/obra-social.model';
import { Subscription } from 'rxjs';
import { EspecialidadService } from '../../../especialidades/especialidad.service';
import { Especialidad } from '../../../especialidades/especialidad.model';
import { MedicoDto } from '../../medico-dto.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MedicoFullDto } from '../../medicoFull-dto.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-medico-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './medico-form.component.html',
  styleUrl: './medico-form.component.css'
})
export class MedicoFormComponent implements OnInit, OnDestroy {

  form: FormGroup;
  medicoId?: number;
  idUsuario?: number;
  idAdmin?: number;
  medicos: MedicoFullDto[] = [];


  obrasSocialesDisponibles: ObraSocial[] = [];
  obrasSocialesSeleccionadas: number[] = []; // para mantener las originales
  private obrasSocialesSub!: Subscription;

  especialidadesDisponibles: Especialidad[] = [];
  private especialidadesSub!: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private medicoService: MedicosService,
    private obraSocialService: ObraSocialService,
    private especialidadService: EspecialidadService,
    private dialog: MatDialog
  ) {
    this.form = this.fb.group({
      dni: [
        '',
        [
          Validators.required,
          this.soloNumerosValidator(),
          this.longitudDniValidator()
        ]
      ],
      matricula: [
        '',
        [
          Validators.required,
          Validators.maxLength(10)
        ]
      ],
      nombre: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        ]
      ],
      apellido: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        ]
      ],
      direccion: ['', Validators.required],
      idEspecialidades: [[], Validators.required],
      idObrasSociales: [[], Validators.required]
    });

  }

  ngOnInit(): void {

    this.medicoService.getMedicosFull().subscribe(data => {
      this.medicos = data;

      const dniControl = this.form.get('dni');
      dniControl?.addValidators(this.dniExistenteValidator());
      dniControl?.updateValueAndValidity();

      const matriculaControl = this.form.get('matricula');
      matriculaControl?.addValidators(this.matriculaExistenteValidator());
      matriculaControl?.updateValueAndValidity();
    });

    this.medicoService.getMedicosFull().subscribe(data => {
      this.medicos = data;
    });

    this.obrasSocialesSub = this.obraSocialService.getObrasSociales().subscribe(data => {
      this.obrasSocialesDisponibles = data;
    });


    //cargo las especialidades para que pueda seleccionarla
    this.especialidadesSub = this.especialidadService.getEspecialidades().subscribe(data => {
      this.especialidadesDisponibles = data;
    });

    let idAdminParam = this.route.snapshot.paramMap.get('id_administrador');
    if (!idAdminParam) {
      idAdminParam = this.route.parent?.snapshot.paramMap.get('id_administrador') ?? null;
    }

    if (idAdminParam) {
      this.idAdmin = Number(idAdminParam);
    }

    //aca tengo que capturar el id del usuario
    const idParam = this.route.snapshot.paramMap.get('id_usuario');
    if (idParam) {
      this.idUsuario = Number(idParam);
    }
  }

  soloNumerosValidator() {
    return (control: any) => {
      if (!control.value) return null;

      return /^[0-9]+$/.test(control.value)
        ? null
        : { soloNumeros: true };
    };
  }

  longitudDniValidator() {
    return (control: any) => {
      if (!control.value) return null;

      return /^\d{8}$/.test(control.value)
        ? null
        : { longitudDni: true };
    };
  }

  matriculaExistenteValidator() {
    return (control: any) => {
      if (!control.value || this.medicos.length === 0) {
        return null;
      }

      const existe = this.medicos.some(
        medico => medico.matricula === control.value
      );

      return existe ? { matriculaExistente: true } : null;
    };
  }


  ngOnDestroy(): void {
    if (this.obrasSocialesSub) this.obrasSocialesSub.unsubscribe();
    if (this.especialidadesSub) this.especialidadesSub.unsubscribe();
  }

  dniExistenteValidator() {
    return (control: any) => {
      if (!control.value || this.medicos.length === 0) {
        return null;
      }

      const existe = this.medicos.some(
        medico => medico.dni === control.value
      );

      return existe ? { dniExistente: true } : null;
    };
  }


guardarMedico(): void {
  if (this.form.invalid) {
    console.log('Formulario inválido');
    return;
  }

  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    width: '400px',
    data: {
      title: '¿Está seguro de realizar esta operación?'
    }
  });

  dialogRef.afterClosed().subscribe(confirmado => {
    if (confirmado) {
      this.crearMedico();
    }
  });
}

private crearMedico(): void {
  
  const medicoFormValue = this.form.value;

  const medicoDto: MedicoFullDto = {
    email: "",
    id: 0,
    dni: medicoFormValue.dni,
    matricula: medicoFormValue.matricula,
    nombre: medicoFormValue.nombre,
    apellido: medicoFormValue.apellido,
    direccion: medicoFormValue.direccion,
    idEspecialidades: medicoFormValue.idEspecialidades,
    idObrasSociales: medicoFormValue.idObrasSociales,
    idUsuario: this.idUsuario ?? 0
  };

  this.medicoService.addMedico(medicoDto).subscribe({
    next: () => {
      this.router.navigate(['admin', this.idAdmin, 'medicos']);
    },
    error: err => console.error('Error al crear médico:', err)
  });
}



  onCheckboxChange(event: any): void {
    const id = +event.target.value;
    const currentIds: number[] = this.form.value.obrasSocialesId ?? [];
    let updatedIds: number[];

    if (event.target.checked) {
      if (!currentIds.includes(id)) {
        updatedIds = [...currentIds, id];
      } else {
        updatedIds = currentIds;
      }
    } else {
      updatedIds = currentIds.filter(existingId => existingId !== id);
    }

    this.form.patchValue({ obrasSocialesId: updatedIds });
  }
}
