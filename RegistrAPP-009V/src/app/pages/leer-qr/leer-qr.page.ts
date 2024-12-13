import { Component, OnInit } from '@angular/core';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController, NavController } from '@ionic/angular';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-leer-qr',
  templateUrl: './leer-qr.page.html',
  styleUrls: ['./leer-qr.page.scss'],
})
export class LeerQrPage implements OnInit {
  isSupported = false;
  barcodes: Barcode[] = [];
  currentDate: string = '';

  constructor(
    private alertController: AlertController,
    private navCtrl: NavController,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });

    // Obtener la fecha actual en el formato "DD/MM/YYYY"
    const today = new Date();
    this.currentDate = today.toLocaleDateString('es-ES'); // Formato local en español
    console.log('Fecha actual:', this.currentDate);  // Para depurar la fecha actual
  }

  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      await this.presentErrorAlert('Se requieren permisos para usar la cámara.');
      return;
    }

    try {
      const { barcodes } = await BarcodeScanner.scan();
      this.barcodes.push(...barcodes);

      if (barcodes.length > 0) {
        const scannedText = barcodes[0].rawValue || '';
        console.log('Texto escaneado:', scannedText); // Verificar que el texto esté llegando correctamente
        this.verifyAttendance(scannedText);
      } else {
        await this.presentErrorAlert('No se detectó ningún código QR.');
      }
    } catch (error) {
      console.error('Error during barcode scan:', error);
      await this.presentErrorAlert('Ocurrió un error al escanear. Intente nuevamente.');
    }
  }

  verifyAttendance(scannedText: string): void {
    console.log('Texto escaneado:', scannedText);  // Verifica que el texto escaneado esté correcto
    const user = this.loginService.getUserData();
    
    if (!user) {
      this.presentErrorAlert('No se encontró información del usuario actual.');
      return;
    }
  
    const parts = scannedText.split('-');
    if (parts.length === 2) {
      const section = parts[0].trim();
      const dateFromQR = parts[1].trim();
      console.log('Fecha desde el QR:', dateFromQR); // Verifica que la fecha se extrae correctamente
  
      // Compara la fecha con la fecha actual
      console.log('Fecha actual:', this.currentDate); // Imprime la fecha actual para verificar su formato
      if (dateFromQR === this.currentDate) {
        console.log('La fecha del QR coincide con la fecha actual.');
  
        // Compara la sección con la carrera del usuario
        console.log('Carrera del usuario:', user.carrera); // Verifica que la carrera del usuario esté bien
        if (this.isSectionValidForUser(user.carrera, section)) {
          this.presentSuccessAlert('¡Asistencia registrada correctamente!');
        } else {
          this.presentErrorAlert('La sección del QR no coincide con la carrera del usuario.');
        }
      } else {
        this.presentErrorAlert('La fecha del código QR no coincide con la fecha de hoy.');
      }
    } else {
      this.presentErrorAlert('El formato del código QR no es válido.');
    }
  }
  

  isSectionValidForUser(carrera: string, section: string): boolean {
    console.log('Carrera:', carrera, 'Sección:', section); // Verifica los valores recibidos
    const seccionesPorCarrera: { [key: string]: string[] } = {
      'Ingenieria en Informatica': ['INI5111', 'INI5112'],
      'Diseño grafico': ['DIS3111', 'DIS3112'],
      'Administrador del Sistema': ['ADM2111', 'ADM2112'],
    };
  
    const seccionesValidas = seccionesPorCarrera[carrera] || [];
    const isValid = seccionesValidas.includes(section);
    console.log('¿Es la sección válida?', isValid); // Verifica si la sección es válida
    return isValid;
  }
  

  async requestPermissions(): Promise<boolean> {
    const permissions = await BarcodeScanner.requestPermissions();
    return permissions.camera === 'granted' || permissions.camera === 'limited';
  }

  async presentSuccessAlert(message: string): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async presentErrorAlert(message: string): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  goBack() {
    this.navCtrl.back();
  }
}
