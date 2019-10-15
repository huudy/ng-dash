import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DatatablesService } from '../../../services/datatables.service';

declare var $: any;

@Component({
  selector: 'app-dericon-table',
  templateUrl: './dericon-table.component.html',
  styleUrls: ['./dericon-table.component.scss']
})
export class DericonTableComponent implements OnInit, OnChanges {

  @Input() data;
  table = null;

  constructor(private DatatablesService: DatatablesService) { }

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
      '#issuancesDericonDetailsTable',
      {
        data: data,
        columns: [
          { data: "paymentCurrency" },
          { data: "issueVolume", className: "right-align" },
          { data: "productType" },
          { data: "productWkn" },
          { data: "underlying" },
          { data: "initialPaymentDate" },
          { data: "secondaryMarketStartDate" },
          { data: "finalPaymentDate" },
          { data: "strikePercent", className: "right-align" }
        ],
        createdRow: function (row, data) {
          $('td:eq(1)', row).html(self.DatatablesService.formatAmount(data, 'issueVolume'));
          $('td:eq(5)', row).html(self.DatatablesService.formatDate(data, 'initialPaymentDate'));
          $('td:eq(6)', row).html(self.DatatablesService.formatDate(data, 'secondaryMarketStartDate'));
          $('td:eq(7)', row).html(self.DatatablesService.formatDate(data, 'finalPaymentDate'));
        }
      }
    );
  }

}
