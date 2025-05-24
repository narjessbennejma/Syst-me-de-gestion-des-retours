import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router'; 
import { routes } from '../src/app/app.routes';
import { CommonModule } from '@angular/common';
// Importer les modules nécessaires d'Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(RouterModule.forRoot(routes)), 
    importProvidersFrom(MatCardModule),  
    importProvidersFrom(MatProgressSpinnerModule),  
    importProvidersFrom(MatButtonModule),  
    importProvidersFrom(CommonModule),  
    importProvidersFrom(MatTableModule),
    importProvidersFrom(MatIconModule),
    importProvidersFrom(MatDividerModule),
  ]
}).catch(err => console.error(err));
