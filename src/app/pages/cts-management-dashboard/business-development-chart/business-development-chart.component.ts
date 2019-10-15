import { Component, OnInit, OnChanges, Input } from '@angular/core';
import * as humanFormat from 'human-format';

declare var $: any;

@Component({
  selector: 'app-business-development-chart',
  templateUrl: './business-development-chart.component.html',
  styleUrls: ['./business-development-chart.component.scss']
})
export class BusinessDevelopmentChartComponent implements OnInit, OnChanges {

  @Input() data;
  assetClass: string = 'ALL';

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges() {
    this.data = JSON.parse(this.data);
    this.makeTopologyChart();
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
              maxTicksLimit: 24,
            }
          }],
          yAxes: [{
            ticks: {
              min: 0,
              callback: function (value, index, values) {
                return humanFormat(value, {
                  decimals: 1
                });
              }
            },
            type: 'linear',
            gridLines: {
              display: false
            },
            scaleLabel: {
              display: true,
              labelString: 'earnings (EUR)'
            },
            position: 'left',
            id: 'y-axis-1'
          }, {
            ticks: { min: 0 },
            gridLines: {
              display: false
            },
            scaleLabel: {
              display: true,
              labelString: 'no. trades'
            },
            position: 'right',
            id: 'y-axis-2'
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
              if (tooltipItem.datasetIndex == 0) {
                return data.datasets[tooltipItem.datasetIndex].label + ': ' + humanFormat(tooltipItem.yLabel, {
                  unit: '€',
                  decimals: 1
                });
              } else {
                return data.datasets[tooltipItem.datasetIndex].label + ': ' + tooltipItem.yLabel;
              }
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
      data = { ALL: { date: [], sum: [], count: [] } };
    }

    let dataConfig = {
      data: {
        raw: data,
        labels: data['ALL']['date'],
        datasets: [{
          label: 'earnings',
          backgroundColor: 'rgba(0, 175, 208, 0.75)',
          borderColor: 'rgba(0, 175, 208, 0.75)',
          borderWidth: 3,
          pointRadius: 0,
          fill: false,
          // tension: 0,
          data: data['ALL']['sum'],
          yAxisID: 'y-axis-1'
        }, {
          label: 'number of trades',
          backgroundColor: 'rgba(191, 235, 243, 0.75)',
          borderColor: 'rgba(191, 235, 243, 0.75)',
          borderWidth: 3,
          pointRadius: 0,
          fill: false,
          // tension: 0,
          data: data['ALL']['count'],
          yAxisID: 'y-axis-2'
        }]
      }
    };

    let config = $.extend(true, styleConfig, dataConfig);
    let canvas = $('#cts_mgmt_business_development');
    new Chart(
      canvas.get(0).getContext('2d'),
      config
    );
  }

  updateChart(assetClass: string) {
    if (!this.assetClass) { return }
    if (!!assetClass) { this.assetClass = assetClass; }

    let chartBizDev;

    Chart.helpers.each(Chart.instances, function (instance) {
      if (instance.chart.canvas.id == 'cts_mgmt_business_development') {
        chartBizDev = instance.chart;
      }
    });

    if (!!chartBizDev) {
      chartBizDev.data.datasets[0].data = chartBizDev.data.raw[this.assetClass]['sum'];
      chartBizDev.data.datasets[1].data = chartBizDev.data.raw[this.assetClass]['count'];
      chartBizDev.update();
    }
  }

}
