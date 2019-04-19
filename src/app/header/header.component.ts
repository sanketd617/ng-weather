import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() isOnline;
  @Input() appName;
  @Input() updateFlag;
  @Output() updateEvent = new EventEmitter<boolean>();
  @Output() onlineEvent = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {
    window.addEventListener('online',  this.updateIndicator);
    window.addEventListener('offline', this.updateIndicator);
    setTimeout(() => {
      if (navigator.onLine) {
        this.onlineEvent.emit(true);
      }
    }, 1000);
  }

  toggleUpdate() {
    this.updateEvent.emit(!this.updateFlag);
  }

  updateIndicator = (event) => {
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
