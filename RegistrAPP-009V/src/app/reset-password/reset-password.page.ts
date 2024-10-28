import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage  {

  constructor(
    private navCtrl: NavController
  ) {}

  resetPassword() {
    console.log('Se ha enviado un correo para restablecer la contraseña')
  }

  goBack() {
    this.navCtrl.back();
  }

}
