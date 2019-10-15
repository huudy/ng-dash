import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-important-item',
  templateUrl: './important-item.component.html',
  styleUrls: ['./important-item.component.scss']
})
export class ImportantItemComponent implements OnInit {
  
  @Input() title;
  @Input() text;
  @Input() routerLinkTarget;
  @Input() routerParameters;

  constructor() { }

  ngOnInit() {
  }

  getRoute() {
    return [this.routerLinkTarget, JSON.parse(this.routerParameters)];
  }

}
