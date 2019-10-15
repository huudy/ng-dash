import { Component, OnInit, Input } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-sector-analysis',
  templateUrl: './sector-analysis.component.html',
  styleUrls: ['./sector-analysis.component.scss']
})
export class SectorAnalysisComponent implements OnInit {

  @Input() dataComposition;
  @Input() dataCurrencyMix;
  @Input() dataTenor;
  @Input() dataHedgingBins;

  ngOnInit() {
    this.dataComposition = JSON.parse(this.dataComposition);
    this.dataCurrencyMix = JSON.parse(this.dataCurrencyMix);
    this.dataTenor = JSON.parse(this.dataTenor);
    this.dataHedgingBins = JSON.parse(this.dataHedgingBins);
    this.buildComponent();
  }

  buildComponent() {
    this.makeSectorCompositionChart();
    this.makeCurrencyMixChart();
    this.makeTenorChart();
    this.makeHedgingBinsBuyChart();
    this.makeHedgingBinsSellChart();
  }

  makeSectorCompositionChart() {

    let styleConfig = {
      type: 'doughnut',
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false, // !!!
          labels: {
            boxWidth: 10,
            boxHeight: 10,
            fontSize: 10
          }
        },
        tooltips: {
          cornerRadius: 1,
          callbacks: {
            label: function (tooltipItem, data) {
              return data.datasets[tooltipItem.datasetIndex].label[tooltipItem.index] + ': ' + Math.round(100 * data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]) + '%';
            }
          }
        },
        title: {
          text: 'sector composition of peer group',
          display: true
        },
        layout: {
          padding: 20
        },
        plugins: {
          datalabels: {
            display: true,
            anchor: 'end',
            align: 'end',
            //color: '#fff',
            formatter: function (value, context) {
              // return [Math.round(100 * context.dataset.data[context.dataIndex]) + '%'];
              return [context.dataset.label[context.dataIndex]];
            }
          },
          deferred: {
            yOffset: '50%',
            delay: 200
          }
        }
      }
    };

    let sectorSize = 0;
    for (let i = 0; i < this.dataComposition['number_of_clients'].length; i++) {
      sectorSize += this.dataComposition['number_of_clients'][i];
    }
    this.dataComposition['fraction'] = [];
    for (let i = 0; i < this.dataComposition['number_of_clients'].length; i++) {
      this.dataComposition['fraction'].push(this.dataComposition['number_of_clients'][i] / sectorSize);
    }

    let dataConfig = {
      data: {
        labels: this.dataComposition['sector_names'],
        datasets: [{
          data: this.dataComposition['fraction'],
          label: this.dataComposition['sector_names'],
          backgroundColor: ['#00AFD0', '#C0E4ED', '#4C4C4C', '#B2B2B2', '#9FCA78', '#A33694', '#F58523', '#EFB587', '#EA5C4D', '#FEF1CC'],
          borderWidth: 3,
          hoverBorderColor: '#fff'
        }]
      }
    };

    let config = $.extend(true, styleConfig, dataConfig);
    let canvas = $('#sectorMixChart');
    new Chart(
      canvas.get(0).getContext('2d'),
      config
    );
  }

  makeCurrencyMixChart() {

    let styleConfig = {
      type: 'doughnut',
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: true,
          labels: {
            boxWidth: 10,
            boxHeight: 10,
            fontSize: 10
          }
        },
        title: {
          text: 'currency mix',
          display: true
        },
        tooltips: {
          cornerRadius: 1,
          callbacks: {
            label: function (tooltipItem, data) {
              return data.datasets[tooltipItem.datasetIndex].label[tooltipItem.index] + ': ' + Math.round(100 * data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]) + '%';
            }
          }
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
        labels: this.dataCurrencyMix['ccy_pair'],
        datasets: [{
          data: this.dataCurrencyMix['ccy_fraction'],
          label: this.dataCurrencyMix['ccy_pair'],
          backgroundColor: ['#00AFD0', '#C0E4ED', '#4C4C4C', '#B2B2B2', '#9FCA78', '#A33694', '#F58523', '#EFB587', '#EA5C4D', '#FEF1CC'],
          borderWidth: 3,
          hoverBorderColor: '#fff'
        }]
      }
    };

    let config = $.extend(true, styleConfig, dataConfig);
    let canvas = $('#currencyMixChart');
    new Chart(
      canvas.get(0).getContext('2d'),
      config
    );
  }

  makeTenorChart() {

    let styleConfig = {
      type: 'horizontalBar',
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            gridLines: {
              display: true,
              color: '#fff',
              lineWidth: 2
            },
            ticks: {
              min: 0
            }
          }],
          yAxes: [{
            gridLines: {
              display: false
            }
          }]
        },
        legend: {
          display: true,
          labels: {
            boxWidth: 10,
            boxHeight: 10,
            fontSize: 10
          }
        },
        title: {
          text: 'average tenor of hedging instruments in days',
          display: true
        },
        tooltips: {
          cornerRadius: 1
        },
        plugins: {
          deferred: {
            yOffset: '50%',
            delay: 200
          }
        },
        chartArea: {
          backgroundColor: '#f7f7f7'
        }
      }
    };

    let dataConfig = {
      data: {
        labels: this.dataTenor['buy']['ccy_pair'],
        datasets: [{
          label: ' buy',
          data: this.dataTenor['buy']['duration'],
          backgroundColor: '#00AFD0',
          borderWidth: 0,
          hoverBorderColor: '#fff'
        }, {
          label: ' sell',
          data: this.dataTenor['sell']['duration'],
          backgroundColor: '#C0E4ED',
          borderWidth: 0,
          hoverBorderColor: '#fff'
        }]
      }
    };

    let config = $.extend(true, styleConfig, dataConfig);
    let canvas = $('#tenorChart');
    new Chart(
      canvas.get(0).getContext('2d'),
      config
    );
  }

  makeHedgingBinsBuyChart() {

    let styleConfig = {
      type: 'horizontalBar',
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            gridLines: {
              display: true,
              color: '#fff',
              lineWidth: 2
            },
            ticks: {
              min: 0
            }
          }],
          yAxes: [{
            gridLines: {
              display: false
            }
          }]
        },
        legend: {
          display: true,
          labels: {
            boxWidth: 10,
            boxHeight: 10,
            fontSize: 10
          }
        },
        tooltips: {
          cornerRadius: 1,
          callbacks: {
            label: function (tooltipItem, data) {
              return data.datasets[tooltipItem.datasetIndex].label + ': ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] + '%';
            }
          }
        },
        title: {
          text: 'client buys counter currency (fraction of volume in %)',
          display: true
        },
        plugins: {
          deferred: {
            yOffset: '50%',
            delay: 200
          }
        },
        chartArea: {
          backgroundColor: '#f7f7f7'
        }
      }
    };

    let dataConfig = {
      data: {
        labels: this.dataHedgingBins['B']['0 - 90 days']['ccy_pair'],
        datasets: [{
          label: ' 91 - 365 days',
          data: this.dataHedgingBins['B']['91 - 365 days']['bin_fraction'].map(x => Math.round(100 * x)),
          backgroundColor: '#00AFD0',
          borderWidth: 0,
          hoverBorderColor: '#fff'
        }, {
          label: ' 366 - 730 days',
          data: this.dataHedgingBins['B']['366 - 730 days']['bin_fraction'].map(x => Math.round(100 * x)),
          backgroundColor: '#75D1F3',
          borderWidth: 0,
          hoverBorderColor: '#fff'
        }, {
          label: ' >730 days',
          data: this.dataHedgingBins['B']['>730 days']['bin_fraction'].map(x => Math.round(100 * x)),
          backgroundColor: '#C0E4ED',
          borderWidth: 0,
          hoverBorderColor: '#fff'
        }]
      }
    };

    let config = $.extend(true, styleConfig, dataConfig);
    let canvas = $('#hedgingBinsBuyChart');
    new Chart(
      canvas.get(0).getContext('2d'),
      config
    );
  }

  makeHedgingBinsSellChart() {

    let styleConfig = {
      type: 'horizontalBar',
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            gridLines: {
              display: true,
              color: '#fff',
              lineWidth: 2
            },
            ticks: {
              min: 0
            }
          }],
          yAxes: [{
            gridLines: {
              display: false
            }
          }]
        },
        legend: {
          display: true,
          labels: {
            boxWidth: 10,
            boxHeight: 10,
            fontSize: 10
          }
        },
        tooltips: {
          cornerRadius: 1,
          callbacks: {
            label: function (tooltipItem, data) {
              return data.datasets[tooltipItem.datasetIndex].label + ': ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] + '%';
            }
          }
        },
        title: {
          text: 'client sells counter currency (fraction of volume in %)',
          display: true
        },
        plugins: {
          deferred: {
            yOffset: '50%',
            delay: 200
          }
        },
        chartArea: {
          backgroundColor: '#f7f7f7'
        }
      }
    };

    let dataConfig = {
      data: {
        labels: this.dataHedgingBins['S']['0 - 90 days']['ccy_pair'],
        datasets: [{
          label: ' 91 - 365 days',
          data: this.dataHedgingBins['S']['91 - 365 days']['bin_fraction'].map(x => Math.round(100 * x)),
          backgroundColor: '#00AFD0',
          borderWidth: 0,
          hoverBorderColor: '#fff'
        }, {
          label: ' 366 - 730 days',
          data: this.dataHedgingBins['S']['366 - 730 days']['bin_fraction'].map(x => Math.round(100 * x)),
          backgroundColor: '#75D1F3',
          borderWidth: 0,
          hoverBorderColor: '#fff'
        }, {
          label: ' >730 days',
          data: this.dataHedgingBins['S']['>730 days']['bin_fraction'].map(x => Math.round(100 * x)),
          backgroundColor: '#C0E4ED',
          borderWidth: 0,
          hoverBorderColor: '#fff'
        }]
      }
    };

    let config = $.extend(true, styleConfig, dataConfig);
    let canvas = $('#hedgingBinsSellChart');
    new Chart(
      canvas.get(0).getContext('2d'),
      config
    );
  }

}
