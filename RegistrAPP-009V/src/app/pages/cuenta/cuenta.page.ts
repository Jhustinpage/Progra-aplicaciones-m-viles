import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage implements OnInit {
  usuario: { username: string; carrera: string } | null = null;

  constructor(private navCtrl: NavController, private loginService: LoginService) {}

  ngOnInit() {
    // Obtiene los datos del usuario al cargar la página
    this.usuario = this.loginService.getUserData();
  }

  goBack() {
    this.navCtrl.back();
  }
}