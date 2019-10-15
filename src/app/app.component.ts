import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as humanFormat from 'human-format';
import 'chart.js';
import 'chartjs-plugin-deferred';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SONAR';

  constructor(
    private Router: Router,
    private NgZone: NgZone
  ) { }

  ngOnInit() {
    // show message when no data is present in chart.js graph
    Chart.plugins.register({
      afterDraw: function (chart) {
        if (chart.data.datasets[0].data.length === 0) {
          // No data is present
          var ctx = chart.chart.ctx;
          var width = chart.chart.width;
          var height = chart.chart.height
          chart.clear();

          ctx.save();
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.font = "16px normal 'Helvetica Nueue'";
          ctx.fillText('No data to display', width / 2, height / 2);
          ctx.restore();
        }
      }
    });

    // Define a plugin to provide data labels in charts	
    Chart.plugins.register({
      afterDatasetsDraw: function (chart) {
        if (chart.config.options.drawDataLabels) {
          var ctx = chart.ctx;
          var labels = chart.config.data.labels;

          chart.data.datasets.forEach(function (dataset, i) {
            var meta = chart.getDatasetMeta(i);
            if (!meta.hidden) {
              meta.data.forEach(function (element, index) {
                // Draw the text in black, with the specified font
                ctx.fillStyle = '#666';

                var fontSize = 12;
                var fontStyle = (labels[index].substr(1, 1) === '4' ? 'bold' : 'normal');
                var fontFamily = 'UniCredit';
                ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);

                // Just naively convert to string for now
                var dataString = humanFormat(dataset.data[index], { unit: '€', decimals: 1 });

                // Make sure alignment settings are correct
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';

                var padding = 5;
                var position = element.tooltipPosition();
                ctx.fillText(dataString, position.x, position.y - (fontSize / 2) - padding);
              });
            }
          });
        }
      }
    });

    // turn graphs into images for printing
    window.onbeforeprint = function (event) {
      for (let id in Chart.instances) {
        let canvas = Chart.instances[id].canvas;

        if (!!document.getElementById(canvas.id)) {
          Chart.instances[id].resize();

          // disable deferred
          let options = Chart.instances[id].options;
          options.plugins.deferred = false;
          options.animation = false;
          Chart.instances[id].update(options);

          let dataUrl = canvas.toDataURL('image/png');

          let img = new Image();
          img.src = dataUrl;

          canvas.parentNode.appendChild(img);
          document.getElementById(canvas.id).classList.add('d-none');
        }
      }
    };

    // and back again
    window.onafterprint = function (event) {
      for (let id in Chart.instances) {
        let canvas = Chart.instances[id].canvas;
        if (!!document.getElementById(canvas.id)) {
          Chart.instances[id].resize();

          document.getElementById(canvas.id).classList.remove('d-none');
          $('#' + canvas.id).parent().find('img').remove();
        }
      }
    };
  }

  ngAfterViewInit() {
    $('#publicRouter').on('change', (event) => {
      this.navigateTo($(event.target).val());
    });
  }

  navigateTo(value: string) {
    let route = value.split(';')[0];
    let paramArray = value.split(';').slice(1);
    let parameters = {};
    paramArray.forEach(function (keyValuePair) {
      let key = keyValuePair.split('=')[0];
      let value = keyValuePair.split('=')[1];
      parameters[key] = value;
    });

    this.NgZone.run(() => {
      this.Router.navigate([route, parameters]);
    });
  }
}
