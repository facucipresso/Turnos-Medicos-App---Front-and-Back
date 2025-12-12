import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-app',
  standalone: true,
  imports: [ CommonModule, RouterOutlet],
  templateUrl: './layout-app.component.html',
  styleUrls: ['./layout-app.component.css']
})
export class LayoutAppComponent { 
  currentYear = new Date().getFullYear();
}
