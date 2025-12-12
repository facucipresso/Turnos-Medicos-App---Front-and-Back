import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuAdministradorComponent } from '../../features/administrador/menu-administrador/menu-administrador.component';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-layout-administrador',
  imports: [MenuAdministradorComponent, RouterOutlet],
  templateUrl: './layout-administrador.component.html',
  styleUrls: ['./layout-administrador.component.css']
})
export class LayoutAdministradorComponent implements OnInit{

  administradorId!: number;

  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
      this.administradorId = Number(this.route.snapshot.paramMap.get('id_administrador'));
  }

}
