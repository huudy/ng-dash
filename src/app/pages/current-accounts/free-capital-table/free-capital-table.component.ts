import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DatatablesService } from '../../../services/datatables.service';

declare var $: any;

@Component({
  selector: 'app-free-capital-table',
  templateUrl: './free-capital-table.component.html',
  styleUrls: ['./free-capital-table.component.scss']
})
export class FreeCapitalTableComponent implements OnInit, OnChanges {

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
      '#freeCapitalTable',
      {
        data: self.data,
        columns: [
          { data: "clientName" },
          { data: "netBalance", className: "right-align", render: function (data, type, row) { if (type == 'sort' || type == 'type') { return data } return self.DatatablesService.formatAmount(row, 'netBalance', 'netBalanceCurrency') } },
          { data: "allCurrencies" },
          { data: 'clientId', visible: false },
          { data: 'clientMatchCodes', visible: false },
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
