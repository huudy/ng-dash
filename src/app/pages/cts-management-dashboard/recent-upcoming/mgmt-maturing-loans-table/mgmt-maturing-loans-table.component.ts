import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DatatablesService } from '../../../../services/datatables.service';

declare var $: any;

@Component({
  selector: 'app-mgmt-maturing-loans-table',
  templateUrl: './mgmt-maturing-loans-table.component.html',
  styleUrls: ['./mgmt-maturing-loans-table.component.scss']
})
export class MgmtMaturingLoansTableComponent implements OnInit, OnChanges {

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
      '#recentUpcomingMaturingLoansTable',
      {
        data: data,
        columns: [
          { data: 'clientName' },
          { data: 'loanType' },
          { data: 'maturityDate', render: function (data, type, row) { return self.DatatablesService.formatDate(row, 'maturityDate') } },
          { data: 'originalNominal', className: "right-align", render: function (data, type, row) { if (type == 'sort' || type == 'type') { return data } return self.DatatablesService.formatAmount(row, 'originalNominal', 'originalNominalCurrency') } },
          { data: 'clientId', visible: false },
          { data: 'clientMatchCodes', visible: false }
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
