import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DatatablesService } from '../../../services/datatables.service';

declare var $: any;

@Component({
  selector: 'app-hedging-opportunities-table',
  templateUrl: './hedging-opportunities-table.component.html',
  styleUrls: ['./hedging-opportunities-table.component.scss']
})
export class HedgingOpportunitiesTableComponent implements OnInit, OnChanges {

  @Input() data;
  @Input() search;
  table = null;

  constructor( private DatatablesService: DatatablesService ) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.buildtable();
  }

  buildtable() {
    if (!!this.table) {
      this.table.destroy();
    }

    let self = this;

    this.table = this.DatatablesService.createDatatable(
      '#hedgingOpportunititesTable',
      {
        data: self.data,
        columns: [
          { data: "clientName" },
          { data: "currencyPair" },
          { data: "count", className: "right-align" },
          { data: "totalNotional", className: "right-align", render: function (data, type, row) { return self.DatatablesService.formatAmount(row, 'totalNotional', 'totalNotionalCurrency') } },
          { data: 'clientId', visible: false },
          { data: 'clientMatchCodes', visible: false },
        ],
        createdRow: function (row, data) {
          $('td:eq(0)', row).html(self.DatatablesService.addClientTooltip(data));
        }
      },
      false,
      self.DatatablesService.configureExport([0, 4, 5, 1, 2, 3])
    );

    if (!!this.search) {
      this.table.search(this.search);
      this.table.draw();
    }
  }

}
