import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-tile',
  templateUrl: './dashboard-tile.component.html',
  styleUrls: ['./dashboard-tile.component.scss']
})
export class DashboardTileComponent implements OnInit {
  @Input() tile;

  constructor() { }

  ngOnInit() {
  }

}
