import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  city: string;
  country: string;
  temp: number;
  min: number;
  max: number;
  description: string;

  icons = [];

  constructor() {
    this.city = ['Chandrapur', 'Nagpur', 'Nanded'][Math.floor(Math.random() * 3)];
    this.country = ['IN', 'US', 'UK'][Math.floor(Math.random() * 3)];
    this.temp = Math.floor(Math.random() * 45);
    this.min = Math.floor(Math.random() * this.temp);
    this.max = Math.floor(Math.random() * (50 - this.temp)) + this.temp;
    this.description = ['Humid', 'Sunny', 'Rainy'][Math.floor(Math.random() * 3)];
    this.icons = {
        'clear sky': ['fas fa-sun', 'far fa-moon'],
        'few clouds': ['fas fa-cloud-sun', 'fas fa-cloud-moon'],
        'scattered clouds': ['fas fa-cloud-meatball', 'fas fa-cloud-meatball'],
        'broken clouds': ['fas fa-cloud-meatball', 'fas fa-cloud-meatball'],
        'shower rain': ['fas fa-cloud-sun-rain', 'fas fa-cloud-moon-rain'],
        'rain': ['fas fa-cloud-showers-heavy', 'fas fa-cloud-showers-heavy'],
        'thunderstorm': ['fas fa-bolt', 'fas fa-bolt'],
        'snow': ['fas fa-snowflake', 'fas fa-snowflake'],
        'mist': ['fas fa-water', 'fas fa-water']
      };
  }

  ngOnInit() {
  }

}
