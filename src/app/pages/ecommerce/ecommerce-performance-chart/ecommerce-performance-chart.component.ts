import { Component, OnInit, OnChanges, AfterViewInit, Input } from '@angular/core';
import * as humanFormat from 'human-format';
import { DatatablesService } from '../../../services/datatables.service';

declare var $: any;

@Component({
  selector: 'app-ecommerce-performance-chart',
  templateUrl: './ecommerce-performance-chart.component.html',
  styleUrls: ['./ecommerce-performance-chart.component.scss']
})
export class EcommercePerformanceChartComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() data;
  @Input() dataLabelConfig;
  @Input() id: string;

  private config;

  constructor(private DatatablesService: DatatablesService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.makeChart();
    setTimeout(() => { this.showChart() });
  }

  ngAfterViewInit() {
    this.showChart();
  }

  makeChart() {

    let styleConfig = {
      type: 'bar',
      options: {
        legend: {
          display: false
        },
        title: {
          display: false
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
            // barPercentage: 1,
            // categoryPercentage: 1,
            ticks: {
              maxRotation: 0,
              autoSkip: true
            },
            scaleLabel: {
              display: true,
              labelString: this.dataLabelConfig['dataXLabel']
            },
            stacked: true
          }],
          yAxes: [{
            gridLines: {
              display: false
            },
            ticks: {
              precision: 0,
              callback: function (value, index, values) {
                return humanFormat(value, { decimals: 1 });
              }
            },
            scaleLabel: {
              display: true,
              labelString: this.dataLabelConfig['dataSetOneYLabel']
            },
            stacked: true,
            id: 'y-axis-1'
          }, {
            ticks: {
              min: 0,
              precision: 0,
              callback: function (value, index, values) {
                return humanFormat(value, { decimals: 1 });
              }
            },
            gridLines: {
              display: false
            },
            scaleLabel: {
              display: true,
              labelString: this.dataLabelConfig['dataSetTwoYLabel']
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
          mode: 'index'
        }
      }
    };

    let data = this.data;
    if (data == null || data.length == 0) {
      let keyOne = this.dataLabelConfig['dataSetOneKey'];
      let keyTwo = this.dataLabelConfig['dataSetOneKey'];
      data = [{ keyOne: [], keyTwo: [] }];
    }

    let dataConfig = {
      data: {
        labels: data.map(x => this.DatatablesService.formatDate(x, this.dataLabelConfig['dataXKey']).substr(0, 7)),
        datasets: [{
          label: this.dataLabelConfig['dataSetOneYLabel'],
          backgroundColor: 'rgba(0, 175, 208, 0.75)',
          borderWidth: 0,
          data: data.map(x => x[this.dataLabelConfig['dataSetOneKey']]),
          fill: false,
          stack: 0,
          yAxisID: 'y-axis-1'
        }, {
          label: this.dataLabelConfig['dataSetTwoYLabel'],
          backgroundColor: 'rgba(159, 202, 120, 0.75)',
          borderWidth: 0,
          data: data.map(x => x[this.dataLabelConfig['dataSetTwoKey']]),
          fill: false,
          stack: 1,
          yAxisID: 'y-axis-2'
        }]
      }
    };

    this.config = $.extend(true, styleConfig, dataConfig);
  }

  showChart() {
    let self = this;
    Chart.helpers.each(Chart.instances, function (instance) {
      if (instance.chart.canvas.id == self.id) {
        instance.chart.destroy();
      }
    });

    let canvas = $('#' + this.id);
    new Chart(
      canvas.get(0).getContext('2d'),
      this.config
    );
  }

}
