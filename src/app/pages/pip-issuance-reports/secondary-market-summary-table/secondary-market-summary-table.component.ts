import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { DatatablesService } from '../../../services/datatables.service';

declare var $: any;

@Component({
  selector: 'app-secondary-market-summary-table',
  templateUrl: './secondary-market-summary-table.component.html',
  styleUrls: ['./secondary-market-summary-table.component.scss']
})
export class SecondaryMarketSummaryTableComponent implements OnInit, OnChanges {

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
      '#issuancesSecondaryMarketSummaryTable',
      {
        data: data,
        columns: [
          { data: "productType" },
          { data: "noSeriesChildren", className: "right-align" },
          { data: "assetClass" },
          { data: "initialPaymentDate" },
          { data: "secondaryMarketStartDate" },
          { data: "countryCode", visible: false },
          { data: "responsibleSales", visible: false }
        ],
        createdRow: function (row, data) {
          $('td:eq(3)', row).html(self.DatatablesService.formatDate(data, 'initialPaymentDate'));
          $('td:eq(4)', row).html(self.DatatablesService.formatDate(data, 'secondaryMarketStartDate'));
        }
      }
    );
  }

}
