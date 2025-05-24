import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Produit } from '../../models/produit';
import { Commande } from '../../models/commande.model';
import { CommandeService } from '../../services/commande.service';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { decodeToken } from '../../util/auth-token.util';

@Component({
  selector: 'app-commande-modal',
  standalone: true,
  imports: [
    MatDialogModule,
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './commande-modal.component.html',
  styleUrls: ['./commande-modal.component.scss']
})
export class CommandeModalComponent {
  produit!: Produit;
  selectedQuantity = 1;
  quantityExceeded = false;
  totalPrice = 0;

  constructor(
    public dialogRef: MatDialogRef<CommandeModalComponent>,
    private commandeService: CommandeService
  ) {}

  /** méthode appelée manuellement pour initialiser le produit */
  setProduitData(produit: Produit): void {
    this.produit = produit;
    this.updateTotalPrice();
  }

  updateTotalPrice() {
    if (this.selectedQuantity <= this.produit.stock) {
      this.totalPrice = this.produit.prix * this.selectedQuantity;
    }
  }

  validateQuantity() {
    this.quantityExceeded = this.selectedQuantity > this.produit.stock;
  }

  commander() {
    const payload = decodeToken();

    if (!payload?.id) {
      alert('Utilisateur non authentifié');
      return;
    }

    const commande: Commande = {
      client: { id: payload.id },
      dateCommande: new Date().toISOString().split('T')[0],
      lignes: [{
        produit: this.produit,
        quantite: this.selectedQuantity
      }]
    };

    this.commandeService.createCommande(commande).subscribe({
      next: () => this.dialogRef.close({ success: true, quantite: this.selectedQuantity }),
      error: err => {
        alert('Erreur lors de la commande');
        console.error(err);
      }
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
