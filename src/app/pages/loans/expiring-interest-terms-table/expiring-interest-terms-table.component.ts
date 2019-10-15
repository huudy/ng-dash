import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DatatablesService } from '../../../services/datatables.service';

declare var $:any;

@Component({
  selector: 'app-expiring-interest-terms-table',
  templateUrl: './expiring-interest-terms-table.component.html',
  styleUrls: ['./expiring-interest-terms-table.component.scss']
})
export class ExpiringInterestTermsTableComponent implements OnInit, OnChanges {

  @Input() data;
  @Input() search;
  table = null;

  constructor( private DatatablesService: DatatablesService ) { }

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
      '#expiringInterestTermsTable',
      {
        data: self.data,
        columns: [
          { data: 'clientName' },
          { data: 'loanType' },
          { data: 'maturityDate', render: function (data, type, row) { return self.DatatablesService.formatDate(row, 'maturityDate') } },
          { data: 'balance', className: "right-align", render: function (data, type, row) { if (type == 'sort' || type == 'type') { return data } return self.DatatablesService.formatAmount(row, 'balance', 'balanceCurrency') } },
          { data: 'effIntRate', className: "right-align", render: function (data, type, row) { if (type == 'sort' || type == 'type') { return data } try { return data.toLocaleString("en", { style: "percent", minimumFractionDigits: 3, maximumFractionDigits: 3 }) } catch(e) { return '' } } },
          { data: 'fixingDate', render: function (data, type, row) { return self.DatatablesService.formatDate(row, 'fixingDate') } },
          { data: 'clientId', visible: false },
          { data: 'clientMatchCodes', visible: false },
          { data: 'intRateRef', visible: false },
          { data: 'intRateSpread', visible: false, render: function (data, type, row) { try { return data.toLocaleString("en", { style: "percent", minimumFractionDigits: 3, maximumFractionDigits: 3 }) } catch(e) { return '' } } },
        ],
        createdRow: function (row, data) {
          $('td:eq(0)', row).html(self.DatatablesService.addClientTooltip(data));

          let rateConditionsTooltipRoot = null;
          try { rateConditionsTooltipRoot = data['effIntRate'].toLocaleString("en", { style: "percent", minimumFractionDigits: 3, maximumFractionDigits: 3 }) } catch(e) {};
          let rateConditionsTooltip = null;
          try { rateConditionsTooltip = (data['intRateRef'].substring(0, 3) === 'XXX' ? 'Fixed rate' : data['intRateRef'] + " + " + data['intRateSpread'].toLocaleString("en", { style: "percent", minimumFractionDigits: 3, maximumFractionDigits: 3 })) } catch(e) {};
          if (!!rateConditionsTooltipRoot && !!rateConditionsTooltip) {
            $('td:eq(4)', row).html(self.DatatablesService.addTooltip(rateConditionsTooltipRoot, rateConditionsTooltip));
          } else if (!!rateConditionsTooltipRoot) {
            $('td:eq(4)', row).html(rateConditionsTooltipRoot);
          }
        }
      },
      false,
      self.DatatablesService.configureExport([0, 6, 7, 1, 2, 3, 4, 8, 9, 5])
    );

    if (!!this.search) {
      this.table.search(this.search);
      this.table.draw();
    }
  }

}
