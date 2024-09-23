import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage  {

  constructor() { }

  resetPassword() {
    console.log('Se ha enviado un correo para restablecer la contraseña')
  }


}
