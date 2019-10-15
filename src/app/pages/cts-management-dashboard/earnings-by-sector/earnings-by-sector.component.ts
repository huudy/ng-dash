import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { DatatablesService } from '../../../services/datatables.service';

declare var $: any;

@Component({
  selector: 'app-earnings-by-sector',
  templateUrl: './earnings-by-sector.component.html',
  styleUrls: ['./earnings-by-sector.component.scss']
})
export class EarningsBySectorComponent implements OnInit, OnChanges {

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
      '#tableEarningsSector',
      {
        data: data,
        columns: [
          { data: 'sectorName' },
          { data: 'numberClients', class: "right-align", render: function (data, type, row) { if (type == 'sort' || type == 'type') { return data } return data + ' (' + (row['numberClientsChange'] > 0 ? '+' : '') + row['numberClientsChange'] + ')' } },
          { data: 'medianEarnings', className: "right-align", render: function (data, type, row) { if (type == 'sort' || type == 'type') { return data } return self.DatatablesService.formatAmount(row, 'medianEarnings', 'currency') } },
        ],
        createdRow: function (row, data) {
          
        }
      },
      false,
      self.DatatablesService.configureExport([0, 1, 2])
    );
  }

}
