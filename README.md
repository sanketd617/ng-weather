# NgWeather
This web app displays weather data of different cities.
The data is fetched from openweathermap API.

## Live preview
This web app is hosted on AWS for preview. It can be view on http://3.89.93.88

## How to view weather data
1. Tap any card
2. After the card flips, enter the city name in the text box
3. Wait for 1 second, it automatically loads available city names from the server
4. Select the city from the list that appears
5. The card flips again and shows the weather information

## Offline?
This web app can also show you the last weather data fetched from the server if offline. <br>
Note: For data to be available offline, it must be fetched at least once.

## How to prevent weather from updating
Click the toggle switch on the right of the header. If the switch is blue, weather is updated every 5 minutes. If grey, no update is made.

## Change city?
Changing is the same process as viewing weather. The only difference is here the edit button on the bottom right of the city panel has to be clicked.


## About the code

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.6.
Every line of the code is explained in the form of comments in the code itself. Feel free to modify!

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
