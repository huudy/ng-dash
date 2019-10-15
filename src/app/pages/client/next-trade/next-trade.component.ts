import { Component, OnInit, Input } from '@angular/core';
import { DatatablesService } from '../../../services/datatables.service';

declare var $:any;


@Component({
  selector: 'app-next-trade',
  templateUrl: './next-trade.component.html',
  styleUrls: ['./next-trade.component.scss']
})
export class NextTradeComponent implements OnInit {
  
  @Input() data;

  constructor( private DatatablesService: DatatablesService ) { }

  nextTrade = {
    'product': 'no prediction available',
    'details': 'trade date estimate not available'
  }

  ngOnInit() {
    this.buildComponent();
  }

  ngAfterViewInit() {
    let dom = $('div:contains(Most likely next trade)').parent();
    this.DatatablesService.activateTooltips(dom);
  }

  buildComponent() {
    this.nextTrade.product = this.data['mostLikelyNextTrade'];
    if (this.data['daysUntilNextTrade'] != 0) {
      this.nextTrade.details = 'trade expected in about ' + this.data['daysUntilNextTrade'] + ' days'
    }
  }

}
