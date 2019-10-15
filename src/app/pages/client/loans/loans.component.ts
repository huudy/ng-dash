import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { DatatablesService } from '../../../services/datatables.service';

declare var $: any;

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.scss']
})
export class LoansComponent implements OnInit, OnChanges {

  @Input() data;
  table = null;

  constructor( private DatatablesService: DatatablesService ) { }

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
      '#loansTable',
      {
        data: self.data,
        columns: [
          { data: 'loanType' },
          { data: 'maturityDate', render: function (data, type, row) { return self.DatatablesService.formatDate(row, 'maturityDate') } },
          { data: 'balance', className: "right-align", render: function (data, type, row) { if (type == 'sort' || type == 'type') { return data } return self.DatatablesService.formatAmount(row, 'balance', 'balanceCurrency') } },
          { data: 'effIntRate', className: "right-align", render: function (data, type, row) { if (type == 'sort' || type == 'type') { return data } try { return data.toLocaleString("en", { style: "percent", minimumFractionDigits: 3, maximumFractionDigits: 3 }) } catch(e) { return '' } } },
          { data: 'originalNominal', className: "right-align", visible: false, render: function (data, type, row) { if (type == 'sort' || type == 'type') { return data } return self.DatatablesService.formatAmount(row, 'originalNominal', 'originalNominalCurrency') } },
          { data: 'intRateRef', visible: false },
          { data: 'intRateSpread', visible: false, render: function (data, type, row) { try { return data.toLocaleString("en", { style: "percent", minimumFractionDigits: 3, maximumFractionDigits: 3 }) } catch(e) { return '' } } },
        ],
        createdRow: function (row, data) {
          $('td:eq(2)', row).html(
            self.DatatablesService.addTooltip(
              self.DatatablesService.formatAmount(data, 'balance', 'balanceCurrency'),
              'original nominal: ' + self.DatatablesService.formatAmount(data, 'originalNominal', 'originalNominalCurrency')
            )
          );

          let rateConditionsTooltipRoot = null;
          try { rateConditionsTooltipRoot = data['effIntRate'].toLocaleString("en", { style: "percent", minimumFractionDigits: 3, maximumFractionDigits: 3 }) } catch(e) {};
          let rateConditionsTooltip = null;
          try { rateConditionsTooltip = (data['intRateRef'].substring(0, 3) === 'XXX' ? 'Fixed rate' : data['intRateRef'] + " + " + data['intRateSpread'].toLocaleString("en", { style: "percent", minimumFractionDigits: 3, maximumFractionDigits: 3 })) } catch(e) {};
          if (!!rateConditionsTooltipRoot && !!rateConditionsTooltip) {
            $('td:eq(3)', row).html(self.DatatablesService.addTooltip(rateConditionsTooltipRoot, rateConditionsTooltip));
          } else if (!!rateConditionsTooltipRoot) {
            $('td:eq(3)', row).html(rateConditionsTooltipRoot);
          }
        }
      },
      false,
      self.DatatablesService.configureExport([0, 1, 2, 4, 3, 5, 6])
    );

  }

}
