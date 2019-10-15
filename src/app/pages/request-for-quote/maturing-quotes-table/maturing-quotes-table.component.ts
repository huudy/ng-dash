import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { DatatablesService } from '../../../services/datatables.service';

declare var $: any;

@Component({
  selector: 'app-maturing-quotes-table',
  templateUrl: './maturing-quotes-table.component.html',
  styleUrls: ['./maturing-quotes-table.component.scss']
})
export class MaturingQuotesTableComponent implements OnInit, OnChanges {

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
      '#maturingQuotesTable',
      {
        data: self.data,
        columns: [
          { data: 'clientName' },
          { data: 'product' },
          { data: 'currencyPair' },
          { data: 'quoteRequestDate', render: function (data, type, row) { return self.DatatablesService.formatDate(row, 'quoteRequestDate') } },
          { data: 'maturityDate', render: function (data, type, row) { return self.DatatablesService.formatDate(row, 'maturityDate') } },
          { data: 'daysRemaining', className: 'right-align' },
          { data: 'notional', className: "right-align", render: function (data, type, row) { if (type == 'sort' || type == 'type') { return data } return self.DatatablesService.formatAmount(row, 'notional', 'notionalCurrency') } },
          { data: 'clientId', visible: false },
          { data: 'clientMatchCodes', visible: false },
        ],
        createdRow: function (row, data) {
          $('td:eq(0)', row).html(self.DatatablesService.addClientTooltip(data));
        }
      },
      false,
      self.DatatablesService.configureExport([0, 7, 8, 1, 2, 3, 5, 6])
    );

    if (!!this.search) {
      this.table.search(this.search);
      this.table.draw();
    }
  }

}
