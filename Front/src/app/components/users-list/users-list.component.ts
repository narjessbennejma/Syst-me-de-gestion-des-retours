import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatTableModule
  ]
})
export class UsersListComponent implements OnInit {
  users: User[] = [];
  loading = false;
  error = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsersByRole('USER');  
  }

  loadUsersByRole(role: string): void {
    this.loading = true;
    this.userService.getUsersByRole(role).subscribe({
      next: (users) => {
        this.users = users;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des utilisateurs';
        this.loading = false;
      }
    });
  }
}
