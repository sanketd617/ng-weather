import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() appName;
  @Input() updateFlag;
  @Output() updateEvent = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {
  }

  toggleUpdate() {
    this.updateEvent.emit(!this.updateFlag);
  }

}
