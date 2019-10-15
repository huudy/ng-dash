import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { DatatablesService } from '../../../services/datatables.service';

declare var $: any;

@Component({
  selector: 'app-forex-table',
  templateUrl: './forex-table.component.html',
  styleUrls: ['./forex-table.component.scss']
})
export class ForexTableComponent implements  OnInit, OnChanges {

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
    let pairs = [];

    for (let i=0; i<data.length; i++) {
			if ( periods.indexOf(data[i]['period']) == -1 ) {
				periods.push(data[i]['period']);
			}
			if ( pairs.indexOf(data[i]['currencyPair']) == -1 ) {
				pairs.push(data[i]['currencyPair']);
			}
    }
    periods.sort((first, second) => this.comparePeriods(first, second));
    
    let forexData = [];

		for (let i=0; i<pairs.length; i++) {
			let row = {};
			row['currencyPair'] = pairs[i];
			row['exchangeRate'] = data.filter(x => (x['currencyPair'] == pairs[i]))[0]['currencyRate'];
			row['average200Days'] = data.filter(x => (x['currencyPair'] == pairs[i]))[0]['average200Days'];

			row['momentum'] = data.filter(x => (x['currencyPair'] == pairs[i]))[0]['momentum'];

			for (var j=0; j<periods.length; j++) {
				row[periods[j]] = data.filter(x => (x['period'] == periods[j] && x['currencyPair'] == pairs[i]))[0]['forecastValue'];
			}

			forexData.push(row);
		}

		// add columns to table as required
		let forexTableColumns = [{data: 'currencyPair'}, {data: 'exchangeRate', className: "right-align"}, {data: 'average200Days', className: "right-align"}, {data: 'momentum', className: "right-align"}];

		for (var i=0; i<periods.length; i++) {
			// to DOM
			$('#forexTable thead tr').append('<th>' + periods[i] + '</th>');
			// to datatables definition
			forexTableColumns.push({data: periods[i], className: "right-align"});
		}

    let self = this;

    this.table = this.DatatablesService.createDatatable(
      '#forexTable',
      {
        data: forexData,
        columns:forexTableColumns,
        dom: 'fti',
        pageLength: 100,
        order: [[0, 'asc']],
        createdRow: function (row, data) {
          $('td:eq(3)', row).html(self.buildCaret(data['momentum']));
        }
      }
    );
  }

  buildCaret(value) {
    if (value > 0) {
      return '<span style="font-weight: bold; color: #1a9641;">&#9650</span>'
    } else if (value < 0) {
      return '<span style="font-weight: bold; color: #d7191c;">&#9660</span>'
    } else {
      return '<span style="font-weight: bold; color: #666;">&#9658</span>'
    }
  }

  comparePeriods(first, second) {
    if (first.substr(-2) + first.substr(0, 1) < second.substr(-2) + second.substr(0, 1)) {
      return -1;
    }
    if (first.substr(-2) + first.substr(0, 1) > second.substr(-2) + second.substr(0, 1)) {
      return 1;
    }

    return 0;
  }

}
