import {Component, DoCheck, Input, KeyValueDiffer, KeyValueDiffers, OnInit} from '@angular/core';
import {CitiesService} from '../cities.service';
import {WeatherService} from '../weather.service';

// icons based on weather condition
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

// background colors based on weather condition
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

// colors based on day/night condition, 0 is day, 1 is night
const color = ['#424242', '#ffffff'];

// icon colors based on day/night condition, 0 is day, 1 is night
const iconColor = ['rgba(255, 255, 255, 0.7)', 'rgba(255, 255, 255, 0.3)'];

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  city: string; // city name
  cityId: string; // id for fetching weather
  temp: number; // temperature
  min: number; // minimum temperature
  max: number; // maximum temperature
  description: string; // weather description
  icon: string; // background icon
  background: string; // bcakground color
  color: string;  // font color
  iconColor: string; // background icon color
  rotated = false; // true if card is rotated
  loading = false; // true when loading
  timer: number;  // timer for ajax request to fetch data when user types city name
  options = []; // options..available cities
  error: string; // errors..if any
  interval = null;  // interval to refresh weather
  @Input() updateFlag;  // if true, weather will be updated
  @Input() updateInterval;  // time interval to update weather
  @Input() index; // no use unitl now
  @Input() isOnline;  // online status

  constructor(private citiesService: CitiesService, private weatherService: WeatherService) {

  }

  ngOnInit() {
  }

  // when user types a city name
  cityChanged() {
    // show loader
    this.loading = false;

    // clear previous timer..if user starts typing again, no need to fetch cities
    clearTimeout(this.timer);

    if (this.city.length < 3) {
      // show error if city name is less than 3 characters
      this.error = 'City name must be of atleast 3 characters';
      return;
    }

    // no error
    this.error = '';

    // set a timer..if user pauses for 1 sec..it starts loading cities..
    this.timer = setTimeout(() => {

      // show loader
      this.loading = true;
      if (this.isOnline) {
        // if online, fetch cities from server
        this.citiesService.getCities(this.city)
          .subscribe(
            (cities) => {

              this.options = cities;
              if (this.options.length === 0) {
                this.error = 'No city found!';
              } else {
                // store the fetched cities for offline use
                this.citiesService.storeOfflineCities(cities);
              }

              // loading finished
              this.loading = false;
            },
            (error) => this.error = error // handle errors
          );
      } else {
        // if offline, fetch from local storage
        const data = this.citiesService.getOfflineCities(this.city);
        if (data.error) {
          // display error, if any
          this.error = data.error;
          this.loading = false;
          return;
        }

        // show options available
        this.options = data.data.filter((city) => city.name.toLowerCase().includes(this.city.toLowerCase()));

        // loading finished
        this.loading = false;
        return;
      }

      // loading cities
      this.loading = true;
    }, 1000);
  }

  handleCardClick() {
    if (this.city) {
      // if no city is selected, do nothing
      return;
    }

    // flip on click
    this.rotated = !this.rotated;
  }

  // select the city from options available and fetch weather data
  selectCity(option) {
    this.city = option.name;
    this.cityId = option.id;
    this.rotated = !this.rotated;
    this.options = [];
    this.getWeather();
  }

  getWeather() {
    this.loading = true;
    if (this.isOnline) {
      // if online, fetch data from API and make necessary calculations
      this.weatherService.getWeather(this.cityId)
        .subscribe(
          (weather) => {
            this.weatherService.storeOfflineWeather(weather);
            const sunrise = weather.sys.sunrise * 1000;
            const sunset = weather.sys.sunset * 1000;
            const now = Date.now();
            const dayNightIndex = now > sunrise && now < sunset ? 0 : 1;
            this.min = weather.main.temp_min - 273.15;
            this.max = weather.main.temp_max - 273.15;
            this.temp = weather.main.temp - 273.15;
            this.description = weather.weather[0].description;
            this.loading = false;
            this.icon = icons[weather.weather[0].main][dayNightIndex];
            this.background = background[weather.weather[0].main][dayNightIndex];
            this.color = color[dayNightIndex];
            this.iconColor = iconColor[dayNightIndex];

            if (!this.interval) {
              // if interval is not set, add interval
              this.interval = setInterval( () => {
                if (this.updateFlag) {
                  // update only when update flag is true
                  this.getWeather();
                }
              }, this.updateInterval);
            }
          },
          (error) => this.error = error // handle errors
        );
    } else {

      // if offline, fetch weather from localstorage & make necessary calculations
      const data = this.weatherService.getOfflineWeather(this.cityId);

      if (data.error) {
        // handle error
        this.error = data.error;
        this.loading = false;
        this.rotated = true;
        return;
      }
      const weather = data.data;
      const sunrise = weather.sys.sunrise * 1000;
      const sunset = weather.sys.sunset * 1000;
      const now = Date.now();
      const dayNightIndex = now > sunrise && now < sunset ? 0 : 1; // determine day or night
      this.min = weather.main.temp_min - 273.15;
      this.max = weather.main.temp_max - 273.15;
      this.temp = weather.main.temp - 273.15;
      this.description = weather.weather[0].description;
      this.loading = false;
      this.icon = icons[weather.weather[0].main][dayNightIndex];
      this.background = background[weather.weather[0].main][dayNightIndex];
      this.color = color[dayNightIndex];
      this.iconColor = iconColor[dayNightIndex];
    }
  }


}
