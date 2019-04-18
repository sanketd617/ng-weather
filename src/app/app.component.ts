import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  appName = 'Angular Weather';
  numCities = 9;
  updateFlag = true;
  updateInterval = 60000*5;

  setFlag(flag){
    this.updateFlag = flag;
  }

  range(n) {
    const a = [];
    for (let i = 0; i < n; i++) {
      a.push(i);
    }
    return a;
  }
}
