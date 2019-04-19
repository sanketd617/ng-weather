import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

interface Weather {
  coord: {
    lon: number,
    lat: number
  };
  weather: [
    {
      id: number,
      main: string,
      description: string,
      icon: string
    }
    ];
  base: string;
  main: {
    temp: number,
    pressure: number,
    humidity: number,
    temp_min: number,
    temp_max: number
  };
  visibility: number;
  wind: {
    speed: number,
    deg: number
  };
  clouds: {
    all: number
  };
  dt: number;
  sys: {
    type: number,
    id: number,
    message: string,
    country: string,
    sunrise: number,
    sunset: number
  };
  id: number;
  name: string;
  cod: number;
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = '21d394c6e9b28d607e2528a206ffd6a4';
  constructor(private http: HttpClient) { }

  getWeather(id: string): Observable<Weather> {
    const url = `http://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${this.apiKey}`;
    return this.http.get<Weather>(url).pipe(catchError(this.handleError));
  }

  getOfflineWeather(id: string) {
    const weather = JSON.parse(localStorage.getItem('weather'));

    if (weather && weather.length > 0) {
      const w = weather.filter((w) => w.id === id);

      if (w.length > 0) {
        return {
          data: w[0],
          error: null
        };
      }
    }

    return {
      error: 'No offline weather data available!',
      data: []
    };
  }

  storeOfflineWeather(weather: Weather) {
    const availableWeather = JSON.parse(localStorage.getItem('weather'));

    let allWeather = [];

    if (availableWeather) {
      allWeather = [...allWeather, ...availableWeather];
    }

    allWeather = [...allWeather, weather];

    localStorage.setItem('weather', JSON.stringify(allWeather));
  }

  handleError(error: HttpErrorResponse) {
    return throwError('Server error!');
  }
}
