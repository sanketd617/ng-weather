import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';

interface City {
  id: string;
  name: string;
  country: string;
  coord: {
    lon: number,
    lat: number
  };
}

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  url = 'http://3.89.93.88:3000/';

  constructor(private http: HttpClient) { }

  getCities(city: string): Observable<City[]> {
    return this.http.get<City[]>(this.url + city).pipe(catchError(this.errorHandler));
  }

  getOfflineCities(city: string) {
    const cities = JSON.parse(localStorage.getItem('cities'));

    if (cities && cities.length > 0) {
      return {
        error: null,
        data: cities.filter((cityObj) => cityObj.name.toLowerCase().includes(city.toLowerCase()))
      };
    }

    return {
      error: 'No offline data available!',
      data: null
    };
  }

  storeOfflineCities(cities: City[]) {
      const availableCities = JSON.parse(localStorage.getItem('cities'));

      let allCities = [];

      if (availableCities) {
        allCities = [...allCities, ...availableCities];
      }

      allCities = [...allCities, ...cities];

      localStorage.setItem('cities', JSON.stringify(allCities));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError('Server error!');
  }
}
