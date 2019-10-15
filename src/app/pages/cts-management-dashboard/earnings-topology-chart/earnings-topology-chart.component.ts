import { Component, OnInit, Input, OnChanges } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-earnings-topology-chart',
  templateUrl: './earnings-topology-chart.component.html',
  styleUrls: ['./earnings-topology-chart.component.scss']
})
export class EarningsTopologyChartComponent implements OnInit, OnChanges {

  @Input() data;

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
              labelString: 'earnings (EUR)'
            },
            stacked: true
          }],
          yAxes: [{
            gridLines: {
              display: false
            },
            // ticks: { min: 0 },
            scaleLabel: {
              display: true,
              labelString: 'number of clients'
            },
            stacked: true
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
      data = { "earnings bin": [], "number of clients current": [], deltaPos: [], deltaNeg: [] };
    } else {
      data['deltaPos'] = [];
      data['deltaNeg'] = [];

      for (let i = 0; i < data["number of clients current"].length; i++) {
        let delta = data["number of clients current"][i] - data["number of clients past"][i];

        data["deltaPos"][i] = (delta > 0 ? delta : 0);
        data["deltaNeg"][i] = (delta < 0 ? delta : 0);
      }
    }

    let dataConfig = {
      data: {
        labels: data["earnings bin"],
        datasets: [{
          label: 'number of clients today',
          backgroundColor: 'rgba(0, 175, 208, 0.75)',
          borderWidth: 0,
          data: data["number of clients current"],
          fill: false,
          stack: 0
        }, {
          label: 'net clients gained',
          backgroundColor: 'rgba(159, 202, 120, 0.75)',
          borderWidth: 0,
          data: data["deltaPos"],
          fill: false,
          stack: 1
        }, {
          label: 'net clients lost',
          backgroundColor: 'rgba(234, 92, 77, 0.75)',
          borderWidth: 0,
          data: data["deltaNeg"],
          fill: false,
          stack: 1
        }]
      }
    };

    let config = $.extend(true, styleConfig, dataConfig);
    let canvas = $('#cts_mgmt_client_earnings_topology_graph');
    new Chart(
      canvas.get(0).getContext('2d'),
      config
    );
  }

}
