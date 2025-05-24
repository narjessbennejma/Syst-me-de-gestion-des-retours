import { Component, OnInit } from '@angular/core';
import { CommandeService } from '../../services/commande.service';
import { Commande } from '../../models/commande.model';
import { decodeToken } from '../../util/auth-token.util';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { RetourProduitService } from '../../services/retour-produit.service';
import { Produit } from '../../models/produit';
import { RetourProduit } from '../../models/retour-produit.model';
import { UserRef } from '../../models/user-ref.model';

@Component({
  selector: 'app-mes-commandes',
  templateUrl: './mes-commandes.component.html',
  styleUrls: ['./mes-commandes.component.scss'],
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatDividerModule,
    MatCardModule,
    CommonModule
  ]
})
export class MesCommandesComponent implements OnInit {
  commandes: Commande[] = [];
  displayedColumns: string[] = ['id', 'produit', 'quantite', 'dateCommande', 'total', 'actions']; // Ajout de "quantite"
  retoursEffectues: { produitId: number, commandeId: number }[] = [];

  constructor(private commandeService: CommandeService, private retourService: RetourProduitService) { }

  ngOnInit(): void {
    const tokenPayload = decodeToken();
    const clientId = tokenPayload?.id;

    if (clientId) {
      // Charger les commandes
      this.commandeService.getCommandesByClient(clientId).subscribe({
        next: data => this.commandes = data,
        error: err => console.error('Erreur lors du chargement des commandes :', err)
      });

      // Charger les retours et filtrer les retours avec des objets valides
      this.retourService.getRetoursByClient(clientId).subscribe({
        next: retours => {
          this.retoursEffectues = retours
            .filter(r => r.produit && r.commande) // Filtrer les retours invalides
            .map(r => ({
              produitId: r.produit?.id,  // Utiliser le chaînage optionnel pour éviter une erreur si 'produit' est null
              commandeId: r.commande?.id // Utiliser le chaînage optionnel pour éviter une erreur si 'commande' est null
            }));
        },
        error: err => console.error('Erreur lors du chargement des retours :', err)
      });
    }
  }



  // Méthode pour calculer le total d'une commande
  getTotalCommande(lignes: any[]): number {
    return lignes.reduce((total, ligne) => total + (ligne.quantite * (ligne.prix ?? 0)), 0);
  }

  // Méthode pour vérifier si une commande peut être retournée (moins de 24 heures)
  isCommandeWithin24Hours(dateCommande: string): boolean {
    const currentDate = new Date();
    const commandeDate = new Date(dateCommande);

    // Différence en heures
    const diffInMs = currentDate.getTime() - commandeDate.getTime();
    const diffInHours = diffInMs / (1000 * 3600); // Convertir en heures

    return diffInHours <= 24;
  }


  handleRetour(produit: Produit, commande: Commande): void {
    const client = decodeToken();
    const raison = prompt("Entrez la raison du retour :");

    if (!raison || !client?.id || !commande.id) {
      alert("Informations manquantes pour le retour.");
      return;
    }

    const date = new Date().toISOString();

    const retour: RetourProduit = {
      produit: produit,
      client: { id: client.id } as UserRef,
      commande: { id: commande.id },
      raison: raison,
      date: date
    };

    this.retourService.createRetour(retour).subscribe({
      next: () => {
        alert("Retour enregistré avec succès.");

        // Rafraîchir les retours effectués après l'enregistrement du retour
        this.refreshRetoursEffectues();
      },
      error: err => alert("Erreur lors de l'enregistrement du retour.")
    });
  }

  refreshRetoursEffectues(): void {
    const tokenPayload = decodeToken();
    const clientId = tokenPayload?.id;

    if (clientId) {
      this.retourService.getRetoursByClient(clientId).subscribe({
        next: retours => {
          this.retoursEffectues = retours
            .filter(r => r.produit && r.commande)
            .map(r => ({
              produitId: r.produit?.id,
              commandeId: r.commande?.id
            }));
        },
        error: err => console.error('Erreur lors du chargement des retours :', err)
      });
    }
  }


  isDejaRetourne(produitId: number, commandeId: number): boolean {
    return this.retoursEffectues.some(r => r.produitId === produitId && r.commandeId === commandeId);
  }


}
