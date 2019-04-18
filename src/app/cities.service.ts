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

  url = '/assets/city.list.json';

  constructor(private http: HttpClient) { }

  getCities(): Observable<City[]> {
    return this.http.get<City[]>(this.url).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError('Server error!');
  }
}
