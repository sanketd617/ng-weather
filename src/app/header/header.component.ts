import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() isOnline; // online status
  @Input() appName;
  @Input() updateFlag;  // should update ?
  @Output() updateEvent = new EventEmitter<boolean>(); // eventEmitter for updateFlag
  @Output() onlineEvent = new EventEmitter<boolean>(); // eventEmitter for online status
  constructor() { }

  ngOnInit() {
    // add listeners for internet connectivity
    window.addEventListener('online',  this.updateIndicator);
    window.addEventListener('offline', this.updateIndicator);
    setTimeout(() => {
      // check if online
      if (navigator.onLine) {
        // set online status to true
        this.onlineEvent.emit(true);
      }
    }, 1000);
  }

  toggleUpdate() {
    // toggle update flag
    this.updateEvent.emit(!this.updateFlag);
  }

  updateIndicator = (event) => {
    // set online status based on event
    switch (event.type) {
      case 'online':
        this.onlineEvent.emit(true);
        break;
      case 'offline':
        this.onlineEvent.emit(false);
        break;
    }
  }

}
