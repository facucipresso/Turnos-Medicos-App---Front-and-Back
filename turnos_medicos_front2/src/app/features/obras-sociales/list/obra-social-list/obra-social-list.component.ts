import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObraSocial } from '../../obra-social.model';
import { ObraSocialService } from '../../obra-social.service';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MedicosService } from '../../../medicos/medicos.service';
import { Medico } from '../../../medicos/medico.model';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardTitle } from '@angular/material/card';

@Component({
  selector: 'app-obra-social-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatTooltipModule, MatCardTitle],
  templateUrl: './obra-social-list.component.html',
  styleUrls: ['./obra-social-list.component.css']
})
export class ObraSocialListComponent implements OnInit, OnDestroy{

  esMedico = false;
  medicoId!: number;
  administradorId!: number;

  obrasSociales: ObraSocial[] = [];
  obrasDelMedico: number[] = [];
  private subscripcion!: Subscription;

  constructor(
    private obraSocialService: ObraSocialService,
    private medicoService: MedicosService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let idMedicoParam = params.get('id_medico');
      if (!idMedicoParam) {
        idMedicoParam = this.route.parent?.snapshot.paramMap.get('id_medico') ?? null;
      }

      let idAdminParam = params.get('id_administrador');
      if(!idAdminParam){
        idAdminParam = this.route.parent?.snapshot.paramMap.get('id_administrador') ?? null;
      }
  
      if (idMedicoParam) {
        this.esMedico = true;
        this.medicoId = Number(idMedicoParam);
        this.cargarObrasSocialesMedico();
      }else if(idAdminParam) {
        this.esMedico = false;
        this.administradorId = Number(idAdminParam);
        this.cargarObrasSociales();
      }else {
        this.cargarObrasSociales();
      }
    });
  }
  

  ngOnDestroy(): void {
      if(this.subscripcion){
        this.subscripcion.unsubscribe();
      }
  }

  cargarObrasSociales(): void{
    this.subscripcion = this.obraSocialService.getObrasSociales().subscribe({
      next: data => this.obrasSociales = data,
      error: err => console.error('Error al cargar obras sociales: ', err)
    });
  }

  cargarObrasSocialesMedico(): void {
    this.obraSocialService.getObrasSociales().subscribe(data => {
      this.obrasSociales = data;
  
      this.obraSocialService.getObrasSocialesDeUnMedico(this.medicoId)
        .subscribe(osMedico => {
          this.obrasDelMedico = osMedico.map(o => o.id);
        });
    });
  }

  crearObraSocial() {
    this.router.navigate(['admin', this.administradorId,'obras-sociales', 'nueva']);
  }

  editObraSocial(id: number){
    this.router.navigate(['admin', this.administradorId,'obras-sociales', 'editar', id]);
  }

  eliminarObraSocial(id: number){
    const confirmado = confirm('Estas seguro que queres eliminar esta Obra Social?');
    if(confirmado){
      this.obraSocialService.eliminarObraSocial(id).subscribe({
        next: () => {
          console.log('Obra Social eliminada');
          this.cargarObrasSociales();
        },
        error: err => {
          console.error('Error al eliminar la obra social', err);
        }
      });
    }
  }

  agregarObraAlMedico(idObra: number) {
    this.medicoService.agregarObraSocial(this.medicoId, idObra).subscribe(() => {
      this.obrasDelMedico.push(idObra);
    });
  }
  
  quitarObraDelMedico(idObra: number) {
    this.medicoService.eliminarObraSocial(this.medicoId, idObra).subscribe(() => {
      this.obrasDelMedico = this.obrasDelMedico.filter(id => id !== idObra);
    });
  }
}
