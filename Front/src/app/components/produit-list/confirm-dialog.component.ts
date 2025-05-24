import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  template: `
    <h2 mat-dialog-title>Confirmation</h2>
    <mat-dialog-content>Voulez-vous vraiment supprimer ce produit ?</mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Non</button>
      <button mat-flat-button color="warn" (click)="onConfirm()">Oui</button>
    </mat-dialog-actions>
  `,
  imports: [CommonModule, MatButtonModule, MatDialogModule]
})
export class ConfirmDialogComponent {
  constructor(private dialogRef: MatDialogRef<ConfirmDialogComponent>) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
