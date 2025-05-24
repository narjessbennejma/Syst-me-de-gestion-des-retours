import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Commande } from '../models/commande.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  private apiUrl = `${environment.apiUrl}/api/commandes`;

  constructor(private http: HttpClient) {}

  createCommande(commande: Commande): Observable<Commande> {
    return this.http.post<Commande>(this.apiUrl, commande);
  }
  getCommandesByClient(clientId: number): Observable<Commande[]> {
    return this.http.get<Commande[]>(`${this.apiUrl}/client/${clientId}`);
  }
}
