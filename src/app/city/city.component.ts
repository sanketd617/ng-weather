import { Component, OnInit } from '@angular/core';
import {CitiesService} from '../cities.service';
import {WeatherService} from '../weather.service';

const icons = {
  Clear: ['fas fa-sun', 'far fa-moon'],
  Clouds: ['fas fa-cloud-sun', 'fas fa-cloud-moon'],
  Drizzle: ['fas fa-cloud-sun-rain', 'fas fa-cloud-moon-rain'],
  Rain: ['fas fa-cloud-showers-heavy', 'fas fa-cloud-showers-heavy'],
  Thunderstorm: ['fas fa-bolt', 'fas fa-bolt'],
  Snow: ['fas fa-snowflake', 'fas fa-snowflake'],
  Mist: ['fas fa-water', 'fas fa-water'],
  Smoke: ['fas fa-water', 'fas fa-water'],
  Haze: ['fas fa-water', 'fas fa-water'],
  Dust: ['fas fa-water', 'fas fa-water'],
  Fog: ['fas fa-water', 'fas fa-water'],
  Sand: ['fas fa-water', 'fas fa-water'],
  Ash: ['fas fa-water', 'fas fa-water'],
  Squall: ['fas fa-water', 'fas fa-water'],
  Tornado: ['fas fa-water', 'fas fa-water'],
};

const background = {
  Clear: ['#ffd600', '#311b92'],
  Clouds: ['#b3e5fc', '#1a237e'],
  Drizzle: ['#4dd0e1', '#311b92'],
  Rain: ['#4dd0e1', '#311b92'],
  Thunderstorm: ['#4dd0e1', '#311b92'],
  Snow: ['#bbdefb', '#90caf9'],
  Mist: ['#bbdefb', '#90caf9'],
  Smoke: ['#bbdefb', '#90caf9'],
  Haze: ['#bbdefb', '#90caf9'],
  Dust: ['#bbdefb', '#90caf9'],
  Fog: ['#bbdefb', '#90caf9'],
  Sand: ['#bbdefb', '#90caf9'],
  Ash: ['#bbdefb', '#90caf9'],
  Squall: ['#bbdefb', '#90caf9'],
  Tornado: ['#bbdefb', '#90caf9'],
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
  error: string;

  constructor(private citiesService: CitiesService, private weatherService: WeatherService) {

  }

  ngOnInit() {
  }

  cityChanged() {
    this.loading = false;
    clearTimeout(this.timer);

    if (this.city.length < 3) {
      this.error = 'City name must be of atleast 3 characters';
      return;
    }

    this.error = '';

    this.timer = setTimeout(() => {
      this.loading = true;
      this.citiesService.getCities()
        .subscribe(
          (cities) => {
            this.options = cities.filter(city => city.name.toLowerCase().includes(this.city.toLowerCase()));
            this.loading = false;
          },
          (error) => this.error = error
          );
      this.loading = true;
    }, 1000);
  }

  handleCardClick() {
    if (this.city) {
      return;
    }
    this.rotated = !this.rotated;
  }

  selectCity(option) {
    this.city = option.name;
    this.cityId = option.id;
    this.rotated = !this.rotated;
    this.loading = true;
    this.options = [];

    this.weatherService.getWeather(this.cityId)
      .subscribe(
        (weather) => {
          console.log(weather);
          this.min = weather.main.temp_min - 273.15;
          this.max = weather.main.temp_max - 273.15;
          this.temp = weather.main.temp - 273.15;
          this.description = weather.weather[0].description;
          this.loading = false;
          this.icon = icons[weather.weather[0].main][0];
          this.background = background[weather.weather[0].main];
        },
        (error) => this.error = error
      );
  }

}
