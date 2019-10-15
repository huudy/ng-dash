import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { DatatablesService } from '../../../services/datatables.service';

declare var $:any;

@Component({
  selector: 'app-client-earnings-table',
  templateUrl: './client-earnings-table.component.html',
  styleUrls: ['./client-earnings-table.component.scss']
})
export class ClientEarningsTableComponent implements OnInit, OnChanges {

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
      '#clientEarningsTable',
      {
        data: self.data,
        columns: [
          { data: 'clientName' },
          { data: 'earnings', className: "right-align", render: function (data, type, row) { if (type == 'sort' || type == 'type') { return data } return self.DatatablesService.formatAmount(row, 'earnings', 'earningsCurrency') } },
          { data: 'earningsTrend', className: "right-align", render: function (data, type, row) { if (type == 'sort' || type == 'type') { return data } return self.DatatablesService.formatAmount(row, 'earningsTrend', 'earningsCurrency') } },
          { data: 'earningsYearToDate', className: "right-align", render: function (data, type, row) { if (type == 'sort' || type == 'type') { return data } return self.DatatablesService.formatAmount(row, 'earningsYearToDate', 'earningsCurrency') } },
          { data: 'earningsYearToDatePrevious', className: "right-align", render: function (data, type, row) { if (type == 'sort' || type == 'type') { return data } return self.DatatablesService.formatAmount(row, 'earningsYearToDatePrevious', 'earningsCurrency') } },
          { data: 'clientId', visible: false },
          { data: 'clientMatchCodes', visible: false }
        ],
        order: [[1, 'desc']],
        createdRow: function (row, data) {
          $('td:eq(0)', row).html(self.DatatablesService.addClientTooltip(data));

          if (data['earningsTrend'] >0) {
            $('td:eq(2)', row).addClass('text-success');
          } else {
            $('td:eq(2)', row).addClass('text-danger');
          }
        }
      },
      false,
      self.DatatablesService.configureExport([0, 5, 6, 1, 2, 3, 4])
    );
    
  }
}