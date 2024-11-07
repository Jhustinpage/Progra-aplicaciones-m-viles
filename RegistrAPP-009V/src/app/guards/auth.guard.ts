import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(): boolean {
    if (this.loginService.isLoggedIn()) {
      return true;
    } else {
      console.log("Usuario no autenticado, redirigiendo a login");
      this.router.navigate(['/home']); // Redirige a la página de inicio de sesión si no está autenticado
      return false;
    }
  }
}
