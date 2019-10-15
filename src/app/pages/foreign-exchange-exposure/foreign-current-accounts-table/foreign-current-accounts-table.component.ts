import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { DatatablesService } from '../../../services/datatables.service';

import * as humanFormat from 'human-format';

declare var $: any;

@Component({
  selector: 'app-foreign-current-accounts-table',
  templateUrl: './foreign-current-accounts-table.component.html',
  styleUrls: ['./foreign-current-accounts-table.component.scss']
})
export class ForeignCurrentAccountsTableComponent implements OnInit, OnChanges {

  @Input() data;
  @Input() search;
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
      '#foreignCurrentAccountsTable',
      {
        data: self.data,
        columns: [
          { data: "clientName" },
          { data: "originalBalance", className: "right-align", render: function (data, type, row) { if (type == 'sort' || type == 'type') { return data } return self.DatatablesService.formatAmount(row, 'originalBalance', 'originalBalanceCurrency') } },
          { data: "balance", className: "right-align", render: function (data, type, row) { if (type == 'sort' || type == 'type') { return data } return self.DatatablesService.formatAmount(row, 'balance', 'balanceCurrency') } },
          { data: 'barValue' },
          { data: 'originalBalanceCurrency', visible: false },
          // { data: 'balanceCurrency', visible: false },
          { data: 'clientId', visible: false },
          { data: 'clientMatchCodes', visible: false },
          { data: 'balanceChange', className: "right-align", visible: false, render: function (data, type, row) { return self.DatatablesService.formatAmount(row, 'balanceChange') } },
          { data: 'variability', className: "right-align", visible: false, render: function (data, type, row) { return self.DatatablesService.formatAmount(row, 'variability') } },
        ],
        createdRow: function (row, data) {
          $('td:eq(0)', row).html(self.DatatablesService.addClientTooltip(data));
          $('td:eq(3)', row).html(self.buildVariabilityBar(data['balanceChange'], data['variability'], data['barValue'], self.DatatablesService.addTooltip));
        }
      },
      false,
      self.DatatablesService.configureExport([0, 5, 6, 1, 2, 7, 8])
    );

    if (!!this.search) {
      this.table.search(this.search);
      this.table.draw();
    }
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
