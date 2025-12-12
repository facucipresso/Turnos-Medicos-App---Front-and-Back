import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, Form } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TurnoService } from '../../turno.service';
import { CommonModule } from '@angular/common';
import { Turno } from '../../turno.model';
import { ObraSocial } from '../../../obras-sociales/obra-social.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-turno-create',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule, MatIconModule],
  templateUrl: './turno-create.component.html',
  styleUrl: './turno-create.component.css'
})
export class TurnoCreateComponent implements OnInit{

  form!: FormGroup;
  medicoId!: number;
  turnoId!: number;
  editando = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private turnoService: TurnoService
  ){
    this.form = this.fb.group({
      diaTurno: ['', Validators.required],
      horaTurno: ['', Validators.required]
    });
  }

  ngOnInit(): void {

    this.route.parent?.paramMap.subscribe(params => {
      const idParam1 = params.get('id_medico');
      if (!idParam1) {
        console.error('No se recibió el id del médico');
        return;
      }
      this.medicoId = Number(idParam1);
      this.route.paramMap.subscribe(params => {
        const idParam2 = params.get('id_turno');
        
        if(idParam2){
          //id del turno
          this.turnoId = Number (idParam2);
          this.editando = true;
          this.turnoService.getTurno(this.turnoId).subscribe({
            next: (tur) => {
              this.form.patchValue({
                diaTurno: tur.diaTurno,
                horaTurno: tur.horaTurno
              });
            },
            error: (err) => {
              console.error('Error al cargar el turno: ', err);
            }
          });
        }
      })
      
    });
  }

  creacionTurno(): void {
    if(this.form.valid){
      const valores = this.form.value;
      if(this.editando){//ya tiene id, modo edicion
        const actualizado : Turno = {
          id: this.turnoId,
          diaTurno: valores.diaTurno,
          horaTurno: valores.horaTurno,
          reservado: false
        };
        this.turnoService.editarTurno(this.medicoId, actualizado).subscribe({
          next: () => {
            console.log('Turno actualizado: ', actualizado);
            this.router.navigate(['medico', this.medicoId, 'turnos']);
          },
          error: (err) => {
            console.log('Error al actualizar: ', err);
          }
        })
      }else{ //no tengo id, estoy en modo creacion
        const nuevo: Turno = {
          id: 0, 
          diaTurno: valores.diaTurno,
          horaTurno: valores.horaTurno,
          reservado: false
        };
        this.turnoService.crearTurno(this.medicoId, nuevo).subscribe({
          next: () => {
            console.log('Turno creado: ', nuevo);
            this.router.navigate(['medico', this.medicoId, 'turnos']);
          },
          error: (err) => {
            console.error('Error al crear un turno: ', err);
          }
        })
      }
    }else{
      console.log('Formulario invalido');
    }
  }

}
