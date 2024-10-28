import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage {
  constructor(private navCtrl: NavController) {}
  
  goBack() {
    this.navCtrl.back();
  }

}
