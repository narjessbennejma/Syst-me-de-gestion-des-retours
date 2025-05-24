import { Component, Input, OnInit } from '@angular/core';
import { RetourProduit } from '../../models/retour-produit.model';
import { RetourProduitService } from '../../services/retour-produit.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card'; 
import { MatDividerModule } from '@angular/material/divider';  // <-- importer ici
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { decodeToken } from '../../util/auth-token.util';

@Component({
  selector: 'app-retours-client',
  templateUrl: './retours-client.component.html',
  styleUrls: ['./retours-client.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,  
    MatProgressSpinnerModule
    
  ]
})
export class RetoursClientComponent implements OnInit {
  

  retours: RetourProduit[] = [];
  displayedColumns = ['id', 'produit', 'commande', 'raison', 'date','etat'];

  loading = false;
  error = '';

  constructor(private retourService: RetourProduitService) {}

  ngOnInit(): void {
    const clientId = decodeToken()?.id;
    if (clientId) {
      this.loadRetours();
    }
  }

  loadRetours() {
    const clientId = decodeToken()?.id;
    this.loading = true;
    this.error = '';
    this.retourService.getRetoursByClient(clientId).subscribe({
      next: (data) => {
        this.retours = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des retours.';
        this.loading = false;
      }
    });
  }
}
