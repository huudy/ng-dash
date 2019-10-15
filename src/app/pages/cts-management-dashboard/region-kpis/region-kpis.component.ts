import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-region-kpis',
  templateUrl: './region-kpis.component.html',
  styleUrls: ['./region-kpis.component.scss']
})
export class RegionKpisComponent implements OnInit, OnChanges {

  @Input() data;
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.makeTiles();
  }

  kpiTiles = [];

  makeTiles() {
    this.kpiTiles = this.data.map( kpi => { return { value: kpi['kpiValue'], text: kpi['kpiText'], icon: kpi['kpiIcons'].split(';')[0] }})
  }

}
