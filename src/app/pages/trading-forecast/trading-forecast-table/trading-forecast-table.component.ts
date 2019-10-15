import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DatatablesService } from '../../../services/datatables.service';

declare var $: any;

@Component({
  selector: 'app-trading-forecast-table',
  templateUrl: './trading-forecast-table.component.html',
  styleUrls: ['./trading-forecast-table.component.scss']
})
export class TradingForecastTableComponent implements OnInit, OnChanges {

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
      '#tradingForecastTable',
      {
        data: self.data,
        columns: [
          { data: 'clientName' },
          { data: 'product' },
          { data: 'currencyPair' },
          { data: 'tradeProbability' },
          { data: 'clientId', visible: false },
          { data: 'clientMatchCodes', visible: false },
        ],
        columnDefs: [{"width": "15%", "targets": 3}],
        aaSorting: [[3, 'desc']],
        createdRow: function (row, data) {
          $('td:eq(0)', row).html(self.DatatablesService.addClientTooltip(data));

          let badge = self.buildForecastBadge(data['tradeProbability']);
          let badgeTooltip = 'predicted probability over the next seven days: ' + data['tradeProbability'].toLocaleString('de', {style: 'percent'});
          $('td:eq(3)', row).html(self.DatatablesService.addTooltip(badge, badgeTooltip));
        }
      },
      false,
      self.DatatablesService.configureExport([0, 4, 5, 1, 2, 3])
    );

    if (!!this.search) {
      this.table.search(this.search);
      this.table.draw();
    }
  };

  buildForecastBadge(probability) {
    let indicatorText = 'very high';
    let indicatorClass = 'btn-success';
    let indicatorColor = '#4CC421';
    let setColor = false;


    if (probability < 0.85) {
      indicatorText = 'high';
      setColor = true;
    }
    if (probability < 0.75) {
      indicatorText = 'moderate';
      indicatorClass = 'btn-warning';
      indicatorColor = '#B0E116';
      setColor = true;
    }
    if (probability < 0.4) {
      indicatorText = 'fair';
      setColor = false;
    }

    return (
      "<button class='btn btn-sm " + indicatorClass + " w-100' " +
      (setColor === true ? "style='background-color: " + indicatorColor + "; border-color: " + indicatorColor + ";' " : '') +
      "disabled>" + indicatorText + "<\/button>"
    )
  }

}
