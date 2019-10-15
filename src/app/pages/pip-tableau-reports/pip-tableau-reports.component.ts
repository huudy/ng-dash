import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-pip-tableau-reports',
  templateUrl: './pip-tableau-reports.component.html',
  styleUrls: ['./pip-tableau-reports.component.scss']
})
export class PipTableauReportsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $.getScript('https://tableau.intranet.unicreditgroup.eu/javascripts/api/viz_v1.js');
  }

  pipTableauTabToggle($event) {
    let tab = event.currentTarget;

		// hide all
		$('#pipTableauSummary').collapse('hide');
		$('#pipTableauSummaryAggregation').collapse('hide');
		$('#pipTableauVolume').collapse('hide');
		$('#pipTableauProductDetails').collapse('hide');

		// get id of tableau to show
		var id = $(tab).children().attr('data-target');

		// show
		$('#' + id).collapse('show');
	};

}
