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

  constructor() {
    this.city = ['Chandrapur', 'Nagpur', 'Nanded'][Math.floor(Math.random() * 3)];
    this.country = ['IN', 'US', 'UK'][Math.floor(Math.random() * 3)];
    this.temp = Math.floor(Math.random() * 45);
    this.min = Math.floor(Math.random() * this.temp);
    this.max = Math.floor(Math.random() * (50 - this.temp)) + this.temp;
    this.description = ['Humid', 'Sunny', 'Rainy'][Math.floor(Math.random() * 3)];
  }

  ngOnInit() {
  }

}
