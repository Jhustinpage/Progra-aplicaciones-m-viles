import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  users: { username: string; password: string; carrera: string }[] = [
    { username: "admin", password: "12345", carrera: "Administrador del Sistema" },
    { username: "Jhustin", password: "12345", carrera: "Ingenieria en Informatica" },
    { username: "usuario2", password: "12345", carrera: "Diseño grafico" }
  ];

  constructor() {}

  async validateLogin(u: string, p: string): Promise<boolean> {
    const user = this.users.find(user => user.username === u && user.password === p);
    if (user) {
      console.log(`Usuario encontrado: ${u}`);
      localStorage.setItem('auth_token', 'true'); // Marca al usuario como autenticado
      localStorage.setItem('user_data', JSON.stringify(user)); // Guarda los datos del usuario
      return true;
    }
    console.log(`Usuario no encontrado: ${u}`);
    return false;
  }

  logout(): void {
    localStorage.removeItem('auth_token'); // Remueve el token de autenticación
    localStorage.removeItem('user_data'); // Remueve los datos del usuario
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('auth_token') === 'true'; // Verifica si hay un token válido
  }

  getUserData(): { username: string; carrera: string } | null {
    const userData = localStorage.getItem('user_data');
    return userData ? JSON.parse(userData) : null; // Retorna los datos del usuario o null
  }
}
