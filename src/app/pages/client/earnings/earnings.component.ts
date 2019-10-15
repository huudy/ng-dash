import { Component, OnInit, Input } from '@angular/core';
import * as humanFormat from 'human-format';

declare var $: any;

@Component({
  selector: 'app-earnings',
  templateUrl: './earnings.component.html',
  styleUrls: ['./earnings.component.scss']
})
export class EarningsComponent implements OnInit {

  @Input() data;

  constructor() { }

  ngOnInit() {
    this.data = JSON.parse(this.data);
    this.buildComponent();
  }

  buildComponent() {
    this.makeQuarterlyEarnignsGraph();
    this.makeYearlyEarningsGraph();
  }

  makeQuarterlyEarnignsGraph() {

    let styleConfig = {
      type: 'bar',
      options: {
        legend: {
          display: true,
          labels: {
            boxWidth: 12,
            filter: function (item, chart) {
              return item.datasetIndex === 3 ? null : item;
            }
          }
        },
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          xAxes: [{
            gridLines: {
              display: false
            }
          }],
          yAxes: [{
            gridLines: {
              display: true,
              color: '#f7f7f7',
              lineWidth: 1,
              drawBorder: false
            },
            ticks: {
              suggestedMin: 0,
              callback: function (value, index, values) {
                return humanFormat(value, {
                  unit: '€'
                });
              }
            },
            scaleLabel: {
              display: true,
              labelString: 'quarterly earnings'
            }
          }]
        },
        tooltips: {
          cornerRadius: 1,
          callbacks: {
            label: function (tooltipItem, data) {
              return data.datasets[tooltipItem.datasetIndex].label + ': ' + tooltipItem.yLabel.toLocaleString() + ' €';
            }
          }
        },
        chartArea: {
          backgroundColor: '#f7f7f7'
        }
      }
    };

    let data = this.data;
    if (data == null || data.length == 0) {
      data = { 'trade date': [], 'single': [], 'q6': [], 'avg': [], 'q1': [] };
    } 

    let dataConfig = {
      data: {
        labels: data['trade date'],
        datasets: [{
          type: 'line',
          label: 'earnings',
          backgroundColor: '#fff',
          borderColor: '#F58523',
          borderWidth: 3,
          pointRadius: 4,
          lineTension: 0,
          data: data['single'],
          fill: false
        }, {
          type: 'line',
          label: 'earnings (moving average)',
          backgroundColor: '#fff',
          borderColor: '#F58523',
          borderWidth: 2,
          pointRadius: 0,
          lineTension: 0,
          borderDash: [5, 5],
          data: data['avg'],
          fill: false
        }, {
          type: 'line',
          label: 'average earnings with client in peer group',
          backgroundColor: 'rgba(0, 175, 208, 0.5)',
          pointRadius: 0,
          borderWidth: 1,
          data: data['q6'].slice(0, -1),
          fill: 3
        }, {
          type: 'line',
          label: 'average earnings with client in peer group',
          backgroundColor: 'rgba(0, 175, 208, 0.5)',
          pointRadius: 0,
          borderWidth: 1,
          data: data['q1'].slice(0, -1),
          fill: false
        }]
      }
    };

    let config = $.extend(true, styleConfig, dataConfig);
    let canvas = $('#earningsQuarterly');
    new Chart(
      canvas.get(0).getContext('2d'),
      config
    );
  }

  makeYearlyEarningsGraph() {
    let styleConfig = {
      type: 'bar',
      options: {
        legend: {
          display: false
        },
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          xAxes: [{
            gridLines: {
              display: false
            }
          }],
          yAxes: [{
            gridLines: {
              display: true,
              color: '#f7f7f7',
              lineWidth: 1,
              drawBorder: false
            },
            ticks: {
              suggestedMin: 0,
              callback: function (value, index, values) {
                return humanFormat(value, {
                  unit: '€'
                });
              }
            },
            scaleLabel: {
              display: true,
              labelString: 'cummulative earnings'
            },
            beforeBuildTicks: function (scale) {
              scale.max = scale.max * 1.2;
            }
          }]
        },
        tooltips: {
          cornerRadius: 1,
          callbacks: {
            label: function (tooltipItem, data) {
              return data.datasets[tooltipItem.datasetIndex].label + ': ' + tooltipItem.yLabel.toLocaleString() + ' €';
            }
          }
        },
        drawDataLabels: true,
        chartArea: {
          backgroundColor: '#f7f7f7'
        }
      }
    };

    let data = this.data;
    if (data == null || data.length == 0) {
      data = { 'trade date': [], 'yearly': [] };
    } 

    let dataConfig = {
      data: {
        labels: this.data['trade date'],
        datasets: [{
          label: 'yearly cummulative earnings',
          backgroundColor: ['#E5EFF2', '#C0E4ED', '#75D1F3', '#00AFD0', '#E5EFF2', '#C0E4ED', '#75D1F3', '#00AFD0', '#E5EFF2', '#C0E4ED', '#75D1F3', '#00AFD0'].slice(parseInt(this.data['trade date'][0].substr(1, 1)) - 1),
          borderWidth: 0,
          data: this.data['yearly'],
          fill: false
        }]
      }
    };

    let config = $.extend(true, styleConfig, dataConfig);
    let canvas = $('#earningsYearly');
    new Chart(
      canvas.get(0).getContext('2d'),
      config
    );
  }
}
