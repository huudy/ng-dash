import { Component, OnInit, Input } from '@angular/core';
import { DatatablesService } from '../../../services/datatables.service';

declare var $:any;

@Component({
  selector: 'app-activity-level-client',
  templateUrl: './activity-level-client.component.html',
  styleUrls: ['./activity-level-client.component.scss']
})
export class ActivityLevelClientComponent implements OnInit {
  @Input() staticData;
  @Input() recentTransactionsData;

  constructor( private DatatablesService: DatatablesService ) { }

  ngOnInit() {
    this.buildComponent();
  }

  table = null;

  bar = {
    'width': '0px',
    'delta': '0px',
    'color': 'bg-danger',
    'description': ''
  };

  buildComponent() {
    /* progress bar */
    this.bar.width = this.staticData['activityLevelCurrent'] * 10 + 10 + '%';
    this.bar.delta = (this.staticData['activityLevelPast'] - this.staticData['activityLevelCurrent']) * 10 + '%';

    if (this.staticData['activityLevelCurrent'] >= 7) {
      this.bar.color = 'bg-success';
      this.bar.description = 'high';
    } else if (this.staticData['activityLevelCurrent'] >= 4) {
      this.bar.color = 'bg-warning';
      this.bar.description = 'moderate';
    }

    this.buildTable();
  }

  buildTable() {
    if (!!this.table) {
      this.table.destroy();
    }

    let self = this;

    this.table = this.DatatablesService.createDatatable(
      '#mostRecentTradesTable',
      {
        data: self.recentTransactionsData,
        columns: [
          { data: 'tradeDate' },
          { data: 'product' }
        ],
        dom: 't',
        createdRow: function (row, data) {
          $('td:eq(0)', row).html(self.DatatablesService.formatDate(data, 'tradeDate'));
          
          let tooltipText = (
            'currency pair: ' + data['currencyPair'] + '<br>' +
            'notional: ' + self.DatatablesService.formatAmount(data, 'notional', 'notionalCurrency') + '<br>' +
            'trade id: ' + data['tradeId'] + '<br>' + 
            (!!data['underlying'] ? 'underlying: ' + data['underlying'] : '')
          );

          $('td:eq(1)', row).html(self.DatatablesService.addTooltip(data['product'], tooltipText));
        }
      }
    );
  }

}
