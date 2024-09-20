import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username,
      password
    }, httpOptions);
  }

  register(username: string, email: string, password: string, name: any, lastname: any, phone: any, dob: any): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username,
      email,
      name,
      lastname,
      phone,
      password
    }, httpOptions);
  }

  verificarCorreo(email: string): Observable<any> {
    return this.http.post(AUTH_API + 'verificar-correo', { email }, httpOptions);
  }

  resetPassword(email: string): Observable<any> {
    return this.http.post(AUTH_API + 'reset-password', {
      email
    }, httpOptions);
  }
  
  getUserProfile(): Observable<any> {
    return this.http.get(AUTH_API + 'profile', httpOptions);
  }

  updateUserProfile(profileData: any): Observable<any> {
    return this.http.put(AUTH_API + 'profile', profileData, httpOptions);
  }
  
  updateProfilePicture(formData: FormData): Observable<any> {
    return this.http.post(AUTH_API + 'profile/picture', formData);
  }
  deleteUserAccount(data: any): Observable<any> {
    return this.http.post(AUTH_API + 'delete-account', data, httpOptions);
  }
}
