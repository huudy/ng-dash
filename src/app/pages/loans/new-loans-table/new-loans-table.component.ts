import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DatatablesService } from '../../../services/datatables.service';

declare var $:any;

@Component({
  selector: 'app-new-loans-table',
  templateUrl: './new-loans-table.component.html',
  styleUrls: ['./new-loans-table.component.scss']
})
export class NewLoansTableComponent implements OnInit, OnChanges {

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

    let data = this.data;
    let self = this;

    this.table = this.DatatablesService.createDatatable(
      '#newLoansTable',
      {
        data: data,
        columns: [
          { data: 'clientName' },
          { data: 'loanType' },
          { data: 'maturityDate', render: function (data, type, row) { return self.DatatablesService.formatDate(row, 'maturityDate') } },
          { data: 'nominal', className: "right-align", render: function (data, type, row) { if (type == 'sort' || type == 'type') { return data } return self.DatatablesService.formatAmount(row, 'nominal', 'nominalCurrency') } },
          { data: 'effIntRate', className: "right-align", render: function (data, type, row) { if (type == 'sort' || type == 'type') { return data } try { return data.toLocaleString("en", { style: "percent", minimumFractionDigits: 3, maximumFractionDigits: 3 }) } catch(e) { return '' } } },
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
      self.DatatablesService.configureExport([0, 5, 6, 1, 2, 3, 4, 7, 8])
    );

    if (!!this.search) {
      this.table.search(this.search);
      this.table.draw();
    }
  }

}
