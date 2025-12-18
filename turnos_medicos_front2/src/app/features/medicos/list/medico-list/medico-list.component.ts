import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
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
import { ObraSocialService } from '../../../obras-sociales/obra-social.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { TurnoService } from '../../../turnos/turno.service';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MedicoFullDto } from '../../medicoFull-dto.model';
import { InfoDialogComponent } from '../../info-dialog/info-dialog.component';

@Component({
  selector: 'app-medico-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardTitle, MatButtonModule, MatIconModule, MatTooltipModule, MatInputModule, MatFormField, MatInputModule,MatIconModule],
  templateUrl: './medico-list.component.html',
  styleUrl: './medico-list.component.css'
})
export class MedicoListComponent implements OnInit {
//console.
  medicosFull: MedicoFullDto[] = [];
  medicos: MedicoDto[] = [];
  medicosFiltrados: MedicoDto[] = [];
  especialidades: Especialidad[] = [];
  medicosObrasSociales: any[] = []; // aca voy a guardar los id de los medicos y las obras sociales
  administradorId!: number;
  noResultadosBusqueda = false;


  constructor(
    private medicoService: MedicosService,
    private turnoService: TurnoService,
    private especialidadService: EspecialidadService,
    private obraSocialService: ObraSocialService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const idAdminParam = this.route.snapshot.paramMap.get('id_administrador') ?? this.route.parent?.snapshot.paramMap.get('id_administrador');
    if (idAdminParam) {
      this.administradorId = Number(idAdminParam);
    }

    this.medicoService.getMedicosFull().subscribe(data => {
      this.medicosFull = data;
    });

    this.medicoService.getMedicos().subscribe(data => {
      this.medicos = data;
      this.medicosFiltrados = data; 

      this.medicos.forEach(med => {
        this.obraSocialService.getObrasSocialesDeUnMedico(med.id).subscribe(obras => {
          const nombresObras = obras.map(obra => obra.nombreObraSocial);

          this.medicosObrasSociales.push({
            medicoId: med.id,
            obrasSociales: nombresObras
          });
        });
      });

    });

    this.especialidadService.getEspecialidades().subscribe(data => {
      this.especialidades = data;
    });
  }

  obtenerNombreEspecialidad(id: number): string {
    const esp = this.especialidades.find(e => e.id === Number(id));
    return esp ? esp.nombre : 'Sin especialidad';
  }

  obtenerEmail(id: number): string {
    const medico = this.medicosFull.find(e => e.id === Number(id));
    return medico ? medico.email : 'Sin email';
  }

  //med
  obtenerObrasSocialesDeMedico(id: number): string {
    // Buscar el médico en el array medicosObrasSociales
    const medico = this.medicosObrasSociales.find(item => item.medicoId === id);


    // Si no se encuentra el médico, retornar un string vacío o mensaje
    if (!medico) {
      return "No se encontraron obras sociales para este médico";
    }

    // Si el médico no tiene obras sociales o el array está vacío
    if (!medico.obrasSociales || medico.obrasSociales.length === 0) {
      return "El médico no tiene obras sociales asignadas";
    }

    // Formatear las obras sociales con el formato solicitado
    const obrasFormateadas = medico.obrasSociales
      .map((obra: any) => `- ${obra} `)
      .join('\n');

    return obrasFormateadas;
  }

  irACrearMedico() {
    this.router.navigate(['admin', this.administradorId, 'registro']); // modificar esto
  }

  // SACO LA POSIBILIDAD DE EDITAR UN MEDICO DESDE EL FRONT
  
  editMedico(id: number){
  const medicoEncontrado = this.medicosFull.find(med => med.id === id);
  
  if (medicoEncontrado) {
    // Guardar el médico completo en localStorage
    localStorage.setItem('medicoEditando', JSON.stringify(medicoEncontrado));
    //console.log('Médico guardado en localStorage:', medicoEncontrado);
  } else {
    console.warn(`No se encontró médico con id ${id} en medicosFull`);
  }

    // Esto navegará a la ruta relativa 'editar' desde la ruta actual
this.router.navigate(['editar'], { relativeTo: this.route });
  } 

filtrarMedicos(valor: string): void {
  const filtro = valor.trim().toLowerCase();

  if (!filtro) {
    this.medicosFiltrados = this.medicos;
    this.noResultadosBusqueda = false;
    return;
  }

  this.medicosFiltrados = this.medicos.filter(med =>
    med.matricula.toLowerCase().includes(filtro) ||
    med.apellido.toLowerCase().includes(filtro)
  );

  // 👇 si hay médicos pero el filtro no devuelve nada
  this.noResultadosBusqueda = this.medicosFiltrados.length === 0;
}


existeTurnoReservadoParaMedico(turnos: any[], medicoId: number): boolean {
  return turnos.some(
    turno => turno.medico?.id === medicoId && turno.reservado === true
  );
}


eliminarMedico(id: number) {

  this.turnoService.obtenerTurnosReservadosDeMedico(id).subscribe(turnos => {

    if (this.existeTurnoReservadoParaMedico(turnos,id)) {
      this.dialog.open(InfoDialogComponent, {
        width: '420px',
        data: {
          //mensaje: 'El médico seleccionado no se puede eliminar porque tiene turnos reservados.'
          mensaje: 'No se puede eliminar este médico poque tiene turnos reservados'
        }
      });
      return;
    }

    // ⬇️ SOLO si NO tiene turnos
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: '¿Está seguro de realizar esta operación?'
      }
    });

    dialogRef.afterClosed().subscribe(confirmado => {
      if (!confirmado) return;

      this.medicoService.eliminarMedico(id).subscribe({
        next: () => {
          this.medicos = this.medicos.filter(m => m.id !== id);
          this.medicosFiltrados = this.medicosFiltrados.filter(m => m.id !== id);
        },
        error: err => console.error('Error al eliminar médico:', err)
      });
    });

  });

}


}
