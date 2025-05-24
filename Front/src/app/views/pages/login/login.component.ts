import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService, SigninRequest } from '../../../services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { ContainerComponent, RowComponent, ColComponent, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ContainerComponent,
    RowComponent,
    ColComponent,
    CardComponent,
    CardBodyComponent,
    FormDirective,
    RouterModule,
    InputGroupComponent,
    InputGroupTextDirective,
    FormControlDirective,
    ButtonDirective,
    IconDirective,
    HttpClientModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.loginForm.controls;
  }


  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';

    if (this.loginForm.invalid) {
      return;
    }

    const credentials = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    };

    this.userService.signin(credentials).subscribe({
      next: (token: string) => {
        sessionStorage.setItem('token', token);
        this.router.navigate(['/profile']);
      },
      error: err => {
        if (err.status === 401) {
          this.errorMessage = 'Email ou mot de passe incorrect.';
        } else {
          this.errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
          console.error('Erreur de login :', err);
        }
      }
    });
  }


}