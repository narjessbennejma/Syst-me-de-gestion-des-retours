// profile.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';  
import { CommonModule } from '@angular/common';

// Angular Material modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  imports: [
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule
  ]
})
export class ProfileComponent implements OnInit {
  user: User = { nom: '', email: '', password: '' };  
  loading = false;
  error = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loading = true;
    this.userService.getProfile().subscribe({
      next: (profile) => {
        this.user = profile;  
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement du profil';
        this.loading = false;
      }
    });
  }

  updateProfile(): void {
    if (this.user.id === undefined) {
      this.error = 'L\'ID de l\'utilisateur est invalide';
      return;
    }

    this.loading = true;
    
    // Mettez à jour seulement les champs définis dans `user`
    this.userService.updateProfile(this.user.id, this.user).subscribe({
      next: (updatedUser) => {
        this.user = updatedUser;
        this.loading = false;
        this.error = '';
        alert('Profil mis à jour avec succès !');
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Erreur lors de la mise à jour du profil';
        alert(this.error);
      }
    });
  }
}
