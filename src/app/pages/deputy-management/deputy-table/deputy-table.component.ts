import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { DatatablesService } from '../../../services/datatables.service';

declare var $: any;

@Component({
  selector: 'app-deputy-table',
  templateUrl: './deputy-table.component.html',
  styleUrls: ['./deputy-table.component.scss']
})
export class DeputyTableComponent implements OnInit, OnChanges {

  @Input() data;
  @Input() tableId;
  table = null;

  constructor( private DatatablesService: DatatablesService ) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.buildtable();
  }

  buildtable() {
    if (!!this.table) {
      this.table.destroy();
    }

    let self = this;

    this.table = this.DatatablesService.createDatatable(
      self.tableId,
      {
        data: self.data,
        columns: [
          { "data" : "userId" },
          { "data" : "validFrom" },
          { "data" : "validTo" }
        ],
        createdRow: function (row, data) {
          $('td:eq(1)', row).html(self.DatatablesService.formatDate(data, 'validFrom'));
          $('td:eq(2)', row).html(self.DatatablesService.formatDate(data, 'validTo'));          
        }
      }
    );
  }
}
