import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

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

  constructor() { }

  getCities() {
    return [
      {
        id: 707860,
        name: 'Hurzuf',
        country: 'UA',
        coord: {
          lon: 34.283333,
          lat: 44.549999
        }
      },
      {
        id: 519188,
        name: 'Novinki',
        country: 'RU',
        coord: {
          lon: 37.666668,
          lat: 55.683334
        }
      },
      {
        id: 1283378,
        name: 'Gorkhā',
        country: 'NP',
        coord: {
          lon: 84.633331,
          lat: 28
        }
      },
    ];
  }
}
