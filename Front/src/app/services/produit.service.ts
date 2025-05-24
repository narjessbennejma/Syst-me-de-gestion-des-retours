import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produit } from '../models/produit';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  private baseUrl = `${environment.apiUrl}/produits`;

  constructor(private http: HttpClient) {}

  //  Récupérer tous les produits
  getAllProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.baseUrl);
  }

  //  Récupérer un produit par ID
  getProduitById(id: number): Observable<Produit> {
    return this.http.get<Produit>(`${this.baseUrl}/${id}`);
  }

  //  Ajouter un nouveau produit
  addProduit(produit: Produit): Observable<Produit> {
    return this.http.post<Produit>(this.baseUrl, produit);
  }

  //  Mettre à jour un produit existant
  updateProduit(id: number, produit: Produit): Observable<Produit> {
    return this.http.put<Produit>(`${this.baseUrl}/${id}`, produit);
  }

  //  Supprimer un produit
  deleteProduit(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
