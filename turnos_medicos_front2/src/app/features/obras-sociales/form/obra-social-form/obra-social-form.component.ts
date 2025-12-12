import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ObraSocial } from '../../obra-social.model';
import { ObraSocialService } from '../../obra-social.service';
import { ActivatedRoute,Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-obra-social-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './obra-social-form.component.html',
  styleUrl: './obra-social-form.component.css'
})
export class ObraSocialFormComponent implements OnInit{

  form: FormGroup;
  obraSocialId ?: number;
  editando = false;
  administradorId!: number;

  constructor(
    private fb:FormBuilder,
    private obraSocialService: ObraSocialService,
    private route: ActivatedRoute, 
    private router: Router
  ){
    this.form = this.fb.group({
      nombreObraSocial: ['', Validators.required],
      planObraSocial: ['', Validators.required]
    });
  }

  ngOnInit(): void{
    this.route.paramMap.subscribe(params => {
      let idAdminParam = params.get('id_administrador');
      if(!idAdminParam){
        idAdminParam = this.route.parent?.snapshot.paramMap.get('id_administrador') ?? null;
      }
      if(idAdminParam){
        this.administradorId = Number(idAdminParam);
        const idParam = this.route.snapshot.paramMap.get('id');
        if(idParam){
          this.obraSocialId = Number(idParam);
          this.editando = true;
          this.obraSocialService.getObraSocialById(this.obraSocialId).subscribe({
            next: (obra) => {
              this.form.patchValue({
                nombreObraSocial : obra.nombreObraSocial,
                planObraSocial: obra.planObraSocial
              });
            },
            error: (err) => {
              console.error('Error al cargar la obra social', err);
            }
          });
        }
      }
    })
    
  }

  crearObraSocial(){
   if(this.form.valid){
    const valores = this.form.value;
    if(this.editando && this.obraSocialId){ //viene con ID existente, esta en modo edicion
      const actualizada : ObraSocial = {
        id: this.obraSocialId,
        nombreObraSocial: valores.nombreObraSocial,
        planObraSocial: valores.planObraSocial
      };
      this.obraSocialService.editarObraSocial(actualizada).subscribe({
        next: () => {
          console.log('Obra social actualizada: ', actualizada);
          this.router.navigate(['admin', this.administradorId,'obras-sociales']);
        },
        error: (err) => {
          console.error('Error al actualizar: ', err);
        }
      });
    }else{ //no tengo un ID, estoy en modo creacion
      const nueva : ObraSocial = {
        id: 0,
        nombreObraSocial: valores.nombreObraSocial,
        planObraSocial: valores.planObraSocial
      };
      this.obraSocialService.addObraSocial(nueva).subscribe({
        next: () => {
          console.log('Obra social creada: ', nueva);
          this.router.navigate(['admin', this.administradorId,'obras-sociales']);
        },
        error: (err) => {
          console.error('Error al crear: ', err);
        }
      });
    }
    //this.form.reset(); ver si hace falta o no
   }else{
    console.log('Formulario invalido');
   } 
  }
}
