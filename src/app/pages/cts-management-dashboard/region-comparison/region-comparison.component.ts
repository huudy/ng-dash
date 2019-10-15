import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-region-comparison',
  templateUrl: './region-comparison.component.html',
  styleUrls: ['./region-comparison.component.scss']
})
export class RegionComparisonComponent implements OnInit, OnChanges {

  @Input() data;
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.makeTiles();
  }

  tiles = [];

  makeTiles() {
    this.tiles = this.data.map( kpi => { return { text: kpi['text'], accent: kpi['indicator'] > 0 ? 'success': 'danger' }});
  }

}
