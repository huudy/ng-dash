import { Component, OnInit, Input } from '@angular/core';
import { DatatablesService } from '../../../services/datatables.service';

declare var $:any;

@Component({
  selector: 'app-asset-class-coverage-client',
  templateUrl: './asset-class-coverage-client.component.html',
  styleUrls: ['./asset-class-coverage-client.component.scss']
})
export class AssetClassCoverageClientComponent implements OnInit {
  
  @Input() data;
  
  constructor( private DatatablesService: DatatablesService ) { }

  badge = {
    'forex': {
      'color': 'badge-light text-muted',
      'description': 'FX cash, FX derivatives'
    },
    'fixedIncome': {
      'color': 'badge-light text-muted',
      'description': 'commodity, weather derivatives, CO2, FI derivatives, FI cash'
    },
    'equities': {
      'color': 'badge-light text-muted',
      'description': 'cash equity, equity derivatives'
    },
    'credit': {
      'color': 'badge-light text-muted',
      'description': 'credit derivatives, credit flow'
    },
    'commercial': {
      'color': 'badge-light text-muted',
      'description': 'deposits, securities'
    },
    'capitalMarkets': {
      'color': 'badge-light text-muted',
      'description': 'debt capital markets, equity capital markets'
    },
    'other': {
      'color': 'badge-light text-muted',
      'description': 'brokerage/clearing, other funds, other markets, other structures'
    }
  }

  ngOnInit() {
    this.buildComponent();
  }

  ngAfterViewInit() {
    let dom = $('h5:contains(Asset class coverage)').parent();
    this.DatatablesService.activateTooltips(dom);
  }

  buildComponent() {
    let badgeDescriptors = ['Fx', 'Fi', 'Eq', 'Cr', 'Co', 'Ca', 'Ot'];
    let badgeDescriptorsLong = ['forex', 'fixedIncome', 'equities', 'credit', 'commercial', 'capitalMarkets', 'other'];
    let badgeType = [
      'client holds no active products and has not traded with us for at least 24 months',
      'client traded with us within the last 24 months',
      'client currently holds active products or has recently traded with us'
    ];

    for (let i=0; i<7; i++) {
      if (this.data['coverageLevel' + badgeDescriptors[i]] == 1) {
        this.badge[badgeDescriptorsLong[i]].color = 'badge-warning';
      } else if (this.data['coverageLevel' + badgeDescriptors[i]] == 2) {
        this.badge[badgeDescriptorsLong[i]].color = 'badge-success';
      }

      this.badge[badgeDescriptorsLong[i]].description += '<br><em>' + badgeType[this.data['coverageLevel' + badgeDescriptors[i]]] + '</em>';
    }
  }

}
