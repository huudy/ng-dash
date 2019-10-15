import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { DatatablesService } from '../../../services/datatables.service';

declare var $: any;

@Component({
  selector: 'app-active-trades',
  templateUrl: './active-trades.component.html',
  styleUrls: ['./active-trades.component.scss']
})
export class ActiveTradesComponent implements OnInit, OnChanges {

  @Input() data;
  table = null;

  constructor(private DatatablesService: DatatablesService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.buildtable();
  }

  buildtable() {
    if (!!this.table) {
      this.table.destroy();
    }

    let self = this;

    this.table = this.DatatablesService.createDatatable(
      '#activeTradesTable',
      {
        data: self.data,
        columns: [
          { data: "tradeId", className: "right-align" },
          { data: "product" },
          { data: "strategy" },
          { data: "currencyPair" },
          { data: "tradeRate", className: "right-align" },
          { data: 'notional', className: "right-align", render: function (data, type, row) { if (type == 'sort' || type == 'type') { return data } return self.DatatablesService.formatAmount(row, 'notional', 'notionalCurrency') } },
          { data: 'maturityDate', render: function (data, type, row) { return self.DatatablesService.formatDate(row, 'maturityDate') } },
          { data: "pv", className: "right-align" },
          { data: "underlying", visible: false },
          { data: "assetClass", visible: false },
        ],
        order: [[6, 'asc']],
        createdRow: function (row, data) {

          let productTooltip = '';
          if (!!data['underlying']) {
            productTooltip += 'underlying: ' + data['underlying'] + '<br>';
          }
          if (!!productTooltip) {
            $('td:eq(1)', row).html(self.DatatablesService.addTooltip(data['product'], productTooltip));
          }

          $('td:eq(6)', row).append(self.addCalendarAppointment(data, 'maturityDate'));

          let pvTooltip = '';
          if (!!data['pvDate']) {
            pvTooltip += "Valuation date: " + data['pvDate'] + '<br>';
          }
          if (!!data['pvSharedCount']) {
            pvTooltip += "Aggregated present value for structure of " + data['pvSharedCount'] + " active transactions" + '<br>';
          }
          if (!!data['pvSharedReference']) {
            pvTooltip += "Structure reference: " + data['pvSharedReference'] + '<br>';
          }
          if (!!pvTooltip) {
            $('td:eq(7)', row).html(self.DatatablesService.addTooltip(self.DatatablesService.formatAmount(data, 'pv', 'pvCurrency'), pvTooltip));
          }
        }
      },
      false,
      self.DatatablesService.configureExport([0, 1, 2, 3, 4, 8, 5, 6, 7, 8])
    );
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
