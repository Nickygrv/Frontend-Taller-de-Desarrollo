import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioDto, PersonaDto } from '../models/PersonaDto';  // Importa los modelos que creaste

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth';  // Cambia la URL base si es necesario

  constructor(private http: HttpClient) {}

  // Registro de usuario
  registerUser(usuarioDto: UsuarioDto, personaDto: PersonaDto): Observable<any> {
    const body = {
      usuarioDto: usuarioDto,
      personaDto: personaDto
    };
    return this.http.post(`${this.apiUrl}/register`, body);
  }

  // Inicio de sesión
  loginUser(usernameOrEmail: string, password: string): Observable<any> {
    const body = {
      usernameOrEmail: usernameOrEmail,
      password: password
    };
    return this.http.post(`${this.apiUrl}/login`, body);
  }

  // Restablecimiento de contraseña
  resetPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, { email: email });
  }
}
