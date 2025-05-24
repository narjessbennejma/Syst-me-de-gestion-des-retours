import { Component, OnInit } from '@angular/core';
import { NonConformite } from '../../models/NonConformite';
import { NonConformiteService } from '../../services/non-conformite.service';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-non-conformite-list',
  templateUrl: './non-conformite-list.component.html',
  styleUrls: ['./non-conformite-list.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    CommonModule,
    MatTableModule

  ]
})
export class NonConformiteListComponent implements OnInit {
  nonConformites: NonConformite[] = [];
  loading = false;
  error = '';

  constructor(private ncService: NonConformiteService) {}

  ngOnInit(): void {
    this.fetchNonConformites();
  }

  fetchNonConformites(): void {
    this.loading = true;
    this.ncService.getAllNonConformites().subscribe({
      next: (data) => {
        this.nonConformites = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des données';
        this.loading = false;
      }
    });
  }
}
