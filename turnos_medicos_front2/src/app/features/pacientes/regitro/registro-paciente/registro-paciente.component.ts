import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PacienteService } from '../../paciente.service';
import { UsuarioRequest } from '../../../Usuarios/usuario-request.model';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-registro-paciente',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './registro-paciente.component.html',
  styleUrls: ['./registro-paciente.component.css']
})
export class RegistroPacienteComponent implements OnInit{

  origen!: 'PACIENTE' | 'ADMIN' | 'RECEPCIONISTA';

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private pacienteService: PacienteService,
    private router: Router,
    private route: ActivatedRoute
  ){
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.origen = this.route.snapshot.data['origen'];
  }

  registrar() {
    if (this.form.invalid) {
      console.error("Por favor complete correctamente el formulario")
      return;
    }

    const usuario: UsuarioRequest = {
      email: this.form.value.email,
      password: this.form.value.password
    };

    this.pacienteService.registrarUsuario(usuario).subscribe({
      next: (res) => {
        const usuarioId = res.idUsuario;
        if(this.origen == 'RECEPCIONISTA'){
          const idRecepcionista = this.route.parent?.snapshot.paramMap.get('id_recepcionista');
          this.router.navigate(['/recepcionista',idRecepcionista,'pacientes','nuevo',usuarioId]);
          //no guardo el token
          //this.router.navigate(['/pacientes/nuevo', usuarioId]);
        }
        else{
          const token = res.token;
          localStorage.setItem('token', token);
          this.router.navigate(['/pacientes/nuevo', usuarioId]);
        }

      },
      error: (err) => {
        if (err.status === 400) {
          alert('Email ya ingresado, no se lo puede registrar');
          this.router.navigate(['registro']);
        } else {
          console.error('Error inesperado:', err);
        }
        //console.error(err)
      }
    });
  }

}