
import { Component, OnInit } from '@angular/core';
import { Produit } from '../../models/produit';
import { ProduitService } from '../../services/produit.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'; 
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { ProduitAddComponent } from '../produit-add/produit-add.component'; 
import { ProduitEditComponent } from '../produit-edit/produit-edit.component';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { CommandeModalComponent } from '../commande-modal/commande-modal.component';

@Component({
  selector: 'app-produit-list',
  templateUrl: './produit-list.component.html',
  styleUrls: ['./produit-list.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    ProduitAddComponent,
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    ConfirmDialogComponent,
    CommandeModalComponent,
  ]
})
export class ProduitListComponent implements OnInit {
  produits: Produit[] = [];
  displayedColumns: string[] = ['id', 'labelle', 'prix', 'stock', 'actions'];
  userRole: string = '';
  constructor(
    private produitService: ProduitService,
    private router: Router,
    private dialog: MatDialog 
  ) {}

  ngOnInit() {
    this.loadProduits();
    this.extractUserRole();
  }
  extractUserRole() {
    const token = sessionStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.userRole = payload.role;
    }
  }
  loadProduits() {
    this.produitService.getAllProduits().subscribe(data => {
      if (this.userRole === 'USER') {
        this.produits = data.filter(produit => produit.stock > 0);
      } else {
        this.produits = data;
      }
    });
  }


  deleteProduit(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.produitService.deleteProduit(id).subscribe(() => this.loadProduits());
      }
    });
  }

  editProduit(id: number) {
    this.router.navigate(['/produits/edit', id]);
  }

  // Open the Add Modal
  openAddProduitDialog(): void {
    const dialogRef = this.dialog.open(ProduitAddComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadProduits();
      }
    });
  }


  openEditProduitDialog(produit: Produit): void {
  const dialogRef = this.dialog.open(ProduitEditComponent, {
    width: '400px'
  });

  dialogRef.componentInstance.setProduitData(produit);

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.loadProduits(); 
    }
  });
}

openCommandeDialog(produit: Produit): void {
  const dialogRef = this.dialog.open(CommandeModalComponent, {
    width: '500px',
    panelClass: 'custom-dialog-container',
    data: { produit }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result && result.quantite) {
      const index = this.produits.findIndex(p => p.id === produit.id);
      if (index !== -1) {
        this.produits[index].stock -= result.quantite;
      }
    }
  });
}

}
