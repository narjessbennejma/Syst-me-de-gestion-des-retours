import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-non-conformite',
  standalone: true,
  templateUrl: './non-conformite.component.html',
  styleUrls: ['./non-conformite.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
  ],
})
export class NonConformiteComponent {
  retourId!: number;
  produitId!: number;
  userId!: number;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NonConformiteComponent>
  ) {
    this.form = this.fb.group({
      description: ['', Validators.required],
      gravite: ['', Validators.required],
    });

    // Ajout classe CSS custom pour z-index
    this.dialogRef.addPanelClass('custom-dialog-panel');
  }

  onCreate() {
    if (this.form.invalid) return;

    this.dialogRef.close({
      description: this.form.value.description,
      gravite: this.form.value.gravite,
      produitId: this.produitId,
      employeQualiteId: this.userId,
    });
  }

  onCancel() {
    this.dialogRef.close();
  }
}
