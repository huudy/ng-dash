import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DatatablesService } from '../../../services/datatables.service';

declare var $:any;

@Component({
  selector: 'app-letters-of-credit-table',
  templateUrl: './letters-of-credit-table.component.html',
  styleUrls: ['./letters-of-credit-table.component.css']
})
export class LettersOfCreditTableComponent implements OnInit, OnChanges {

  @Input() data;
  @Input() search;

  table = null;

  constructor( private DatatablesService: DatatablesService ) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.buildtable();
  }

  buildBadge(data, addTooltip) {
    let badgeTemplate = `<span class='badge badge-pill badge-info cursor-default'>i</span>`;
    return addTooltip(badgeTemplate, data['locType']);
  }

  buildtable() {
    if (!!this.table) {
      this.table.destroy();
    }

    let self = this;

    this.table = this.DatatablesService.createDatatable(
      '#letterOfCreditTable',
      {
        data: self.data,
        columns: [
          { data: "clientName" },
          { data: "locType" },
          { data: 'maturityDate', render: function (data, type, row) { return self.DatatablesService.formatDate(row, 'maturityDate') } },
          { data: 'nominal', className: "right-align", render: function (data, type, row) { if (type == 'sort' || type == 'type') { return data } return self.DatatablesService.formatAmount(row, 'nominal', 'nominalCurrency') } },
          { data: "originalCurrency" },
          { data: 'clientId', visible: false },
          { data: 'clientMatchCodes', visible: false },
        ],
        createdRow: function (row, data) {
          $('td:eq(0)', row).html(self.DatatablesService.addClientTooltip(data));
          $('td:eq(1)', row).html(self.buildBadge(data, self.DatatablesService.addTooltip));
        }
      },
      false,
      self.DatatablesService.configureExport([0, 5, 6, 1, 2, 3, 4])
    );

    if (!!this.search) {
      this.table.search(this.search);
      this.table.draw();
    }
  }

}
