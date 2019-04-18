import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CityComponent } from './city/city.component';
import {FormsModule} from '@angular/forms';
import {CitiesService} from './cities.service';
import {HttpClientModule} from '@angular/common/http';
import {WeatherService} from './weather.service';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    CityComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    CitiesService,
    WeatherService
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
