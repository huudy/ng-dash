import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { DatatablesService } from '../../../services/datatables.service';

import * as humanFormat from 'human-format';

declare var $: any;

@Component({
  selector: 'app-commodity-exposure',
  templateUrl: './commodity-exposure.component.html',
  styleUrls: ['./commodity-exposure.component.scss']
})
export class CommodityExposureComponent implements OnInit, OnChanges {

  @Input() data;
  table = null;

  constructor(
    private DatatablesService: DatatablesService
  ) { }

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
      '#commodityTransactionsTable',
      {
        data: self.data,
        columns: [
          { data: "underlying" },
          { data: "totalNotional", className: "right-align", render: function (data, type, row) { if (type == 'sort' || type == 'type') { return data } return self.DatatablesService.formatAmount(row, 'totalNotional', 'totalNotionalCurrency') } },
          { data: "outstandingNotional", className: "right-align", render: function (data, type, row) { if (type == 'sort' || type == 'type') { return data } return self.DatatablesService.formatAmount(row, 'outstandingNotional', 'totalNotionalCurrency') } },
          { data: "count", className: "right-align" },
          { data: null, defaultContent: '' }
        ],
        createdRow: function (row, data) {
          let allGraphData = JSON.parse(data['data']);
          for (let key in allGraphData) {
            let content = $(self.buildBadge(self.DatatablesService.addTooltip, 'by ' + key, '#commodityTransactionsTable'))
            content.data('visualizationData', allGraphData[key]);

            let type = '';
            switch (key) {
              case 'notional':
                type = 'number-amount'
                break;
              case 'trade date':
                type = 'amount-date'
                break;
              case 'maturity date':
                type = 'amount-date'
                break;
              case 'duration':
                type = 'number-months'
                break;
            }
            content.data('type', type);
            $('td:eq(4)', row).append(content);
          }

        }
      },
      self.drawGraph,
      self.DatatablesService.configureExport([0, 1, 2, 3])
    );
  }

  readableCurrencyPair(currencyPair: string, boughtSold: string) {
    if (boughtSold.toLowerCase() == 'bought') {
      return 'sell ' + currencyPair.substr(0, 3) + ' - buy ' + currencyPair.substr(-3)
    } else if (boughtSold.toLocaleLowerCase() == 'sold') {
      return 'buy ' + currencyPair.substr(0, 3) + ' - sell ' + currencyPair.substr(-3)
    } else {
      return currencyPair
    }
  }

  public buildBadge(addTooltip, text: string, reference: string) {
    let badgeTemplate = `<span class='badge shadow-sm badge-info cursor-default font-weight-light mr-1'>{{text}}</span>`;
    let tooltipTemplate = `
      <div class="tooltip" role="tooltip">
        <div class="arrow"></div>
        <div class="badge badge-pill text-white bg-dark p-1">
          <i class="fas fa-expand-arrows-alt"></i>
        </div>
        <div class="tooltip-inner p-1 mw-100" style="width: 380px;"></div>
      </div>`;
    return addTooltip(badgeTemplate.replace('{{text}}', text), `chart`, 'left', reference, tooltipTemplate);
  }

  public drawGraph(table) {
    $('[data-toggle="tooltip"][data-template]', table).on('inserted.bs.tooltip', function (event) {

      let canvasTemplate = `<canvas style="background: #fff; border-radius: 2px; width: 372px; height: 142px;"></canvas>`;

      let graphData = $(event.target).data('visualizationData');
      let graphType = $(event.target).data('type');
      let tooltipReference = $(event.target).attr('aria-describedby');
      let tooltip = $('#' + tooltipReference);
      $('.badge', tooltip).attr('onclick', 'toggleTooltipSize(this)');
      let tooltipInner = $('.tooltip-inner', tooltip);
      tooltipInner.empty();
      tooltipInner.append(canvasTemplate);
      let canvas = $('canvas', tooltipInner);

      // graph styling
      let commonStyleConfig = {
        type: 'bar',
        options: {
          legend: { display: true, labels: { boxWidth: 12 } },
          maintainAspectRatio: false,
          responsive: true,
          scales: {
            xAxes: [{
              gridLines: { display: true, color: '#fff', lineWidth: 2 },
              barPercentage: 1.0,
              categoryPercentage: 1.0,
              ticks: {
                maxRotation: 0,
                autoSkip: true,
                maxTicksLimit: 6
              },
              stacked: true,
            }],
            yAxes: [{
              // type: 'logarithmic',
              gridLines: { display: false },
              stacked: false,
              display: true
            }]
          },
          chartArea: {
            backgroundColor: '#f7f7f7'
          },
          tooltips: {
            cornerRadius: 1,
            enabled: true
          }
        }
      };

      let commonDataConfig = {
        data: {
          labels: graphData['labels'],
          datasets: [
            {
              backgroundColor: 'rgba(0, 175, 208, 0.75)',
              borderWidth: 0,
              data: graphData['data']
            }
          ]
        }
      };

      let specificStyleConfig = {};
      let specificDataConfig = {};

      if (graphType == 'number-amount') {
        specificStyleConfig = {
          options: {
            scales: { xAxes: [{ ticks: { callback: function (value, index, values) { return humanFormat(value, { unit: '€', decimals: 1 }); } } }] },
            tooltips: { callbacks: { label: function (tooltipItem, data) { return data.datasets[tooltipItem.datasetIndex].label + ': ' + tooltipItem.yLabel.toLocaleString() } } }
          }
        };
        specificDataConfig = {
          data: { datasets: [{ label: 'number of trades' }] }
        };
      } else if (graphType == 'number-months') {
        specificStyleConfig = {
          options: {
            scales: { xAxes: [{ ticks: { callback: function (value, index, values) { return (value !== 1 ? value + ' months' : value + ' month'); } } }] },
            tooltips: { callbacks: { label: function (tooltipItem, data) { return data.datasets[tooltipItem.datasetIndex].label + ': ' + tooltipItem.yLabel.toLocaleString() } } }
          }
        };
        specificDataConfig = {
          data: { datasets: [{ label: 'number of trades' }] }
        };
      } else if (graphType == 'amount-date') {
        specificStyleConfig = {
          options: {
            scales: { yAxes: [{ ticks: { callback: function (value, index, values) { if (Math.floor(value) === value) { return humanFormat(value, { unit: '€', decimals: 1 }); } } } }] },
            tooltips: { callbacks: { label: function (tooltipItem, data) { return data.datasets[tooltipItem.datasetIndex].label + ': ' + humanFormat(tooltipItem.yLabel, { unit: '€', decimals: 0 }) } } }
          }
        };
        specificDataConfig = {
          data: { datasets: [{ label: 'total volume' }] }
        };
      };

      let config = $.extend(true, commonStyleConfig, specificStyleConfig, commonDataConfig, specificDataConfig);


      new Chart(
        canvas.get(0).getContext('2d'),
        config
      );

    });
  }

}
