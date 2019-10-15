import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { DatatablesService } from '../../../services/datatables.service';

declare var $: any;

@Component({
  selector: 'app-primary-market-table',
  templateUrl: './primary-market-table.component.html',
  styleUrls: ['./primary-market-table.component.scss']
})
export class PrimaryMarketTableComponent implements OnInit, OnChanges {

  @Input() data;
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

    let data = this.data;
    let self = this;

    let detailFields = ['bonusLevel', 'bonusLevelPercent', 'barrierLevel', 'barrierLevelPercent', 'cap', 'capPercent', 'strike', 'strikePercent', 'coupon'];
		let detailFieldsNames = ['Bonus Level', 'Bonus Level in %', 'Barrier Level', 'Barrier Level in %', 'Cap', 'Cap in %', 'Strike', 'Strike in %', 'Coupon'];

    this.table = this.DatatablesService.createDatatable(
      '#issuancesPrimaryMarketDetailsTable',
      {
        data: data,
        columns: [
          { data: "productType" },
          { data: "productWkn" },
          { data: "underlying" },
          { data: "issueVolume", className: "right-align" },
          { data: "initialPaymentDate" },
          { data: "secondaryMarketStartDate" },
          { data: "finalPaymentDate" },
          { data: null, defaultContent: '' },
          { data: "countryCode", visible: false },
          { data: "assetClass", visible: false },
          { data: "responsibleSales", visible: false }
        ],
        createdRow: function (row, data) {
          $('td:eq(3)', row).html(self.DatatablesService.formatAmount(data, 'issueVolume'));
          $('td:eq(4)', row).html(self.DatatablesService.formatDate(data, 'initialPaymentDate'));
          $('td:eq(5)', row).html(self.DatatablesService.formatDate(data, 'secondaryMarketStartDate'));
          $('td:eq(6)', row).html(self.DatatablesService.formatDate(data, 'finalPaymentDate'));

          $('td:eq(7)', row).html(self.productDetails(data, detailFields, detailFieldsNames));
        }
      }
    );
  }

  productDetails(row, sourceNames, targetNames) {
    let fullDetail = '';
    for (let j = 0; j < sourceNames.length; j++) {
      let detail = '';
      if (row[sourceNames[j]] != undefined) {
        let value = row[sourceNames[j]];
        if (targetNames[j].slice(-4) == 'in %') {
          value = this.round(100 * value, 2);
        }
        detail += targetNames[j] + ': ' + value;
      }

      if (detail !== '') {
        fullDetail = (fullDetail === '' ? '' : fullDetail + ' - ') + detail;
      }
    }

    return fullDetail;
  }

  round(value, exp) {
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math.round(value);
    }

    value = +value;
    exp = +exp;

    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }

    // Shift
    value = value.toString().split('e');
    value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp)));

    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp));
  }

}
