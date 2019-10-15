import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DatatablesService } from '../../../services/datatables.service';
import * as Chart from 'chart.js';
import * as humanFormat from 'human-format';

declare var $:any;

@Component({
  selector: 'app-unusual-trades-table',
  templateUrl: './unusual-trades-table.component.html',
  styleUrls: ['./unusual-trades-table.component.css']
})
export class UnusualTradesTableComponent implements OnInit, OnChanges {

  @Input() data;
  @Input() search;
  table:any = null;

  constructor(
    private DatatablesService: DatatablesService
  ) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.buildTable();
  }

  buildTable() {
    if (!!this.table) {
      this.table.destroy();
    }

    let self = this;
    
    this.table = this.DatatablesService.createDatatable(
      '#unusualTradesTable',
      {
        data: self.data,
        columns: [
          { data: 'clientName' },
          { data: 'product' },
          { data: 'tradeId', className: "right-align" },
          { data: 'maturityDate', render: function (data, type, row) { return self.DatatablesService.formatDate(row, 'maturityDate') } },
          { data: 'notional', className: "right-align", render: function (data, type, row) { if (type == 'sort' || type == 'type') { return data } return self.DatatablesService.formatAmount(row, 'notional', 'notionalCurrency') } },
          { data: 'outlierReason' },
          { data: null, defaultContent: '' },
          { data: 'clientId', visible: false },
          { data: 'clientMatchCodes', visible: false },
          { data: 'currencyPair', visible: false },
        ],
        createdRow: function (row, data) {
          $('td:eq(0)', row).html(self.DatatablesService.addClientTooltip(data));
          $('td:eq(1)', row).html(self.DatatablesService.addTooltip(data['product'], 'currency pair: ' + data['currencyPair']));
          
          let content: any = null;
          switch (data['outlierReason']) {
            case 'unusual notional':
              content = $(self.buildBadge(self.DatatablesService.addTooltip));
              content.data('visualizationData', data['visualizationData']);
              content.data('type', 'number-amount');    
              break;
            case 'unusual duration':
              content = $(self.buildBadge(self.DatatablesService.addTooltip));
              content.data('visualizationData', data['visualizationData']);
              content.data('type', 'number-number');    
              break;
            case 'new currency':
              content = data['outlierCurrency'];
              break;
          }
          $('td:eq(6)', row).append(content);
         
        }
      },
      self.drawGraph,
      self.DatatablesService.configureExport([0, 7, 8, 1, 9, 2, 3, 4, 5])
    );

    if (!!this.search) {
      this.table.search(this.search);
      this.table.draw();
    }
  };

  public buildBadge(addTooltip) {
    let badgeTemplate = `<span class='badge badge-pill badge-info cursor-default'>i</span>`;
    let tooltipTemplate = `
      <div class="tooltip" role="tooltip">
        <div class="arrow"></div>
        <div class="badge badge-pill text-white bg-dark p-1">
          <i class="fas fa-expand-arrows-alt"></i>
        </div>
        <div class="tooltip-inner p-1 mw-100" style="width: 380px;"></div>
      </div>`;
    return addTooltip(badgeTemplate, `chart`, 'left', '#unusualTradesTable', tooltipTemplate);
  }

  public drawGraph(table) {
    $('[data-toggle="tooltip"][data-template]', table).on('inserted.bs.tooltip', function (event) {
      
      let canvasTemplate = `<canvas style="background: #fff; border-radius: 2px; width: 372px; height: 142px;"></canvas>`;
      
      let graphData = JSON.parse($(event.target).data('visualizationData'));
      let graphType = $(event.target).data('type');
      let tooltipReference = $(event.target).attr('aria-describedby');
      let tooltip = $('#' + tooltipReference);
      $('.badge', tooltip).attr('onclick', 'toggleTooltipSize(this)');
      let tooltipInner = $('.tooltip-inner', tooltip);
      tooltipInner.empty();
      tooltipInner.append(canvasTemplate);
      let canvas = $('canvas', tooltipInner);

      // graph styling
      let commonStyleConfig = {
        type: 'bar',
        options: {
          legend: { display: true, labels: { boxWidth: 12 } },
          maintainAspectRatio: false,
          responsive: true,
          scales: {
            xAxes: [{
              gridLines: { display: true, color: '#fff', lineWidth: 2 },
              scaleLabel: {
                labelString: 'duration in days',
                padding: 0
              },
              barPercentage: 1.0,
              categoryPercentage: 1.0,
              ticks: {
                maxRotation: 0,
                autoSkip: true,
                maxTicksLimit: 8
              },
              stacked: true,
            }],
            yAxes: [{
              // type: 'logarithmic',
              gridLines: { display: false },
              stacked: false,
              display: false
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
      
      let specificStyleConfig =  {};
      if (graphType == 'number-amount') {
        specificStyleConfig = {
          options: {
            scales: { 
              xAxes: [
                {
                  ticks: { callback: function (value, index, values) { return humanFormat(value, { unit: '€', decimals: 1 }); } },
                  scaleLabel: { display: false }
                }
              ] 
            }
          }
        };
      } else {
        specificStyleConfig = {
          options: {
            scales: {
              xAxes: [
                {
                  ticks: { callback: function (value, index, values) { return value.toFixed(0); } },
                  scaleLabel: { display: true }
                }
              ] 
            }
          }
        };
      }

      let dataConfig = {
        data: {
          labels: graphData['labels'],
          datasets: [
            {
              label: 'this trade',
              backgroundColor: 'rgba(226, 0, 26, 0.75)',
              borderWidth: 0,
              data: graphData['this']
            }, {
              label: 'past normal trades',
              backgroundColor: 'rgba(0, 175, 208, 0.75)',
              borderWidth: 0,
              data: graphData['inliers']
            }, {
              label: 'past unusual trades',
              backgroundColor: 'rgba(192, 228, 237, 0.75)',
              borderWidth: 0,
              data: graphData['outliers']
            }
          ]
        }
      };

      let config = $.extend( true, commonStyleConfig, specificStyleConfig, dataConfig );


      new Chart(
        canvas.get(0).getContext('2d'),
        config
      );
      
    });
  }

}
