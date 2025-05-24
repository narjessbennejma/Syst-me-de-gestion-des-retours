import { Component, OnInit } from '@angular/core';
import { HistoriqueRetourService } from '../../services/historique-retour.service';
import { HistoriqueRetour } from '../../models/historique-retour.model';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-historique-retour',
  templateUrl: './historique-retour.component.html',
  styleUrls: ['./historique-retour.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    CommonModule
  ]
})
export class HistoriqueRetourComponent implements OnInit {
  historiques: HistoriqueRetour[] = [];
  loading = true;
  error: string | null = null;

  constructor(private historiqueService: HistoriqueRetourService) {}
  getActionBadgeClass(action: string): string {
    switch (action.toLowerCase()) {
      case 'création':
      case 'creation':
        return 'badge-action creation';
      case 'accepté':
      case 'accepte':
        return 'badge-action accepte';
      case 'refusé':
      case 'refuse':
        return 'badge-action refuse';
      default:
        return 'badge-action default';
    }
  }

  ngOnInit(): void {
    this.historiqueService.getAll().subscribe({
      next: (data) => {
        this.historiques = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des historiques.';
        this.loading = false;
        console.error(err);
      }
    });
  }
}
