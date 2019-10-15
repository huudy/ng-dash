import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DatatablesService } from '../../../services/datatables.service';

declare var $: any;

@Component({
  selector: 'app-active-foreign-current-accounts-table',
  templateUrl: './active-foreign-current-accounts-table.component.html',
  styleUrls: ['./active-foreign-current-accounts-table.component.scss']
})
export class ActiveForeignCurrentAccountsTableComponent implements OnInit, OnChanges {

  @Input() data;
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
      '#activeForeignCurrentAccountsTable',
      {
        data: self.data,
        columns: [
          { data: "clientName" },
          { data: "originalBalance", className: "right-align", render: function (data, type, row) { if (type == 'sort' || type == 'type') { return data } return self.DatatablesService.formatAmount(row, 'originalBalance', 'originalBalanceCurrency') } },
          { data: "balance", className: "right-align", render: function (data, type, row) { if (type == 'sort' || type == 'type') { return data } return self.DatatablesService.formatAmount(row, 'balance', 'balanceCurrency') } },
          { data: "balanceVariability", className: "right-align", render: function (data, type, row) { if (type == 'sort' || type == 'type') { return data } return self.DatatablesService.formatAmount(row, 'balanceVariability', 'balanceCurrency') } },
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
  }
}
