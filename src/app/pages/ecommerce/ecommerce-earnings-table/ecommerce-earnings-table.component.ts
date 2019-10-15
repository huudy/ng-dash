import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { DatatablesService } from '../../../services/datatables.service';

declare var $: any;

@Component({
  selector: 'app-ecommerce-earnings-table',
  templateUrl: './ecommerce-earnings-table.component.html',
  styleUrls: ['./ecommerce-earnings-table.component.scss']
})
export class EcommerceEarningsTableComponent implements OnInit, OnChanges {

  @Input() data;
  @Input() search;
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

    let self = this;

    this.table = this.DatatablesService.createDatatable(
      '#ecommerceEarningsTable',
      {
        data: self.data,
        columns: [
          { data: 'clientName' },
          { data: 'earning', className: "right-align", render: function (data, type, row) { if (type == 'sort' || type == 'type') { return data } return self.DatatablesService.formatAmount(row, 'earning', 'earningCurrency') } },
          { data: 'tradedVolume', className: "right-align", render: function (data, type, row) { if (type == 'sort' || type == 'type') { return data } return self.DatatablesService.formatAmount(row, 'tradedVolume', 'volumeCurrency') } },
          { data: 'numberOfTransactions', className: 'right-align' },
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

    if (!!this.search) {
      this.table.search(this.search);
      this.table.draw();
    }
  }

}
