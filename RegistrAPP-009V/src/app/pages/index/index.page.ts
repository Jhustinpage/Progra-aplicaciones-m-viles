import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';


@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})



export class IndexPage implements OnInit {
  weatherData: any = {}; // Inicializar como objeto vacío
  username: string = 'guest';
  name: string = '';
  lastname: string = '';
  welcomeMessage: string = ''; // Mensaje de bienvenida
  currentTime: string = '';

  constructor(
    private weatherService: WeatherService,
    private router: Router,
    private storageService: StorageService
  ) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state) {
      console.log(`Username: ${state['user']}`);
      this.username = state['user'];
    }
  }

  ngOnInit() {
    this.fetchWeatherData();
    this.loadUserData();
    this.updateTime();
  }

// Método para obtener la hora actual
updateTime() {
  setInterval(() => {
    const now = new Date();
    this.currentTime = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
  }, 1000);
}

  fetchWeatherData() {
    const latitude = -33.4777; 
    const longitude = -70.5153;

    this.weatherService.getWeatherData(latitude, longitude).subscribe(
      data => {
        this.weatherData = data;
        console.log(this.weatherData);
      },
      error => {
        console.error('Error al obtener datos meteorológicos', error);
      }
    );
  }

  async loadUserData() {
    try {
      const data = await this.storageService.get(`user_data_${this.username}`);
      if (data) {
        this.name = data.name;
        this.lastname = data.lastname;
        this.welcomeMessage = `¡Bienvenido ${this.name} ${this.lastname}!`;
      } else {
        this.welcomeMessage = `¡Bienvenido ${this.username}!`; // Mensaje en el caso de no encontrar los datos
      }
    } catch (error) {
      console.error('Error al cargar datos del usuario:', error);
    }
  }

  // Método para cerrar sesión
  async logout() {
    try {
      await this.storageService.remove(`user_data_${this.username}`); // Limpia los datos del usuario en el storage
      localStorage.removeItem('auth_token'); // Remueve el token de autenticación
      this.router.navigate(['/login']); // Redirige a la página de inicio de sesión
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
}
