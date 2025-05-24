import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface User {
  id?: number;
  nom: string;
  email: string;
  password?: string;
  role?: string; 
}

export interface SignupRequest {
  nom: string;
  email: string;
  password: string;
  role?: 'USER'  
}

export interface SigninRequest {
  email: string;
  password: string;
}


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  signup(data: SignupRequest): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users/signup`, data);
  }


  signin(data: { email: string; password: string }) {
    return this.http.post<string>(`${this.apiUrl}/users/signin`, data, { responseType: 'text' as 'json' });
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }



  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${id}`);
  }

  getByRole(role: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users/role/${role}`);
  }

  checkEmailExists(email: string): Observable<boolean> {
   return this.http.get<boolean>(`${this.apiUrl}/users/exists?email=${email}`);
  }

  getProfile(): Observable<User> {
  const token = sessionStorage.getItem('token');

  if (!token) {
    throw new Error('Token is not available in sessionStorage');
  }

  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  return this.http.get<User>(`${this.apiUrl}/users/profile`, { headers });
}


  updateProfile(id: number, data: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${id}`, data);
  }
  getUsersByRole(role: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users/role/${role}`);
  }
}
