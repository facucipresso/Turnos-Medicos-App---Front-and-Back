import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PacienteService } from '../../../pacientes/paciente.service';
import { UsuarioRequest } from '../../../Usuarios/usuario-request.model';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MedicosService } from '../../medicos.service';

@Component({
  selector: 'app-registro-medico',
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
  templateUrl: './registro-medico.component.html',
  styleUrl: './registro-medico.component.css'
})
export class RegistroMedicoComponent implements OnInit{

  form: FormGroup;
  adminId?: number;

  constructor(
    private fb: FormBuilder,
    private pacienteService: PacienteService,
    private medicoService : MedicosService,
    private router: Router,
    private route: ActivatedRoute,
  ){
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
      const idParam = this.route.parent?.snapshot.paramMap.get('id_administrador');
  if (idParam) {
    this.adminId = Number(idParam);
  }
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

    
    this.medicoService.registrarUsuario(usuario).subscribe({
      next: (res) => {
        const usuarioId = res.idUsuario;
        console.log(this.adminId);
        this.router.navigate(['admin', this.adminId, 'medicos', 'nuevo', usuarioId]);
      },
      error: (err) => console.error(err)
    });
  }

}
