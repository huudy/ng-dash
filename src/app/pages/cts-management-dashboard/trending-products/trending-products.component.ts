import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { DatatablesService } from '../../../services/datatables.service';

@Component({
  selector: 'app-trending-products',
  templateUrl: './trending-products.component.html',
  styleUrls: ['./trending-products.component.scss']
})
export class TrendingProductsComponent implements OnInit, OnChanges {

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
      '#trendingProducts',
      {
        data: data,
        columns: [
          { data: 'trendScore', defaultContent: '', render: function (data, type, row) { return data > 0 ? '<i class="fas fa-caret-up text-success"></i>' : '<i class="fas fa-caret-down text-danger"></i>' } },
          { data: 'productName' },
          { data: 'currentDeviationFromAverage', className: "right-align", render: function (data, type, row) { if (type == 'sort' || type == 'type') { return data } return (data > 0 ? '+' : '') + data } },
          { data: 'averageNumberTrades', className: "right-align", render: function (data, type, row) { if (type == 'sort' || type == 'type') { return data } return data + ' (&#177;' + Math.round(row['stdDev']) + ')' } },
        ],
        createdRow: function (row, data) {
          
        }
      },
      false,
      self.DatatablesService.configureExport([1, 2, 3])
    );
  }


}
