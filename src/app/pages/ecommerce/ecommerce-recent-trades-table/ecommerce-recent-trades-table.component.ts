import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { DatatablesService } from '../../../services/datatables.service';

declare var $: any;

@Component({
  selector: 'app-ecommerce-recent-trades-table',
  templateUrl: './ecommerce-recent-trades-table.component.html',
  styleUrls: ['./ecommerce-recent-trades-table.component.scss']
})
export class EcommerceRecentTradesTableComponent implements OnInit, OnChanges {

  @Input() data;
  @Input() search;
  table = null;

  constructor(private DatatablesService: DatatablesService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.buildTable();
  }

  buildTable() {
    if (!!this.table) {
      this.table.destroy();
    }

    let self = this;

    this.table = this.DatatablesService.createDatatable(
      '#ecommerceRecentTradesTable',
      {
        data: self.data,
        columns: [
          { data: 'clientName' },
          { data: 'tradeId', className: 'right-align' },
          { data: 'platform' },
          { data: 'product' },
          { data: 'currencyPair' },
          { data: 'notional', className: "right-align", render: function (data, type, row) { if (type == 'sort' || type == 'type') { return data } return self.DatatablesService.formatAmount(row, 'notional', 'notionalCurrency') } },
          { data: 'clientId', visible: false },
          { data: 'clientMatchCodes', visible: false },
        ],
        createdRow: function (row, data) {
          $('td:eq(0)', row).html(self.DatatablesService.addClientTooltip(data));
        }
      },
      false,
      self.DatatablesService.configureExport([0, 6, 7, 1, 2, 3, 4, 5])
    );

    if (!!this.search) {
      this.table.search(this.search);
      this.table.draw();
    }
  }
}
