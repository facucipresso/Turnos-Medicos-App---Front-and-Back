import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Antecedente } from '../antecedente.model';
import { AntecedenteService } from '../antecedentes.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';



@Component({
  selector: 'app-antecedentes-create',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, MatIconModule, MatTooltipModule],
  templateUrl: './antecedentes-create.component.html',
  styleUrl: './antecedentes-create.component.css'
})
export class AntecedentesCreateComponent implements OnInit {
  form: FormGroup;
  medicoId!: number;
  pacienteId!: number;
  antecedentesPrevios: string | null = null; // null = sin antecedentes

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private antecedenteService: AntecedenteService
  ) {
    this.form = this.fb.group({
      descripcionAntecedentes: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const pacienteIdParam = params.get('id_paciente');
      if (pacienteIdParam) {
        this.pacienteId = Number(pacienteIdParam);
      }
    });
  
    this.route.parent?.paramMap.subscribe(parentParams => {
      const medicoIdParam = parentParams.get('id_medico');
      if (medicoIdParam) {
        this.medicoId = Number(medicoIdParam);
      }
    });
  
    // Una vez que tengas ambos, carga antecedentes
    if (this.pacienteId) {
      this.cargarAntecedentes();
    }
  
  }

  cargarAntecedentes(): void {
    this.antecedenteService.getAntecedentes(this.pacienteId).subscribe({
      next: (data) => {
        this.antecedentesPrevios = data?.descripcionAntecedentes || null;
      },
      error: (err) => {
        if (err.status === 404) {
          this.antecedentesPrevios = null;
        } else {
          console.error(err);
        }
      }
    });
  }

  guardar(): void {
    if (this.form.invalid) return;

    const nuevoAntecedente: Antecedente = {
      descripcionAntecedentes: this.form.value.descripcionAntecedentes
    };

    const llamada = this.antecedentesPrevios
      ? this.antecedenteService.updateAntecedente(nuevoAntecedente, this.pacienteId)
      : this.antecedenteService.createAntecedente(nuevoAntecedente, this.pacienteId);

    llamada.subscribe({
      next: () => {
        alert(this.antecedentesPrevios ? 'Antecedente actualizado' : 'Antecedente creado');
        this.router.navigate(['/medico', this.medicoId, 'pacientes']);
      },
      error: (err) => console.error(err)
    });
  }
}

