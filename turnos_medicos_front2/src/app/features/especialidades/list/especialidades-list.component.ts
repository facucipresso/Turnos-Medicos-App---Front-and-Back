import { Component, OnInit, OnDestroy } from '@angular/core';
import { EspecialidadService } from '../especialidad.service';
import { Especialidad } from '../especialidad.model';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardTitle } from '@angular/material/card';

@Component({
  selector: 'app-especialidades-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatCardTitle, MatTooltipModule],
  templateUrl: './especialidades-list.component.html',
  styleUrls: ['./especialidades-list.component.css']
})
export class EspecialidadesListComponent implements OnInit {

  especialidades: Especialidad[] = [];
  administradorId!: number;

  constructor(
    private especialidadService: EspecialidadService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let idAdminParam = params.get('id_administrador');
      if (!idAdminParam) {
        idAdminParam = this.route.parent?.snapshot.paramMap.get('id_administrador') ?? null;
      }
      if(idAdminParam){
        this.administradorId = Number(idAdminParam);
        this.cargarEspecialidades();
      }
    });    
  }

  cargarEspecialidades(): void{
    this.especialidadService.getEspecialidades().subscribe({
      next: (data) => {
        this.especialidades = data;
      },
      error: (err) => {
        console.error('Error al cargar especialidades', err);
        alert('Error al obtener especialidades');
      }
    });
  }

  eliminarEspecialidad(id: number): void {
    const confirmado = confirm('Estas seguro que queres eliminar esta Especialidad?');
    if(confirmado){
      this.especialidadService.eliminarEspecialidad(id).subscribe({
        next: () => {
          this.cargarEspecialidades();
        },
        error: (err) => {
          console.error('Error al eliminar la especialidad', err);
          alert('No se pudo elimina la especialidad');
        }
      })
    }
  }
 
  crearEspecialidad() {
    this.router.navigate(['admin', this.administradorId,'especialidades', 'nueva']);

  }

  editEspecialidad(id: number){
    this.router.navigate(['admin', this.administradorId,'especialidades', 'editar', id]);

  }
}
