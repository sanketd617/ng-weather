import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  appName = 'Angular Weather';
  numCities = 9;
  updateFlag = true;  // should update?
  updateInterval = 60000 * 5; // 5 minutes interval for updating weather
  isOnline = false; // online status

  setFlag(flag) {
    // set update flag
    this.updateFlag = flag;
  }

  // get an array of integers from 0 to n to loop through
  range(n) {
    const a = [];
    for (let i = 0; i < n; i++) {
      a.push(i);
    }
    return a;
  }

  // update online status..from header..
  updateIndicator(status) {
    this.isOnline = status;
  }

}
