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

  errorHandler(error: HttpErrorResponse) {
    return throwError('Server error!');
  }
}
