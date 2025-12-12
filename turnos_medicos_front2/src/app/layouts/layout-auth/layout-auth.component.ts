import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout-auth',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  template: `
    <div class="auth-wrapper">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .auth-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #f5f5f5;
    }
  `]
})
export class LayoutAuthComponent {}
