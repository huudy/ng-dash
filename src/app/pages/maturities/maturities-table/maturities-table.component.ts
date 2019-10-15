import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { DatatablesService } from '../../../services/datatables.service';

declare var $: any;

@Component({
  selector: 'app-maturities-table',
  templateUrl: './maturities-table.component.html',
  styleUrls: ['./maturities-table.component.scss']
})
export class MaturitiesTableComponent implements OnInit, OnChanges {

  @Input() data;
  @Input() search;

  table = null;

  constructor(private DatatablesService: DatatablesService) { }

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
      '#maturitiesTable',
      {
        data: self.data,
        columns: [
          { data: 'clientName' },
          { data: 'clientMatchCodes' },
          { data: 'tradeId', className: "right-align" },
          { data: 'product' },
          { data: 'currencyPair' },
          { data: 'tradeRate', className: "right-align" },
          { data: 'notional', className: "right-align", render: function (data, type, row) { if (type == 'sort' || type == 'type') { return data } return self.DatatablesService.formatAmount(row, 'notional', 'notionalCurrency') } },
          { data: 'maturityDate', render: function (data, type, row) { return self.DatatablesService.formatDate(row, 'maturityDate') } },
          { data: 'clientId', visible: false },
          { data: 'underlying', visible: false },
          { data: 'strategy', visible: false }
        ],
        createdRow: function (row, data) {
          $('td:eq(0)', row).html(self.DatatablesService.addClientTooltip(data));

          $('td:eq(1)', row).html(data['clientMatchCodes'][0]); // only display one matchcode

          let productTooltip = '';
          if (!!data['underlying']) {
            productTooltip += 'underlying: ' + data['underlying'] + '<br>';
          }
          if (!!data['strategy']) {
            productTooltip += 'strategy: ' + data['strategy'];
          }
          if (!!productTooltip) {
            $('td:eq(3)', row).html(self.DatatablesService.addTooltip(data['product'], productTooltip));
          }

          $('td:eq(7)', row).append(self.addCalendarAppointment(data, 'maturityDate'));
        }
      },
      false,
      self.DatatablesService.configureExport([0, 8, 1, 2, 3, 4, 9, 10, 5, 6, 7])
    );
    
    if (!!this.search) {
      this.table.search(this.search);
      this.table.draw();
    }
  }

  addCalendarAppointment(data, appointmentDateColumn) {
    if (!!data[appointmentDateColumn]) {
      let createCalendarEntry = function () {
        let dateRaw = new Date(data[appointmentDateColumn]);
        let dateFormatted = dateRaw.getFullYear() + '-' + ("0" + (+dateRaw.getMonth() + 1)).slice(-2) + '-' + ("0" + dateRaw.getDate()).slice(-2);
        let icsAppointmentGenerator = icsFormatter();
        let title = 'Maturity of ' + data['currencyPair'] + ' ' + data['product'] + ' for ' + data['clientName'] + ' on ' + dateFormatted;
        let description = (
          'Matchcode: ' + data['clientMatchCodes'][0] + '\\n' +
          'NDG: ' + data['clientId'] + '\\n' +
          'Notional: ' + Math.round(data['notional']).toLocaleString('de-DE') + ' ' + data['notionalCurrency']
        );

        let place = '';
        let begin = new Date(new Date(dateFormatted + 'T08:00:00')); // 08:00 on the day of maturity
        let end = new Date(begin.getTime() + 30 * 60000); // 30 minutes later

        icsAppointmentGenerator.addEvent(title, description, place, begin.toUTCString(), end.toUTCString());
        icsAppointmentGenerator.download('calendar');
      }

      let btn = $('<div class="btn btn-sm shadow-sm text-muted py-0 ml-2 cursor-pointer"><i class="far fa-calendar-alt"></i> <i class="fas fa-plus"></i></div>');

      btn.on('click', createCalendarEntry);

      return btn
    }
  }

}
