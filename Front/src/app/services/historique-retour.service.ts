import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HistoriqueRetour } from '../models/historique-retour.model';

@Injectable({
  providedIn: 'root',
})
export class HistoriqueRetourService {
  private apiUrl = `${environment.apiUrl}/api/historiques-retours`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<HistoriqueRetour[]> {
    return this.http.get<HistoriqueRetour[]>(this.apiUrl);
  }
}
