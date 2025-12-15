import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  template: `
    <h2 class="dialog-title">Confirmar acción</h2>

    <div class="dialog-content">
      {{ data.mensaje }}
    </div>

    <div class="dialog-actions">
      <button mat-button (click)="cancelar()">Cancelar</button>
      <button mat-raised-button color="primary" (click)="confirmar()">
        Confirmar
      </button>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      padding: 0;
    }

    .dialog-title {
      margin: 0;
      padding: 16px 24px;
      font-size: 18px;
      font-weight: 500;
      border-bottom: 1px solid #e0e0e0;
    }

    .dialog-content {
      padding: 20px 24px;
      font-size: 15px;
      color: #444;
    }

    .dialog-actions {
      padding: 12px 24px;
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      border-top: 1px solid #e0e0e0;
    }
  `]
})
export class ConfirmDialogComponent {

  constructor(
    private dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { mensaje: string }
  ) {}

  cancelar(): void {
    this.dialogRef.close(false);
  }

  confirmar(): void {
    this.dialogRef.close(true);
  }
}
