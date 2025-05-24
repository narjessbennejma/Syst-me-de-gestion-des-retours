import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService, SignupRequest } from '../../../services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { ContainerComponent, RowComponent, ColComponent, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
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
    InputGroupComponent,
    InputGroupTextDirective,
    FormControlDirective,
    ButtonDirective,
    IconDirective,
    HttpClientModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitted = false;
  successMessage = '';
  errorMessage = '';

  constructor(
  private fb: FormBuilder,
  private userService: UserService,
  private router: Router 
) {
  this.registerForm = this.fb.group({
    nom: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
}



  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value ? null : { mismatch: true };
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit(): void {
  this.submitted = true;
  this.successMessage = '';
  this.errorMessage = '';

  if (this.registerForm.invalid) {
    return;
  }

  const signupData: SignupRequest = {
    nom: this.f['nom'].value,
    email: this.f['email'].value,
    password: this.f['password'].value
  };

  this.userService.signup(signupData).subscribe({
  next: user => {
    this.successMessage = `Compte créé avec succès pour ${user.nom}`;
    this.registerForm.reset();
    this.submitted = false;

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1500); 
  },
  error: err => {
    console.error('Erreur complète:', err);
    this.errorMessage = 'Erreur lors de la création du compte';
  }
});

}

}
