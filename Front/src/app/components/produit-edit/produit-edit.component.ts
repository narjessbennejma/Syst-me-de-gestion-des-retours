import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ProduitService } from '../../services/produit.service';
import { Produit } from '../../models/produit';
import { CommonModule } from '@angular/common'; 
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-produit-edit',
  templateUrl: './produit-edit.component.html',
  styleUrls: ['./produit-edit.component.scss'],
  standalone: true,
  imports: [ 
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class ProduitEditComponent implements OnInit {
  produitForm!: FormGroup;
  produit!: Produit;

  constructor(
    private fb: FormBuilder,
    private produitService: ProduitService,
    private dialogRef: MatDialogRef<ProduitEditComponent>
  ) {}

  ngOnInit(): void {
    this.produitForm = this.fb.group({
      labelle: ['', Validators.required],
      prix: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]]
    });

    if (this.produit) {
      this.produitForm.patchValue(this.produit);
    }
  }

  setProduitData(p: Produit) {
    this.produit = p;
    if (this.produitForm) {
      this.produitForm.patchValue(p);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onUpdate(): void {
    if (this.produitForm.valid) {
      const updated = { ...this.produit, ...this.produitForm.value };
      this.produitService.updateProduit(updated.id!, updated).subscribe(() => {
        this.dialogRef.close(true); 
      });
    }
  }
}
