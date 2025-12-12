import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MedicosService } from '../../medicos.service';
import { Medico } from '../../medico.model';
import { MedicoDto } from '../../medico-dto.model';
import { Observable, Subscription } from 'rxjs';
import { Especialidad } from '../../../especialidades/especialidad.model';
import { EspecialidadService } from '../../../especialidades/especialidad.service';
import { ActivatedRoute } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardTitle } from '@angular/material/card';

@Component({
  selector: 'app-medico-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardTitle, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './medico-list.component.html',
  styleUrl: './medico-list.component.css'
})
export class MedicoListComponent implements OnInit{

  medicos: MedicoDto[] = [];
  especialidades: Especialidad[] = [];
  administradorId!: number;

  constructor(
    private medicoService: MedicosService,
    private especialidadService: EspecialidadService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    const idAdminParam = this.route.snapshot.paramMap.get('id_administrador') ?? this.route.parent?.snapshot.paramMap.get('id_administrador');
    if (idAdminParam) {
      this.administradorId = Number(idAdminParam);
    }
  
    this.medicoService.getMedicos().subscribe(data => {
      this.medicos = data;
    });
  
    this.especialidadService.getEspecialidades().subscribe(data => {
      this.especialidades = data;
    });
  }

  obtenerNombreEspecialidad(id: number): string{
    const esp = this.especialidades.find(e => e.id === Number(id));
    return esp ? esp.nombre : 'Sin especialidad';
  }

  irACrearMedico(){
    this.router.navigate(['admin', this.administradorId, 'registro']); // modificar esto
  }

  /* SACO LA POSIBILIDAD DE EDITAR UN MEDICO DESDE EL FRONT
  
  editMedico(id: number){
    this.router.navigate(['/medicos/editar', id]);
  } */

  eliminarMedico(id:number){
    const confirmacion = confirm('Estas seguro que queres eliminar este Medico?');
    if (confirmacion) {
      this.medicoService.eliminarMedico(id).subscribe({
        next: () => {
          console.log('Médico eliminado con éxito');
          this.medicos = this.medicos.filter(m => m.id !== id);
        },
        error: err => {
          console.error('Error al eliminar médico:', err);
        }
      });
    }
  }

}
