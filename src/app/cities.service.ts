import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';


// city interface
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

  url = 'http://3.89.93.88:3000/';  // node server to fetch available cities, provided by openweathermap.org

  constructor(private http: HttpClient) { }

  getCities(city: string): Observable<City[]> {
    // get cities from the node server
    return this.http.get<City[]>(this.url + city).pipe(catchError(this.errorHandler));
  }

  // get cities from local storage
  getOfflineCities(city: string) {
    const cities = JSON.parse(localStorage.getItem('cities'));

    if (cities && cities.length > 0) {
      return {
        error: null,
        data: cities.filter((cityObj) => cityObj.name.toLowerCase().includes(city.toLowerCase()))
      };
    }
    // no cities avalable offline
    return {
      error: 'No offline data available!',
      data: null
    };
  }

  // store cities offline
  storeOfflineCities(cities: City[]) {

    // get available cities
      const availableCities = JSON.parse(localStorage.getItem('cities'));

      let allCities = [];

      if (availableCities) {
        // merge available cities and result
        allCities = [...allCities, ...availableCities];
      }

      // merge all cities
      allCities = [...allCities, ...cities];

      // store all cities
      localStorage.setItem('cities', JSON.stringify(allCities));
  }

  errorHandler(error: HttpErrorResponse) {
    // handle error
    return throwError('Server error!');
  }
}
