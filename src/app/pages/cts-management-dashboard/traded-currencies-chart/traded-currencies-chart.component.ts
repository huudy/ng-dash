import { Component, OnInit, OnChanges, Input } from '@angular/core';
import * as humanFormat from 'human-format';

declare var $: any;

@Component({
  selector: 'app-traded-currencies-chart',
  templateUrl: './traded-currencies-chart.component.html',
  styleUrls: ['./traded-currencies-chart.component.scss']
})
export class TradedCurrenciesChartComponent implements OnInit, OnChanges {

  @Input() data;

  objectKeys = Object.keys;
  currency: string = 'USD';

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.data = JSON.parse(this.data);
    this.makeTopologyChart();
    this.modifyChart();
  }

  makeTopologyChart() {
    let styleConfig = {
      type: 'bar',
      options: {
        legend: {
          display: true,
          labels: {
            usePointStyle: true
          }
        },
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          xAxes: [{
            gridLines: {
              display: true,
              color: '#fff',
              lineWidth: 2
            },
            ticks: {
              maxRotation: 0,
              autoSkip: true,
              maxTicksLimit: 24
            }
          }],
          yAxes: [{
            ticks: {
              // min: 0,
              callback: function (value, index, values) {
                return humanFormat(value, {
                  decimals: 1
                });
              }
            },
            gridLines: {
              display: false
            },
            scaleLabel: {
              display: true,
              labelString: 'volume (EUR)'
            },
            position: 'left',
            id: 'y-axis-1'
          }],
        },
        chartArea: {
          backgroundColor: '#f7f7f7'
        },
        tooltips: {
          cornerRadius: 1,
          enabled: true,
          mode: 'index',
          callbacks: {
            label: function (tooltipItem, data) {
              return 'volume ' + data.datasets[tooltipItem.datasetIndex].label + ': ' + humanFormat(tooltipItem.yLabel, {
                unit: '€',
                decimals: 1
              });
            }
          }
        },
        hover: {
          mode: 'index',
          intersect: false
        },
        stacked: false
      }
    };

    let data = this.data;
    if (data == null || data.length == 0) {
      data = { USD: { date: [] } };
    }


    let dataConfig = {
      data: {
        raw: data,
        labels: data['USD']["date"],
        datasets: [{
          label: 'buy',
          backgroundColor: 'rgba(0, 175, 208, 0.75)',
          borderColor: 'rgba(0, 175, 208, 0.75)',
          borderWidth: 0,
          pointRadius: 0,
          // tension: 0,
          fill: true,
          data: [],
          yAxisID: 'y-axis-1'
        }, {
          label: 'sell',
          backgroundColor: 'rgba(191, 235, 243, 0.75)',
          borderColor: 'rgba(191, 235, 243, 0.75)',
          borderWidth: 0,
          pointRadius: 0,
          // tension: 0,
          fill: true,
          data: [],
          yAxisID: 'y-axis-1'
        }]
      }
    };

    let config = $.extend(true, styleConfig, dataConfig);
    let canvas = $('#cts_mgmt_trade_currencies_graph');
    new Chart(
      canvas.get(0).getContext('2d'),
      config
    );
  }

  modifyChart(currency?: string) {
    if (!this.currency) { return }
    if (!!currency) { this.currency = currency; }
    
    let chartCurrVol;

    Chart.helpers.each(Chart.instances, function (instance) {
      if (instance.chart.canvas.id == 'cts_mgmt_trade_currencies_graph') {
        chartCurrVol = instance.chart;
      }
    });

    if (!!chartCurrVol) {
      chartCurrVol.data.datasets[0].data = chartCurrVol.data.raw[this.currency]['nominal buy'];
      chartCurrVol.data.datasets[1].data = chartCurrVol.data.raw[this.currency]['nominal sell'];
      chartCurrVol.update();
    }
  }

}
