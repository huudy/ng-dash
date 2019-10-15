import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { DatatablesService } from '../../../services/datatables.service';

declare var $: any;

@Component({
  selector: 'app-rates-table',
  templateUrl: './rates-table.component.html',
  styleUrls: ['./rates-table.component.scss']
})
export class RatesTableComponent implements OnInit, OnChanges {

  @Input() data;
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
    // unstack input
    let periods = [];
    let rateTypes = [];

    for (let i=0; i<data.length; i++) {
			if ( periods.indexOf(data[i]['period']) == -1 ) {
				periods.push(data[i]['period']);
			}
			if ( rateTypes.indexOf(data[i]['rateType']) == -1 ) {
				rateTypes.push(data[i]['rateType']);
			}
    }
    periods.sort((first, second) => this.comparePeriods(first, second));

    let ratesData = [];

		for (let i=0; i<rateTypes.length; i++) {
			let row = {};
			row['rateType'] = rateTypes[i];

			for (var j=0; j<periods.length; j++) {
				row[periods[j]] = data.filter(x => (x['period'] == periods[j] && x['rateType'] == rateTypes[i]))[0]['forecastValue'];
			}

			ratesData.push(row);
    }
    
    // add columns to table as required
		let ratesTableColumns: Array<{}> = [{data: 'rateType'}];

		for (var i=0; i<periods.length; i++) {
			// to DOM
			$('#ratesTable thead tr').append('<th>' + periods[i] + '</th>');

			// to datatables definition
			ratesTableColumns.push({data: periods[i], className: "right-align"});

    }
    
    let self = this;

    this.table = this.DatatablesService.createDatatable(
      '#ratesTable',
      {
        data: ratesData,
        columns: ratesTableColumns,
        dom: 'fti',
        pageLength: 100,
        createdRow: function (row, data) {
          if (data['Current'] == null && data[periods[periods.length-1]] == null) {
            $("td", row).addClass("bg-light").addClass("text-uppercase").addClass("text-muted");
          }
        }
      }
    );

  }

  comparePeriods(first, second) {
    if (first.substr(-2) + first.substr(0, 1) < second.substr(-2) + second.substr(0, 1) && second != 'Current') {
      return -1;
    }
    if (first.substr(-2) + first.substr(0, 1) > second.substr(-2) + second.substr(0, 1) || second == 'Current') {
      return 1;
    }

    return 0;
  }

}
