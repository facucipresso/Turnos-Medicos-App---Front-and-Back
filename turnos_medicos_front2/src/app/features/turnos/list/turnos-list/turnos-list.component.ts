import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TurnoService } from '../../turno.service';
import { Turno } from '../../turno.model';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';


@Component({
  selector: 'app-turnos-list',
  imports: [CommonModule, MatTableModule, MatCardModule, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './turnos-list.component.html',
  styleUrl: './turnos-list.component.css'
})
export class TurnosListComponent implements OnInit{

  medicoId!: number;
  turnos: Turno[] = [];
  turnito!: Turno;

  columnas: string[] = ['fecha', 'hora', 'estado', 'acciones'];


  constructor(
    private route: ActivatedRoute,
    private turnoService: TurnoService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe(params => {
      const id = params.get('id_medico');
      if (id) {
        this.medicoId = Number(id);
        this.cargarTurnos(); // ahora sí con el ID correcto
      }
    });
  }

  cargarTurnos(): void {
    this.turnoService.getTurnosDeMedico(this.medicoId).subscribe({
      next : data => this.turnos = data,
      error: err => console.error('Error al cargar los turnos: ', err)
    });
  }

  createTurno() {
    this.router.navigate(['medico',this.medicoId,'crear-turno']);
  }

  editarTurno(id_turno: number){
    this.router.navigate(['medico', this.medicoId,'editar', id_turno]);
  }

  eliminarTurno(idTurno: number): void {
    this.turnoService.getTurno(idTurno).subscribe({
      next: (turno) => {
        if (turno.reservado) {
          alert('Este turno no puede eliminarse porque ya está reservado');
        } else {
          const confirmado = confirm('¿Estás seguro que querés eliminar este turno?');
          if (confirmado) {
            this.turnoService.eliminarTurno(this.medicoId, idTurno).subscribe({
              next: () => {
                console.log('Turno eliminado');
                this.cargarTurnos();
              },
              error: (err) => {
                console.error('Error al eliminar el turno: ', err);
              }
            });
          }
        }
      },
      error: (err) => console.error('Error al cargar el turno: ', err)
    });
  }
  

}
