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
    private especialidadService: EspecialidadService
  ) {
    this.form = this.fb.group({
      dni: ['', Validators.required],
      matricula: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      direccion: ['', Validators.required],
      //email: ['', [Validators.required, Validators.email]],
      //especialidadId: [null, Validators.required],
      //obrasSocialesId: [[]] ESTO ACA YA NO VA MAS
      idEspecialidades: [[], Validators.required]
    });
  }

  ngOnInit(): void {
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

  ngOnDestroy(): void {
    if (this.obrasSocialesSub) this.obrasSocialesSub.unsubscribe();
    if (this.especialidadesSub) this.especialidadesSub.unsubscribe();
  }

  guardarMedico(): void {
    if (this.form.valid) {
      const medicoFormValue = this.form.value;

      const medicoDto: MedicoDto = {
        id:  0, //aca iria 0 directamente
        dni: medicoFormValue.dni,//esto no esta agregado
        matricula: medicoFormValue.matricula, //esto no esta agregado todavia en el form
        nombre: medicoFormValue.nombre,
        apellido: medicoFormValue.apellido,
        direccion: medicoFormValue.direccion,
        idEspecialidades: medicoFormValue.idEspecialidades,
        //email: medicoFormValue.email,
        
        //VER COMO HAGO ESTO PORQUE AHORA SON VARIAS ESPECIALIDADES LAS QUE SE LLEVA EL DTO
        //idEspecialidad: medicoFormValue.especialidadId,
        
        idUsuario: this.idUsuario ?? 0
      };

      if (this.medicoId) {
        console.log("Es medico");
      } else {
        // CREAR NUEVO
        this.medicoService.addMedico(medicoDto).subscribe({
          next: (nuevoMedico) => {
            console.log('Nuevo médico creado sin obras sociales', nuevoMedico);
            this.router.navigate(['admin', this.idAdmin, 'medicos']);
          },
          error: (err) => console.error('Error al crear médico:', err)
        });
      }
    } else {
      console.log('Formulario inválido');
    }
  }

  onCheckboxChange(event: any): void {
    const id = +event.target.value;
    const currentIds: number[] = this.form.value.obrasSocialesId ?? [];
    let updatedIds: number[];

    if (event.target.checked) {
      if(!currentIds.includes(id)){
        updatedIds = [...currentIds, id];
      }else{
        updatedIds = currentIds;
      } 
    } else {
      updatedIds = currentIds.filter(existingId => existingId !== id);
    }

    this.form.patchValue({ obrasSocialesId: updatedIds });
  }
}
