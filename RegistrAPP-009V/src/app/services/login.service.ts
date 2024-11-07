import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  users: User[] = [
    { username: "admin", password: "12345" },
    { username: "usuario1", password: "12345" },
    { username: "usuario2", password: "12345" }
  ];

  constructor() {}

  async validateLogin(u: string, p: string): Promise<boolean> {
    const user = this.users.find(user => user.username === u && user.password === p);
    if (user) {
      console.log(`Usuario encontrado: ${u}`);
      localStorage.setItem('auth_token', 'true'); // Marca al usuario como autenticado
      return true;
    }
    console.log(`Usuario no encontrado: ${u}`);
    return false;
  }

  logout(): void {
    localStorage.removeItem('auth_token'); // Remueve el token de autenticación
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('auth_token') === 'true'; // Verifica si hay un token válido
  }
}
