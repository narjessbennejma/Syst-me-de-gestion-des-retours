import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RetourProduit } from '../models/retour-produit.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RetourProduitService {
  private apiUrl = `${environment.apiUrl}/api/retours`;

  constructor(private http: HttpClient) {}

  createRetour(retour: RetourProduit): Observable<RetourProduit> {
    return this.http.post<RetourProduit>(this.apiUrl, retour);
  }
   getRetoursByClient(clientId: number): Observable<RetourProduit[]> {
    return this.http.get<RetourProduit[]>(`${this.apiUrl}/client/${clientId}`);
  }
  getRetoursEnCours(): Observable<RetourProduit[]> {
    return this.http.get<RetourProduit[]>(`${this.apiUrl}/en-cours`);
  }


changerEtat(id: number, etat: string, userId: number): Observable<RetourProduit> {
  const url = `${this.apiUrl}/${id}/etat`;
  return this.http.put<RetourProduit>(url, {}, { params: { etat, userId: userId.toString() } });
}



}
