import { Component, OnInit } from '@angular/core';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-leer-qr',
  templateUrl: './leer-qr.page.html',
  styleUrls: ['./leer-qr.page.scss'],
})
export class LeerQrPage implements OnInit {
  isSupported = false;
  isModuleInstalled = false; // Verifica si el módulo está instalado
  barcodes: Barcode[] = [];

  constructor(
    private alertController: AlertController,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.checkModuleInstallation();  // Verificar la instalación del módulo al iniciar
    BarcodeScanner.isSupported().then((result) => {
      console.log('Barcode scanning supported:', result.supported);
      this.isSupported = result.supported;
    });
  }

  async checkModuleInstallation(): Promise<void> {
    try {
      // Forzar la instalación del módulo de Google Barcode Scanner
      const result = await BarcodeScanner.installGoogleBarcodeScannerModule();
      console.log('Google Barcode Scanner Module installation result:', result);
      this.isModuleInstalled = true; // Módulo instalado con éxito
    } catch (error) {
      console.warn('Google Barcode Scanner Module not installed:', error);
      this.isModuleInstalled = false; // Si falla, mantenemos en falso
    }
  }

  async scan(): Promise<void> {
    console.log('Scan button clicked');
    if (!this.isModuleInstalled) {
      this.presentErrorAlert('El módulo de Google Barcode Scanner no está instalado.');
      return;
    }

    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentPermissionAlert();
      return;
    }

    try {
      const { barcodes } = await BarcodeScanner.scan();
      console.log('Barcodes detected:', barcodes);
      this.barcodes.push(...barcodes);
    } catch (error) {
      console.error('Error during barcode scan:', error);
      this.presentErrorAlert('An error occurred while scanning. Please try again.');
    }
  }

  async installGoogleBarcodeScannerModule(): Promise<void> {
    try {
      const result = await BarcodeScanner.installGoogleBarcodeScannerModule();
      console.log('Google Barcode Scanner Module installation result:', result);
      this.isModuleInstalled = true;
    } catch (error) {
      console.error('Error installing Google Barcode Scanner Module:', error);
      await this.presentErrorAlert(
        'Failed to install the Google Barcode Scanner Module. Check your internet connection and try again.'
      );
    }
  }

  async requestPermissions(): Promise<boolean> {
    const permissions = await BarcodeScanner.requestPermissions();

    if (permissions.camera === 'granted' || permissions.camera === 'limited') {
      console.log('Camera permission granted');
      return true;
    } else {
      console.warn('Camera permission not granted');
      return false;
    }
  }

  async presentErrorAlert(message: string): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async presentPermissionAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission Required',
      message: 'Se necesita permiso para acceder a la cámara.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  goBack() {
    this.navCtrl.back();
  }
}
