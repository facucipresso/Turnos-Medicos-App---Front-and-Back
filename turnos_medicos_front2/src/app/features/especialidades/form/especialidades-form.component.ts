import { Component, OnInit } from '@angular/core';
import { EspecialidadService } from '../especialidad.service';
import { Especialidad } from '../especialidad.model';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-especialidades-form',
  imports: [ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './especialidades-form.component.html',
  styleUrls: ['./especialidades-form.component.css']
})
export class EspecialidadesFormComponent implements OnInit{

  form: FormGroup;
  especialidadId?: number;
  modoEdicion= false;
  administradorId!: number;

  constructor(
    private fb: FormBuilder,
    private especialidadService: EspecialidadService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    const idAdminParam = this.route.snapshot.paramMap.get('id_administrador') ?? this.route.parent?.snapshot.paramMap.get('id_administrador');
    if(idAdminParam){
      this.administradorId = Number(idAdminParam);
    }

    const idParam = this.route.snapshot.paramMap.get('id');

    if(idParam){
      this.especialidadId = Number(idParam);
      this.modoEdicion = true;

      this.especialidadService.getEspecialidadPorId(this.especialidadId).subscribe({
        next: (espe) => {
          this.form.setValue({
            nombre: espe.nombre
           })
        },
         error: (err)=> {
          console.error('Error al cargar especialidad', err);
          alert('No se pudo cargar la especialidad');
        }
      });
    }
  }

  agregarEspecialidad(): void {

    if(this.form.invalid){
      console.log('Formulario invaldo');
      return;
    }

    const valores = this.form.value;

    if(this.modoEdicion && this.especialidadId !== undefined){ //modo edicion
      const especialidad: Especialidad = {
        id: this.especialidadId,
        nombre: valores.nombre
      }
      this.especialidadService.editarEspecialidad(especialidad).subscribe({
        next: () => {
          this.router.navigate(['admin', this.administradorId,'especialidades']);

        },
        error: (err) => {
          console.error('Error al editar especialidad', err);
        }
      });
    }else{//estoy creando
      this.especialidadService.agregarEspecialidad(valores.nombre).subscribe({
        next: () => {
          this.router.navigate(['admin', this.administradorId,'especialidades']);
        },
        error: (err) => {
          console.error('Error al agregar especialidad', err);
        }
      });
      }
    }

}

