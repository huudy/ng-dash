import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { DatatablesService } from '../../../services/datatables.service';

declare var $: any;

@Component({
  selector: 'app-last-trade-table',
  templateUrl: './last-trade-table.component.html',
  styleUrls: ['./last-trade-table.component.scss']
})
export class LastTradeTableComponent implements OnInit, OnChanges {

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
      '#lastTradeTable',
      {
        data: self.data,
        columns: [
          { data: "clientName" },
          { data: "lastTradeDate", render: function (data, type, row) { return self.DatatablesService.formatDate(row, 'lastTradeDate') } },
          { data: "clientId", visible: false },
          { data: "clientMatchCodes", visible: false }
        ],
        order: [[1, 'asc']],
        createdRow: function (row, data) {
          $('td:eq(0)', row).html(self.DatatablesService.addClientTooltip(data));
        }
      },
      false,
      self.DatatablesService.configureExport([0, 2, 3, 1])
    );
  }

}
