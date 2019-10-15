import { Component, OnInit, Input } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-trading-channel',
  templateUrl: './trading-channel.component.html',
  styleUrls: ['./trading-channel.component.scss']
})
export class TradingChannelComponent implements OnInit {

  @Input() data;
  table = null;

  constructor( ) { }

  ngOnInit() {
    this.data = JSON.parse(this.data);
    this.makeChart();
  }

  makeChart() {
    let data = this.data;
    if (data == null || data.length == 0) {
        data = { 'labels': [], data: [] };
    }

    let styleConfig = {
      type: 'doughnut',
      options: {
        responsive: true,
        tooltips: {
          cornerRadius: 1
        },
        plugins: {
            deferred: {
                yOffset: '50%',
                delay: 200
            }
        }
      }
    };

    let dataConfig = {
      data: {
        labels: data.labels.map(x => x + ' (%)'),
        datasets: [{
            label: ' ratio of trades',
            data: data['data'],
            backgroundColor: ['#00AFD0', '#75D1F3', '#C0E4ED', '#9FCA78'],
            borderWidth: 3,
            hoverBorderColor: '#fff'
        }]
    }
    };

    let config = $.extend(true, styleConfig, dataConfig);
    let canvas = $('#ecommerceRatioChart');
    new Chart(
      canvas.get(0).getContext('2d'),
      config
    );

  }

}
