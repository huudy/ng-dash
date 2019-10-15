import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pre-settlement-risk-client',
  templateUrl: './pre-settlement-risk-client.component.html',
  styleUrls: ['./pre-settlement-risk-client.component.scss']
})
export class PreSettlementRiskClientComponent implements OnInit {
 
  @Input() data;
 
  constructor() { }

  bar = {
    'width':'0px',
    'color': 'bg-success',
    'description': 'no data available'
  }

  ngOnInit() {
    this.buildComponent();
  }

  buildComponent() {
    if (!!this.data) {
      this.data['limitExposureFraction'] = (this.data['limitExposureFraction'] || 0);
      this.bar.width = this.data['limitExposureFraction'] * 100 + '%';
      this.bar.description = this.data['limitExposureFraction'].toLocaleString('de-DE', { style: 'percent', minimumFractionDigits: 0 }) + ' of limit used';

      if (this.data['limitExposureFraction'] >= 0.75) {
        this.bar.color = 'bg-warning';
      }
      if (this.data['limitExposureFraction'] >= 0.9) {
        this.bar.color = 'bg-danger';
      }
    }
  }

}
