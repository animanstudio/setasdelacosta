import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated: boolean = false;
  private predefinedCredentials = {
    username: 'nando123',
    password: 'nando123'
  };

  constructor() {}

  // Método para verificar las credenciales ingresadas con las credenciales predefinidas
  verifyCredentials(username: string, password: string): boolean {
    return username === this.predefinedCredentials.username && password === this.predefinedCredentials.password;
  }

  // Método para iniciar sesión
  login(username: string, password: string): boolean {
    if (this.verifyCredentials(username, password)) {
      this.isAuthenticated = true;
      return true;
    }
    return false;
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  // Método para cerrar sesión
  logout(): void {
    this.isAuthenticated = false;
  }
}
