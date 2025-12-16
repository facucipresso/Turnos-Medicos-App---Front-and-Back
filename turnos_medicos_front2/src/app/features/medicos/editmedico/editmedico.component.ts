import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { MedicosService } from '../medicos.service';
import { ObraSocialService } from '../../obras-sociales/obra-social.service';
import { ObraSocial } from '../../obras-sociales/obra-social.model';
import { forkJoin, Subscription } from 'rxjs';
import { EspecialidadService } from '../../especialidades/especialidad.service';
import { Especialidad } from '../../especialidades/especialidad.model';
import { MedicoDto } from '../medico-dto.model';
import { MatError, MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MedicoFullDto } from '../medicoFull-dto.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-editmedico',
  imports: [
    CommonModule, // <-- Agregar esta línea
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatError,
    MatOption,
    MatInputModule, // <-- También necesitas esto para los inputs
    MatSelectModule, // <-- Y esto para los selects
    MatButtonModule // <-- Para los botones de Material
  ],
  templateUrl: './editmedico.component.html',
  styleUrl: './editmedico.component.css'
})
export class EditmedicoComponent implements OnInit {

  medicoConReservas: boolean = false;
  form!: FormGroup;
  adminId!: number;
  medicoEditando: any = null;
  medicos: MedicoFullDto[] = [];
  administradorId!: number;

  obrasSocialesDisponibles: ObraSocial[] = [];
  obrasSocialesSeleccionadas: number[] = []; // para mantener las originales
  private obrasSocialesSub!: Subscription;

  especialidadesDisponibles: Especialidad[] = [];
  private especialidadesSub!: Subscription;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private medicoService: MedicosService,
    private obraSocialService: ObraSocialService,
    private especialidadService: EspecialidadService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const idAdminParam = this.route.snapshot.paramMap.get('id_administrador') ?? this.route.parent?.snapshot.paramMap.get('id_administrador');
    if (idAdminParam) {
      this.administradorId = Number(idAdminParam);
    }

    this.initForm();

    forkJoin({
      medicos: this.medicoService.getMedicosFull(),
      especialidades: this.especialidadService.getEspecialidades(),
      obras: this.obraSocialService.getObrasSociales()
    }).subscribe(({ medicos, especialidades, obras }) => {
      this.medicos = medicos;
      this.especialidadesDisponibles = especialidades;
      this.obrasSocialesDisponibles = obras;

      this.cargarMedico(); // <-- AHORA SÍ
    });
  }


  initForm() {
    this.form = this.fb.group({
      email: ['', {
        validators: [
          Validators.required,
          Validators.email,
          this.emailExistenteValidator()
        ],
        updateOn: 'blur'
      }],

      dni: ['', {
        validators: [
          Validators.required,
          this.soloNumerosValidator(),
          this.longitudDniValidator(),
          this.dniExistenteValidator()
        ],
        updateOn: 'blur'
      }],

      matricula: ['', {
        validators: [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(8),
          this.soloNumerosValidator(),,
          this.matriculaExistenteValidator()
        ],
        updateOn: 'blur'
      }],

      nombre: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
      ]],

      apellido: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
      ]],

      direccion: ['', Validators.required],

      idEspecialidades: [[], Validators.required],
      idObrasSociales: [[], Validators.required]
    });
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

  cargarTodosLosMedicos() {
    this.medicoService.getMedicosFull().subscribe(data => {
      this.medicos = data;

    });
  }

  dniExistenteValidator() {
    return (control: any) => {
      if (!control.value) {
        return null;
      }

      let existe = this.medicos.some(
        medico => medico.dni === control.value
      );

      if (this.medicoEditando.dni == control.value) {
        return null;
      }

      return existe ? { dniExistente: true } : null;
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

      if (this.medicoEditando.matricula == control.value) {
        return null;
      }

      return existe ? { matriculaExistente: true } : null;
    };
  }

  emailExistenteValidator() {
    return (control: any) => {
      if (!control.value || this.medicos.length === 0) {
        return null;
      }

      const existe = this.medicos.some(
        medico => medico.email === control.value
      );

      if (this.medicoEditando.email == control.value) {
        return null;
      }

      return existe ? { emailExistente: true } : null;
    };
  }

  cargarObrasSociales() {
    this.obrasSocialesSub = this.obraSocialService.getObrasSociales().subscribe(data => {
      this.obrasSocialesDisponibles = data;
    });
  }

  cargarEspecialidades() {
    this.especialidadesSub = this.especialidadService.getEspecialidades().subscribe(data => {
      this.especialidadesDisponibles = data;
    });
  }

  cargarMedico() {
    const medicoGuardado = localStorage.getItem('medicoEditando');

    if (!medicoGuardado) return;

    this.medicoEditando = JSON.parse(medicoGuardado);

    this.form.patchValue({
      email: this.medicoEditando.email,
      dni: this.medicoEditando.dni,
      matricula: this.medicoEditando.matricula,
      nombre: this.medicoEditando.nombre,
      apellido: this.medicoEditando.apellido,
      direccion: this.medicoEditando.direccion,
      idEspecialidades: this.medicoEditando.idEspecialidades,
      idObrasSociales: this.medicoEditando.idObrasSociales
    });
  }

  guardarCambios() {
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
      this.ejecutarCambios();
    }
  });



  }

  ejecutarCambios() {
    const medicoFormValue = this.form.value;

    const medicoActualizado: MedicoFullDto = {
      id: this.medicoEditando.id,
      idUsuario: this.medicoEditando.idUsuario,
      dni: medicoFormValue.dni,
      matricula: medicoFormValue.matricula,
      nombre: medicoFormValue.nombre,
      apellido: medicoFormValue.apellido,
      email: medicoFormValue.email,
      direccion: medicoFormValue.direccion,
      idEspecialidades: medicoFormValue.idEspecialidades,
      idObrasSociales: medicoFormValue.idObrasSociales,
    };

    this.medicoService.editarMedico(this.medicoEditando.id, medicoActualizado).subscribe({
      next: () => {
        this.router.navigate([
          'admin',
          this.administradorId,
          'medicos'
        ]);
      },
      error: err => console.error(err)
    });
  }


}
