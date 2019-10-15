import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { DatatablesService } from '../../../services/datatables.service';

import * as humanFormat from 'human-format';

declare var $: any;

@Component({
  selector: 'app-current-accounts',
  templateUrl: './current-accounts.component.html',
  styleUrls: ['./current-accounts.component.scss']
})
export class CurrentAccountsComponent implements OnInit, OnChanges {

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
      '#currentAccountsTable',
      {
        data: self.data,
        columns: [
          { data: "originalBalance", className: "right-align", render: function (data, type, row) { if (type == 'sort' || type == 'type') { return data } return self.DatatablesService.formatAmount(row, 'originalBalance', 'originalBalanceCurrency') } },
          { data: "balance", className: "right-align", render: function (data, type, row) { if (type == 'sort' || type == 'type') { return data } return self.DatatablesService.formatAmount(row, 'balance', 'balanceCurrency') } },
          { data: 'barValue' },
          { data: 'originalBalanceCurrency', visible: false },
          // { data: 'balanceCurrency', visible: false },
          { data: 'balanceChange', className: "right-align", visible: false, render: function (data, type, row) { return self.DatatablesService.formatAmount(row, 'balanceChange') } },
          { data: 'variability', className: "right-align", visible: false, render: function (data, type, row) { return self.DatatablesService.formatAmount(row, 'variability') } },
        ],
        createdRow: function (row, data) {
          $('td:eq(2)', row).html(self.buildVariabilityBar(data['balanceChange'], data['variability'], data['barValue'], self.DatatablesService.addTooltip));
        }
      },
      false,
      self.DatatablesService.configureExport([0, 1, 2, 4, 5])
    );

  }

  buildVariabilityBar(balanceChange, variability, width, tooltipFunction) {
    let barTemplate = `
      <div class='progress mt-2' style='height: 7px;'>
        <div class='progress-bar {{backgroundColor}}' role='progressbar' style='width: {{width}}%;' aria-valuenow='{{width}}' aria-valuemin='0' aria-valuemax='100'></div>
      </div>`;
    
    let bgColor = 'bg-light-green';
    if (balanceChange < 0 ) {
      bgColor = 'bg-light-red';
    }

    let tooltipRoot = barTemplate.replace('{{backgroundColor}}', bgColor).replace('{{width}}', width).replace('{{width}}', width);

    let tooltipContent = (
      "balance change within the last seven days: " + humanFormat(Math.round(balanceChange), { unit: 'EUR', decimals: 0 }) + "<br>" + 
      "mean balance change per day: " + humanFormat(Math.round(variability), { unit: 'EUR', decimals: 0 })
    );

    return tooltipFunction(
      tooltipRoot,
      tooltipContent
    )
  }

}
