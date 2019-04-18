import { Component, OnInit } from '@angular/core';
import {CitiesService} from '../cities.service';

const icons = {
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

const background = {
  'clear sky': ['#ffd600', '#311b92'],
  'few clouds': ['#b3e5fc', '#1a237e'],
  'scattered clouds': ['#e1f5fe', '#536dfe'],
  'broken clouds': ['#e1f5fe', '#536dfe'],
  'shower rain': ['#4dd0e1', '#311b92'],
  'rain': ['#4dd0e1', '#311b92'],
  'thunderstorm': ['#4dd0e1', '#311b92'],
  'snow': ['#bbdefb', '#90caf9'],
  'mist': ['#bbdefb', '#90caf9']
};

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  city: string;
  cityId: string;
  temp: number;
  min: number;
  max: number;
  description: string;
  icon: string;
  background: string;
  rotated = false;
  loading = false;
  timer: number;
  options = [];

  constructor(private citiesService: CitiesService) {
    // this.city = ['Chandrapur', 'Nagpur', 'Nanded'][Math.floor(Math.random() * 3)];
    // this.country = ['IN', 'US', 'UK'][Math.floor(Math.random() * 3)];
    // this.temp = Math.floor(Math.random() * 45);
    // this.min = Math.floor(Math.random() * this.temp);
    // this.max = Math.floor(Math.random() * (50 - this.temp)) + this.temp;
    // this.description = ['clear sky', 'few clouds', 'scattered clouds', 'broken clouds', 'shower rain', 'rain', 'thunderstorm', 'snow', 'mist'][Math.floor(Math.random() * 9)];
    // this.icon = icons[this.description][0];
    // this.background = background[this.description];
  }

  ngOnInit() {
  }

  cityChanged() {
    this.loading = false;
    clearTimeout(this.timer);

    this.timer = setTimeout(() => {
      this.loading = true;
      this.options = this.citiesService.getCities();
      this.loading = false;
    }, 1000);
  }

  handleCardClick(){
    if(this.city)
      return;
    this.rotated = !this.rotated;
  }

}
