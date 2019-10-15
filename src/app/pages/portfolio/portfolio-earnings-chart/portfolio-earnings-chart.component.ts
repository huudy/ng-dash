import { Component, OnInit, Input } from '@angular/core';
import * as humanFormat from 'human-format';

declare var $: any;

@Component({
  selector: 'app-portfolio-earnings-chart',
  templateUrl: './portfolio-earnings-chart.component.html',
  styleUrls: ['./portfolio-earnings-chart.component.scss']
})
export class PortfolioEarningsChartComponent implements OnInit {

  @Input() data;

  constructor() { }

  ngOnInit() {
    if (!!this.data) {
      this.data = JSON.parse(this.data);
      this.makeQuarterlyEarnignsGraph();
      this.makeCumulativeEarningsGraph();
    }
  }

  switchAssectClass(assetClass: string) {
    let chartQuarterly;
		let chartCumulative;

		Chart.helpers.each(Chart.instances, function(instance){
			if (instance.chart.canvas.id == 'portfolioEarnignsQuarterlyChart') {
				chartQuarterly = instance.chart;
			}
			if (instance.chart.canvas.id == 'portfolioEarnignsCumulativeChart') {
				chartCumulative = instance.chart;
			}
		});

		chartQuarterly.data.datasets[0].data = chartQuarterly.options.all_data[assetClass]['single'];
		chartQuarterly.data.datasets[1].data = chartQuarterly.options.all_data[assetClass]['avg'];
		chartQuarterly.update();

		chartCumulative.data.datasets[0].data = chartCumulative.options.all_data[assetClass]['yearly'];
		chartCumulative.update();
  }

  makeQuarterlyEarnignsGraph() {

    let styleConfig = {
      type: 'bar',
      options: {
        legend: {
          display: true,
          labels: { boxWidth: 12, filter: function (item, chart) { return item.datasetIndex === 3 ? null : item; } }
        },
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          xAxes: [{ gridLines: { display: false } }],
          yAxes: [{
            gridLines: { display: true, color: '#fff', lineWidth: 2 },
            ticks: {
              suggestedMin: 0,
              callback: function (value, index, values) { return humanFormat(value, { unit: '€' }); }
            },
            scaleLabel: { display: true, labelString: 'quarterly earnings' }
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
        chartArea: { backgroundColor: '#f7f7f7' },
        all_data: this.data
      }
    };

    let dataConfig = {
      data: {
        labels: this.data['labels'],
        datasets: [{
          type: 'line',
          label: 'earnings',
          backgroundColor: '#fff',
          borderColor: '#F58523',
          borderWidth: 3,
          pointRadius: 4,
          lineTension: 0,
          data: this.data['all']['single'],
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
          data: this.data['all']['avg'],
          fill: false
        }]
      }
    };

    let config = $.extend(true, styleConfig, dataConfig);
    let canvas = $('#portfolioEarnignsQuarterlyChart');
    new Chart(
      canvas.get(0).getContext('2d'),
      config
    );
  }

  makeCumulativeEarningsGraph() {
    let styleConfig = {
      type: 'bar',
      options: {
        legend: { display: false },
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          xAxes: [{ gridLines: { display: false } }],
          yAxes: [{
            gridLines: { display: true, color: '#fff', lineWidth: 2 },
            ticks: {
              suggestedMin: 0,
              callback: function (value, index, values) { return humanFormat(value, { unit: '€' }); }
            },
            scaleLabel: { display: true, labelString: 'cummulative earnings' },
            beforeBuildTicks: function (scale) { scale.max = scale.max * 1.2; }
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
        chartArea: { backgroundColor: '#f7f7f7' },
        all_data: this.data
      }
    };

    let dataConfig = {
      data: {
        labels: this.data['labels'],
        datasets: [{
          label: 'yearly cummulative earnings',
          backgroundColor: ['#E5EFF2', '#C0E4ED', '#75D1F3', '#00AFD0', '#E5EFF2', '#C0E4ED', '#75D1F3', '#00AFD0', '#E5EFF2', '#C0E4ED', '#75D1F3', '#00AFD0'].slice(parseInt(this.data['labels'][0].substr(1, 1)) - 1),
          borderWidth: 0,
          data: this.data['all']['yearly'],
          fill: false
        }]
      }
    };

    let config = $.extend(true, styleConfig, dataConfig);
    let canvas = $('#portfolioEarnignsCumulativeChart');
    new Chart(
      canvas.get(0).getContext('2d'),
      config
    );
  }

}
