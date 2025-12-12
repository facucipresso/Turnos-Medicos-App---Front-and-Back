import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HistorialMedicoService } from '../historial-medico.service';
import { HistorialMedicoDto } from '../historial-medico-dto.model';
import { ObraSocial } from '../../obras-sociales/obra-social.model';
import { ObraSocialService } from '../../obras-sociales/obra-social.service';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-historial-medico-add',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './historial-medico-add.component.html',
  styleUrls: ['./historial-medico-add.component.css']
})
export class HistorialMedicoAddComponent implements OnInit {
  form: FormGroup;
  pacienteId!: number;
  medicoId!: number;

  obrasSocialesDisponibles: ObraSocial[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private historialMedicoService: HistorialMedicoService,
    private obraSocialService: ObraSocialService
  ) {
    this.form = this.fb.group({
      fechaDto: ['', Validators.required],
      obrasocialDto: [null, Validators.required],
      medicacionActualDto: ['', Validators.required],
      motivoDto: ['', Validators.required],
      descripcionDto: ['', Validators.required],
      tratamientoDto: ['', Validators.required],
      costoDto: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const pacienteIdParam = params.get('id_paciente');
      if (pacienteIdParam) this.pacienteId = Number(pacienteIdParam);
    });

    this.route.parent?.paramMap.subscribe(parentParams => {
      const medicoIdParam = parentParams.get('id_medico');
      if (medicoIdParam) this.medicoId = Number(medicoIdParam);
    });

    this.obraSocialService.getObrasSociales().subscribe(data => {
      this.obrasSocialesDisponibles = data;
    });
  }

  guardarHistorial(): void {
    if (this.form.invalid) return;

    const historialMedDto: HistorialMedicoDto = {
      id: 0,
      fechaDto: this.form.value.fechaDto,
      obrasocialDto: this.form.value.obrasocialDto,
      medicacionActualDto: this.form.value.medicacionActualDto,
      motivoDto: this.form.value.motivoDto,
      descripcionDto: this.form.value.descripcionDto,
      tratamientoDto: this.form.value.tratamientoDto,
      costoDto: parseFloat(this.form.value.costoDto)
    };

    this.historialMedicoService
      .addHistorialAPaciente(this.medicoId, this.pacienteId, historialMedDto)
      .subscribe({
        next: () => this.router.navigate(['/medico', this.medicoId, 'pacientes']),
        error: (err) => {
          if (err.status === 400) {
            alert('Primero tenés que cargar los antecedentes del paciente antes de poder agregar historial médico.');
            this.router.navigate(['/medico', this.medicoId, 'pacientes']);
          } else {
            console.error('Error inesperado:', err);
          }
        }
      });
  }
}
