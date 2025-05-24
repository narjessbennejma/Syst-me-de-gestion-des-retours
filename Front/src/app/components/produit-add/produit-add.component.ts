import { Component } from '@angular/core';
import { ProduitService } from '../../services/produit.service';
import { MatDialogRef } from '@angular/material/dialog'; // Dialog reference
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Reactive Forms
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';


@Component({
  selector: 'app-produit-add',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './produit-add.component.html',
  styleUrls: ['./produit-add.component.scss']
})

export class ProduitAddComponent {
  produitForm: FormGroup;

  constructor(
    private produitService: ProduitService,
    private dialogRef: MatDialogRef<ProduitAddComponent>, // Inject DialogRef
    private fb: FormBuilder
  ) {
    this.produitForm = this.fb.group({
      labelle: ['', Validators.required],
      prix: ['', [Validators.required, Validators.min(0)]],
      stock: ['', [Validators.required, Validators.min(0)]]
    });
  }

  onSave() {
    if (this.produitForm.valid) {
      this.produitService.addProduit(this.produitForm.value).subscribe(() => {
        this.dialogRef.close(true); // Close the dialog after successful save
      });
    }
  }

  onCancel() {
    this.dialogRef.close(false); // Close the dialog without saving
  }
}
