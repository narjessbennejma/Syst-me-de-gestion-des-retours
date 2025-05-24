import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { NonConformite } from '../models/NonConformite';

@Injectable({
  providedIn: 'root',
})
export class NonConformiteService {
  private apiUrl = `${environment.apiUrl}/api/non-conformites`;

  constructor(private http: HttpClient) {}

  createNonConformite(nc: NonConformite): Observable<NonConformite> {
    return this.http.post<NonConformite>(`${this.apiUrl}`, nc);
  }

  updateRetourEtat(retourId: number, newEtat: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/retours/${retourId}/etat`, { etat: newEtat });
  }
  getAllNonConformites(): Observable<NonConformite[]> {
    return this.http.get<NonConformite[]>(this.apiUrl);
  }


}
