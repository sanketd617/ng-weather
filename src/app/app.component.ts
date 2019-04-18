import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular Weather';
  numCities = 9;
  isMaterial = true;

  range(n) {
    const a = [];
    for (let i = 0; i < n; i++) {
      a.push(i);
    }
    return a;
  }
}
