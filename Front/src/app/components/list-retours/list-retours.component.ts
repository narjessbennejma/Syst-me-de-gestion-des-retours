import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { RetourProduit } from '../../models/retour-produit.model';
import { RetourProduitService } from '../../services/retour-produit.service';
import { NonConformiteService } from '../../services/non-conformite.service'
import { decodeToken } from '../../util/auth-token.util';
import { NonConformiteComponent } from '../non-conformite/non-conformite.component';

@Component({
  selector: 'app-list-retours',
  standalone: true,
  templateUrl: './list-retours.component.html',
  styleUrls: ['./list-retours.component.scss'],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatDialogModule,
  ]
})
export class ListRetoursComponent implements OnInit {
  retours: RetourProduit[] = [];
  displayedColumns = ['id', 'produit', 'client', 'commande', 'raison', 'date', 'actions'];

  constructor(
    private retourService: RetourProduitService,
    private nonConformiteService: NonConformiteService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.chargerRetours();
  }

  chargerRetours(): void {
    this.retourService.getRetoursEnCours().subscribe({
      next: (data) => this.retours = data,
      error: (err) => console.error('Erreur chargement retours', err),
    });
  }

  traiterRetour(retour: RetourProduit): void {
  const userId = decodeToken()?.id;



  const dialogRef = this.dialog.open(NonConformiteComponent, {
    width: '480px',
  });

  dialogRef.componentInstance.retourId = retour.id!;
  dialogRef.componentInstance.produitId = retour.produit.id!;
  dialogRef.componentInstance.userId = userId;

  dialogRef.afterClosed().subscribe(result => {
    if (!result) return;

    const ncData = {
      description: result.description,
      gravite: result.gravite,
      date: new Date().toISOString().split('T')[0],
      produitId: retour.produit.id,
      employeQualiteId: userId,
    };

    
    this.nonConformiteService.createNonConformite(ncData).subscribe({
      next: () => {
        this.retourService.changerEtat(retour.id!, 'accepte', userId).subscribe({
          next: () => this.chargerRetours(),
          error: err => console.error('Erreur mise à jour retour', err),
        });
      },
      error: err => console.error('Erreur création NonConformité', err),
    });
  });
}


  refuserRetour(retourId: number): void {
    const userId = decodeToken()?.id;
    this.retourService.changerEtat(retourId, 'refuse', userId).subscribe({
      next: () => this.chargerRetours(),
      error: err => console.error('Erreur refus retour', err),
    });
  }
}
