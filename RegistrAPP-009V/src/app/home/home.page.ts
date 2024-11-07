import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  mainTitle: string;
  subTitle: string;
  welcomeMessage: string;
  loginMessage!: string;
  username!: string;
  password!: string;

  constructor(
    private router: Router,
    private toastController: ToastController,
    private loginService: LoginService
  ) {
    this.mainTitle = 'RegistrAPP';
    this.subTitle = 'DuocUC';
    this.welcomeMessage = 'Bienvenido';
  }

  async validateLogin() {
    console.log("Ejecutando validacion!");

    // Espera la resolución de validateLogin usando await
    const isValidLogin = await this.loginService.validateLogin(this.username, this.password);

    if (isValidLogin) {
      this.showToastMessage('Inicio de sesión válido', 'success');
      this.welcomeMessage = `Bienvenido ${this.username}`;

      const extras = this.createExtrasUser(this.username);
      this.router.navigate(['/index'], extras);
    } else {
      this.showToastMessage('Inicio de sesión inválido', 'danger');
    }
  }

  createExtrasUser(u: string): NavigationExtras | undefined {
    return {
      state: {
        user: u
      }
    }
  }

  async showToastMessage(text: string, msgColor: string) {
    const toast = await this.toastController.create({
      message: text,
      color: msgColor,
      position: 'bottom',
      duration: 3000
    });
    toast.present();
  }
}
