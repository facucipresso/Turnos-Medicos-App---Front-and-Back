import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Paciente } from '../../paciente.model';
import { PacienteService } from '../../paciente.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';


@Component({
  selector: 'app-paciente-form',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './paciente-form.component.html',
  styleUrl: './paciente-form.component.css'
})
export class PacienteFormComponent implements OnInit{

  form: FormGroup;
  pacienteId !: number;
  usuarioId !: number;
  administradorId !: number;
  modoEdicion = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private pacienteService: PacienteService
  ){
    this.form = this.fb.group({
      dni: ['', Validators.required], 
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      direccion: ['', Validators.required],
      //email: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    /* si toma el id_usuario, quiere decir que esta en modo creacion, cuando se registra el usuario
       cuando toma id solo ya es el id del paciente, por lo cual esta en modo edicion
       me falta toma el id_administrador para poder completar la ruta*/
      this.route.paramMap.subscribe(parametros => {
        let idAdminParam = parametros.get('id_administrador');
        if(!idAdminParam){
          idAdminParam = this.route.parent?.snapshot.paramMap.get('id_administrador') ?? null;
        }
        if(idAdminParam){
          this.administradorId = Number(idAdminParam);//tengo el id del admin
          const idParamPaciente = this.route.snapshot.paramMap.get('id_paciente');// busco el id del paciente
          if(idParamPaciente){
            this.pacienteId = Number(idParamPaciente);//tengo el id del paciente
            this.modoEdicion = true;
    
            this.pacienteService.getPacienteById(this.pacienteId).subscribe({
              next: (pacient) => {
                this.usuarioId = pacient.idUsuario;
                this.form.setValue({
                  nombre: pacient.nombre,
                  apellido: pacient.apellido,
                  direccion: pacient.direccion
                });
              },
              error: (err) => {
                console.error('Error al obtener el paciente: ', err);
              }
            });
            
          }
        }else{
          //sino busco capturar el id del usuario que es cuando se esta terminando de registar
          const idParamUsuario = this.route.snapshot.paramMap.get('id_usuario');
          this.usuarioId = Number(idParamUsuario);
          this.modoEdicion = false;
        }
      })
  }

  guardarPaciente(): void{
    if(this.form.invalid){
      console.log('Formulario invalido');
      return;
    }
    const datosFormulario = this.form.value;

    if(this.modoEdicion && this.pacienteId !==undefined){
      //modo edicion
      const paciente: Paciente = {
        id: this.pacienteId,
        dni: datosFormulario.dni, //agregue esto aca
        nombre: datosFormulario.nombre,
        apellido: datosFormulario.apellido,
        direccion: datosFormulario.direccion,
        //email: datosFormulario.email
        idUsuario: this.usuarioId ?? 0
      }
      this.pacienteService.editarPaciente(this.pacienteId, paciente).subscribe({
        next: (res) => {
          console.log('Paciente actualizado: ', res);
          this.router.navigate(['admin', this.administradorId,'pacientes']);//ya modificada

        },
        error: (err) => {
          console.error('Error al actualizar el paciente: ', err);
        }
      });
    }else{//modo creacion
      const paciente: Paciente = {
        id: 0,
        dni: datosFormulario.dni,
        nombre: datosFormulario.nombre,
        apellido: datosFormulario.apellido,
        direccion: datosFormulario.direccion,
        idUsuario: this.usuarioId ?? 0
      }
      this.pacienteService.addPaciente(paciente).subscribe({
        next: (res) => {
          console.log('Paciente creado: ', res);
          this.router.navigate(['paciente',res.id]);
        },
        error : (err) => {
          console.error('Errror al crear el paciente: ', err);
        }
      });
    }
  }

}
