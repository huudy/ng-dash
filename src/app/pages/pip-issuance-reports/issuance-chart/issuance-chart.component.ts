import { Component, OnInit, Input } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-issuance-chart',
  templateUrl: './issuance-chart.component.html',
  styleUrls: ['./issuance-chart.component.scss']
})
export class IssuanceChartComponent implements OnInit {

  @Input() data;
  @Input() countKey: string;
  @Input() id: string;

  config;

  constructor() { }

  ngOnInit() {
    this.makeChart();
  }

  ngAfterViewInit() {
    this.showChart();
  }

  makeChart() {

    let labels = [];
    let values = [];
    let data = this.data.slice(0, 15);
    for (var i = 0; i < data.length; i++) {
      labels.push(data[i][this.countKey]);
      values.push(data[i]['count']);
    }

    let styleConfig = {
      type: 'horizontalBar',
      options: {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        chartArea: {
          backgroundColor: '#f7f7f7'
        },
        scales: {
          xAxes: [{
            gridLines: { display: true, color: '#fff', lineWidth: 2 },
            ticks: { beginAtZero: true }
          }],
          yAxes: [{
            gridLines: { display: false },
          }]
        },
        tooltips: {
          cornerRadius: 1
        }
      }
    };

    let dataConfig = {
      data: {
        labels: labels,
        datasets: [{
          label: "number of issuances",
          data: values,
          backgroundColor: 'rgba(0, 175, 208, 0.75)',
          borderWidth: 0
        }]
      }
    };

    this.config = $.extend(true, styleConfig, dataConfig);
  }

  showChart() {
    let canvas = $('#' + this.id);
    new Chart(
      canvas.get(0).getContext('2d'),
      this.config
    );
  }
}