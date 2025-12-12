import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UsuarioService } from '../usuario.service';
import { UsuarioResponse } from '../usuario-response.model';
import { UsuarioRequest } from '../usuario-request.model';
import { jwtDecode } from 'jwt-decode';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

interface JwtPayload{
  sub: string;
  role: string;
  exp: number;
  iat: number;
}

@Component({
  selector: 'app-usuario-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './usuario-login.component.html',
  styleUrls: ['./usuario-login.component.css']
})
export class UsuarioLoginComponent {
  form: FormGroup;
  idPaciente ?: number;
  idMedico ?: number;
  idAdministrador ?: number;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ){
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  loginUsuario(){
    if(this.form.invalid){
      console.error('Login invalido, complete correctamente');
      return;
    }
    const usuarioRequest: UsuarioRequest = this.form.value;

    this.usuarioService.login(usuarioRequest).subscribe({
      next: (res: UsuarioResponse) => {
        const token = res.token;
        localStorage.setItem('token', token);
        const decoded: JwtPayload = jwtDecode<JwtPayload>(token);
        const rol = decoded.role;

        if(rol === 'PACIENTE'){
          this.usuarioService.getIdDeTipoByIdDeUsuario(res.idUsuario).subscribe({
            next: (idP: number) => this.router.navigate(['paciente', idP]),
            error: console.error
          });
        } else if(rol === 'MEDICO'){
          this.usuarioService.getIdDeTipoByIdDeUsuario(res.idUsuario).subscribe({
            next: (idM: number) => this.router.navigate(['medico', idM]),
            error: console.error
          });
        } else if(rol === 'ADMIN'){
          this.usuarioService.getIdDeTipoByIdDeUsuario(res.idUsuario).subscribe({
            next: (idA: number) => this.router.navigate(['admin', idA]),
            error: console.error
          });
          //este es el de la redireccion al RECEPCIONISTA
        }  else if(rol === 'RECEPCIONISTA'){
          this.usuarioService.getIdDeTipoByIdDeUsuario(res.idUsuario).subscribe({
            next: (idR: number) => this.router.navigate(['recepcionista', idR]),
            error: console.error
          });
        }else{
          this.router.navigate(['/login']);
        }
      },
      error: console.error
    });
  }
}
