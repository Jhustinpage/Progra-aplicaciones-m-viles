import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = 'b18fddb69675eff8eb8ba8645ca03c09';  //  API key de OpenWeatherMap
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) {}

  getWeather(city: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?q=${city}&appid=${this.apiKey}&units=metric`);
  }
}
