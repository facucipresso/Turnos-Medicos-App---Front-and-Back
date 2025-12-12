import { Component, OnInit } from '@angular/core';
import { debounceTime } from 'rxjs';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ObraSocialService } from '../../../obras-sociales/obra-social.service';
import { PacienteService } from '../../../pacientes/paciente.service';
import { ObraSocial } from '../../../obras-sociales/obra-social.model';
import { Paciente } from '../../../pacientes/paciente.model';
import { PacienteEmailyDni } from '../../../pacientes/pacienteEmailyDni.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-recepcionista-reservar-turno',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule, MatButtonModule],
  templateUrl: './recepcionista-reservar-turno.component.html',
  styleUrl: './recepcionista-reservar-turno.component.css'
})
export class RecepcionistaReservarTurnoComponent implements OnInit {

  paso1Form!: FormGroup;
  obrasSociales: ObraSocial[] = [];

  // datos guardados para el paso 2
  pacienteEncontrado: Paciente | null = null;
  obraSeleccionadaId: number | null = null;

  paso1Completado = false;

  constructor(
    private fb: FormBuilder,
    private obraService: ObraSocialService,
    private pacienteService: PacienteService
  ) {}

  ngOnInit(): void {
    this.paso1Form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      dni: ['', [Validators.required]],
      obraSocialId: ['', Validators.required]
    });

    this.obraService.getObrasSociales().subscribe(data => {
      this.obrasSociales = data;
    });


    this.paso1Form.valueChanges
      .pipe(
        debounceTime(400) // espera 400 ms sin escribir antes de validar
      )
      .subscribe(() => {
        if (this.paso1Form.valid) {
          this.validarPacienteAutomatico();
        } else {
          this.paso1Completado = false;
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
        console.log("Paciente encontrado:", paciente);
      },
      error: () => {
        this.paso1Completado = false;
        this.pacienteEncontrado = null;
      }
    });
  }
  
}


