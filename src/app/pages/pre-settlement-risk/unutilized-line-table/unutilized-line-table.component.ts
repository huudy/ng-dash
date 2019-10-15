import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { DatatablesService } from '../../../services/datatables.service';

declare var $:any;

@Component({
  selector: 'app-unutilized-line-table',
  templateUrl: './unutilized-line-table.component.html',
  styleUrls: ['./unutilized-line-table.component.scss']
})
export class UnutilizedLineTableComponent implements OnInit, OnChanges {

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
      '#lineUnutilizedTable',
      {
        data: data,
        columns: [
          { data: 'clientName' },
          { data: 'limitUnutilizedSince', render: function (data, type, row) { return self.DatatablesService.formatDate(row, 'limitUnutilizedSince') } },
          { data: 'clientId', visible: false },
          { data: 'clientMatchCodes', visible: false },
        ],
        createdRow: function (row, data) {
          $('td:eq(0)', row).html(self.DatatablesService.addClientTooltip(data));
        }
      },
      false,
      self.DatatablesService.configureExport([0, 2, 3, 1])
    );
  }

}
