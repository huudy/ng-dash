import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { DatatablesService } from '../../../services/datatables.service';

import * as humanFormat from 'human-format';

declare var $: any;

@Component({
  selector: 'app-markup-statistics',
  templateUrl: './markup-statistics.component.html',
  styleUrls: ['./markup-statistics.component.scss']
})
export class MarkupStatisticsComponent implements OnInit, OnChanges {

  @Input() data;
  table = null;

  constructor(private DatatablesService: DatatablesService) { }

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
      '#markupStatisticsTable',
      {
        data: self.data,
        columns: [
          { data: "currencyPair" },
          { data: "markupAsFraction", className: "right-align" },
          { data: 'deltaMarkupAsFraction', className: "right-align" },
          { data: 'markupAsPips', className: "right-align", visible: false},
          { data: 'deltaMarkupAsPips', className: "right-align", visible: false},
        ],
        createdRow: function (row, data) {
          let absoluteMarkup = humanFormat(
            data['markupAsFraction'] * Math.pow(10, 4),
            {
              decimals: 0,
              prefix: '',
              unit: 'bps'
            }
          ) + (data['markupAsPips'] != null ? ' | ' + humanFormat(
            data['markupAsPips'],
            {
              decimals: 1,
              prefix: '',
              unit: 'pips'
            }
          ) : '');
          $('td:eq(1)', row).html(absoluteMarkup);

          let relativeMarkup = (data['deltaMarkupAsFraction'] > 0 ? '+' : '') +
            humanFormat(
              data['deltaMarkupAsFraction'] * 100,
              {
                decimals: 0,
                prefix: '',
                unit: '%'
              }
            ) + (data['deltaMarkupAsPips'] != null ? ' | ' + humanFormat(
              data['deltaMarkupAsPips'],
              {
                decimals: 1,
                prefix: '',
                unit: 'pips'
              }
            ) : '');
          $('td:eq(2)', row).html(relativeMarkup);
        }
      },
      false,
      self.DatatablesService.configureExport([0, 1, 3, 2, 4])
    );

  }
  
}
