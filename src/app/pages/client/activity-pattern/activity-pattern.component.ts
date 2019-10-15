import { Component, OnInit, Input } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-activity-pattern',
  templateUrl: './activity-pattern.component.html',
  styleUrls: ['./activity-pattern.component.scss']
})
export class ActivityPatternComponent implements OnInit {

  @Input() data;

  constructor() { }

  ngOnInit() {
    this.data = JSON.parse(this.data);
    this.buildComponent();
  }

  buildComponent() {
    this.makeByHourGraph();
    this.makeByDayOfWeekGraph();
    this.makeByDayOfMonthGraph();
  }

  makeByHourGraph() {
    let styleConfig = {
      type: 'line',
      options: {
        legend: { display: false },
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          xAxes: [{
            gridLines: {
              display: true,
              color: '#fff',
              lineWidth: 2,
              drawBorder: false
            },
            ticks: {
              maxRotation: 0,
              autoSkip: true,
              maxTicksLimit: 8,
              callback: function (value, index, values) {
                return (value < 10 ? '0' : '') + value + ':00';
              }
            }
          }],
          yAxes: [{
            gridLines: {
              display: false,
              drawBorder: false
            },
            ticks: {
              min: 0,
              callback: function (value, index, values) {
                switch (value) {
                  case values[0]:
                    return 'high';
                  case values[values.length - 1]:
                    return 'low';
                  default:
                    return '';
                }
              }
            },
            scaleLabel: {
              display: true,
              labelString: 'client activity'
            },
            beforeBuildTicks: function (scale) {
              scale.max = scale.max * 1.05;
            }
          }]
        },
        chartArea: { backgroundColor: '#f7f7f7' },
        tooltips: { enabled: false },
        hover: {
          mode: 'index',
          intersect: false
        }
      }
    };

    let data = this.data['hour'];
    if (data == null || data.length == 0) {
      data = [];
    } 

    let dataConfig = {
      data: {
        labels: Array.from(Array(25).keys()), // [0 .. 24]
        datasets: [{
          label: 'Activity',
          backgroundColor: 'rgba(0, 175, 208, 0.75)',
          borderColor: 'rgba(0, 175, 208, 0.75)',
          borderWidth: 1,
          pointRadius: 0,
          data: data,
          fill: true
        }]
      }
    };

    let config = $.extend(true, styleConfig, dataConfig);
    let canvas = $('#activityPatternTimeOfDay');
    new Chart(
      canvas.get(0).getContext('2d'),
      config
    );
  }

  makeByDayOfWeekGraph() {
    let styleConfig = {
      type: 'bar',
      options: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'by day of week'
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
            barPercentage: 1,
            categoryPercentage: 1,
            ticks: {
              maxRotation: 0,
              autoSkip: true
            }
          }],
          yAxes: [{
            gridLines: {
              display: false,
              drawBorder: false
            },
            ticks: {
              min: 0,
              callback: function (value, index, values) {
                return '';
              }
            } /* we do not set display to false as that changes the height of the chart */
          }]
        },
        chartArea: {
          backgroundColor: '#f7f7f7'
        },
        tooltips: {
          enabled: false
        }
      }
    };

    let data = this.data['weekday'];
    if (data == null || data.length == 0) {
      data = [];
    } 

    let dataConfig = {
      data: {
        labels: ['Mo', 'Tu', 'We', 'Th', 'Fr'],
        datasets: [{
          label: 'Activity',
          backgroundColor: 'rgba(0, 175, 208, 0.75)',
          borderWidth: 0,
          data: data,
          fill: false
        }]
      }
    };

    let config = $.extend(true, styleConfig, dataConfig);
    let canvas = $('#activityPatternDayOfWeek');
    new Chart(
      canvas.get(0).getContext('2d'),
      config
    );
  }

  makeByDayOfMonthGraph() {
    let styleConfig = {
      type: 'bar',
      options: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'by day of month'
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
            barPercentage: 1,
            categoryPercentage: 1,
            ticks: {
              maxRotation: 0,
              autoSkip: true
            }
          }],
          yAxes: [{
            gridLines: {
              display: false,
              drawBorder: false
            },
            ticks: {
              min: 0,
              callback: function (value, index, values) {
                switch (value) {
                  case values[0]:
                    return 'high';
                  case values[values.length - 1]:
                    return 'low';
                  default:
                    return '';
                }
              }
            },
            scaleLabel: {
              display: true,
              labelString: 'client activity'
            }
          }]
        },
        chartArea: {
          backgroundColor: '#f7f7f7'
        },
        tooltips: {
          enabled: false
        }
      }
    };

    let data = this.data['dayofmonth'];
    if (data == null || data.length == 0) {
      data = [];
    } 

    let dataConfig = {
      data: {
        labels: Array.from(Array(31).keys()).map(x => x+1), //[1..31],
        datasets: [{
          label: 'Activity',
          backgroundColor: 'rgba(0, 175, 208, 0.75)',
          borderWidth: 0,
          data: data,
          fill: false
        }]
      }
    };

    let config = $.extend(true, styleConfig, dataConfig);
    let canvas = $('#activityPatternDayOfMonth');
    new Chart(
      canvas.get(0).getContext('2d'),
      config
    );
  }

}
