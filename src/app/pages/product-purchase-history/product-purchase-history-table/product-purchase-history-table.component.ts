import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { DatatablesService } from '../../../services/datatables.service';

declare var $: any;

@Component({
  selector: 'app-product-purchase-history-table',
  templateUrl: './product-purchase-history-table.component.html',
  styleUrls: ['./product-purchase-history-table.component.scss']
})
export class ProductPurchaseHistoryTableComponent implements OnInit, OnChanges {

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
      '#productPurchaseHistoryTable',
      {
        data: data,
        columns: [
          { data: 'productClass' },
          { data: 'clientName' },
          { data: 'totalNotional', className: "right-align", render: function (data, type, row) { if (type == 'sort' || type == 'type') { return data } return self.DatatablesService.formatAmount(row, 'totalNotional', 'totalNotionalCurrency') } },
          { data: 'count', className: "right-align" },
          { data: 'clientId', visible: false },
          { data: 'clientMatchCodes', visible: false },
        ],
        createdRow: function (row, data) {
          $('td:eq(1)', row).html(self.DatatablesService.addClientTooltip(data));
        }
      },
      false,
      self.DatatablesService.configureExport([0, 1, 4, 5, 2, 3])
    );
  }

}
