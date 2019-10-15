import { Component, OnInit, Input } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-share-of-wallet-chart',
  templateUrl: './share-of-wallet-chart.component.html',
  styleUrls: ['./share-of-wallet-chart.component.scss']
})
export class ShareOfWalletChartComponent implements OnInit {

  @Input() id;
  @Input() data;
  @Input() name;
  config;

  constructor() { }

  ngOnInit() {
    this.makeChart();
  }

  ngAfterViewInit() {
    this.showChart();
  }

  makeChart() {
    let data = this.data;
    if (data == null || data.length == 0) {
      data = { confidence: [], expected: [] };
    }

    let styleConfig = {
      type: 'doughnut',
      options: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          deferred: {
            yOffset: '50%',
            delay: 200
          }
        },
        title: {
          display: true,
          text: this.name
        },
        tooltips: {
          enabled: false
        },
        legend: {
          display: false
        }
      }
    };

    let dataConfig = {
      data: {
        labels: ['our share', 'other banks'],
        datasets: [{
          label: ' share of wallet',
          data: data['confidence'],
          backgroundColor: ['rgba(0, 0, 0, 0)', '#B2B2B2', 'rgba(0, 0, 0, 0)'],
          borderWidth: 3,
          hoverBorderColor: '#fff'
        }, {
          label: ' share of wallet',
          data: data['expected'],
          backgroundColor: ['#9FCA78', '#EA5C4D'],
          borderWidth: 3,
          hoverBorderColor: '#fff'
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
