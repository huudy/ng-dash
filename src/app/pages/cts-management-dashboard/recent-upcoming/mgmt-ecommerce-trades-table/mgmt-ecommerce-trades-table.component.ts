import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DatatablesService } from '../../../../services/datatables.service';

declare var $: any;

@Component({
  selector: 'app-mgmt-ecommerce-trades-table',
  templateUrl: './mgmt-ecommerce-trades-table.component.html',
  styleUrls: ['./mgmt-ecommerce-trades-table.component.scss']
})
export class MgmtEcommerceTradesTableComponent implements OnInit, OnChanges {

  @Input() data;
  
  table = null;

  constructor( private DatatablesService: DatatablesService ) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.buildTable();
  }

  buildTable() {
    if (!!this.table) {
      this.table.destroy();
    }

    let data = this.data;
    let self = this;

    this.table = this.DatatablesService.createDatatable(
      '#recentUpcomingEcommTradesTable',
      {
        data: data,
        columns: [
          { data: 'clientName' },
          { data: 'count', class: 'right-align' },
          { data: 'notional', className: "right-align", render: function (data, type, row) { if (type == 'sort' || type == 'type') { return data } return self.DatatablesService.formatAmount(row, 'notional', 'notionalCurrency') } },
          { data: 'clientId', visible: false },
          { data: 'clientMatchCodes', visible: false }
        ],
        createdRow: function (row, data) {
          $('td:eq(0)', row).html(self.DatatablesService.addClientTooltip(data));
        }
      },
      false,
      self.DatatablesService.configureExport([0, 3, 4, 1, 2])
    );
  }


}
