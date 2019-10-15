import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DatatablesService } from '../../../services/datatables.service';

declare var $:any;

@Component({
  selector: 'app-limit-warning-table',
  templateUrl: './limit-warning-table.component.html',
  styleUrls: ['./limit-warning-table.component.scss']
})
export class LimitWarningTableComponent implements OnInit, OnChanges {

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

    let self = this;

    this.table = this.DatatablesService.createDatatable(
      '#limitWarningTable',
      {
        data: self.data,
        columns: [
          { data: 'clientName' },
          { data: 'limitExposureFraction', className: "right-align", render: function(data, type, row) { return data.toLocaleString('de-DE', {style: 'percent', minimumFractionDigits: 0}); } },
          { data: 'limitUtilizedSince', render: function (data, type, row) { return self.DatatablesService.formatDate(row, 'limitUtilizedSince') } },
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
