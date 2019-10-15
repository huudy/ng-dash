import { Component, OnInit, Input } from '@angular/core';
import 'chartjs-plugin-annotation';

declare var $: any;

@Component({
	selector: 'app-technical-analysis-chart',
	templateUrl: './technical-analysis-chart.component.html',
	styleUrls: ['./technical-analysis-chart.component.scss']
})
export class TechnicalAnalysisChartComponent implements OnInit {

	@Input() data;

	constructor() { }

	ngOnInit() {
		if (!!this.data) {
			this.data = JSON.parse(this.data);
			this.buildComponent();
		}
	}

	buildComponent() {
		for (let key in this.data) {
			$('#technicalAnalysisCurrencySelect').append($('<option></option>').attr('value', key).text(key));
		}

		this.makeLineChart();
		this.makeMACDChart();
		let updateCharts = this.updateCharts;

		$('#technicalAnalysisCurrencySelect').change(function () {
			updateCharts($(this).val());
		});

		$('#technicalAnalysisCurrencySelect').change();
	}

	makeLineChart() {
		let canvas = $('#LineChart');
		let context = canvas.get(0).getContext('2d');

		let styleConfig = {
			type: 'bar',
			options: {
				all_data: this.data,
				maintainAspectRatio: false,
				responsive: true,
				tooltips: {
					cornerRadius: 1,
					position: 'nearest',
					mode: 'index',
					intersect: false,
					callbacks: {
						label: function (tooltipItem, data) {
							return data.datasets[tooltipItem.datasetIndex].label + ': ' + tooltipItem.yLabel.toLocaleString();
						}
					}
				},
				legend: { display: false },
				chartArea: { backgroundColor: '#f7f7f7' },
				scales: {
					xAxes: [{
						gridLines: { display: true, color: '#fff', lineWidth: 2 },
						ticks: { autoSkip: true, maxTicksLimit: 13, maxRotation: 0 }//, fontColor: '#fff'}
					}],
					yAxes: [{
						gridLines: { display: false },
						scaleLabel: {
							display: true,
							labelString: ''
						}
					}]
				}
			}
		};

		let gradientFill = context.createLinearGradient(0, 50, 0, 350);
		gradientFill.addColorStop(0, "rgba(0, 175, 208, 0.5");
		gradientFill.addColorStop(1, "rgba(0, 175, 208, 0");

		let dataConfig = {
			data: {
				labels: [],
				datasets: [
					{
						label: 'spot rate',
						type: 'line',
						borderColor: '#00AFD0',
						backgroundColor: gradientFill,
						borderWidth: 0.1,
						pointRadius: 0,
						data: [],
						tension: 0,
						fill: true
					}, {
						label: 'moving average',
						type: 'line',
						borderColor: '#E01E25',
						backgroundColor: '#E01E25', // for legend only
						borderWidth: 3,
						pointRadius: 0,
						data: [],
						fill: false
					}
				]
			}
		};

		let config = $.extend(true, styleConfig, dataConfig);
		new Chart(
			context,
			config
		);
	};

	makeMACDChart() {
		let canvas = $('#macdChart');
		let context = canvas.get(0).getContext('2d');

		let styleConfig = {
			type: 'bar',
			options: {
				all_data: this.data,
				maintainAspectRatio: false,
				responsive: true,
				tooltips: {
					cornerRadius: 1,
					position: 'nearest',
					mode: 'index',
					intersect: false,
					callbacks: {
						label: function (tooltipItem, data) {
							return data.datasets[tooltipItem.datasetIndex].label + ': ' + tooltipItem.yLabel.toLocaleString();
						}
					}
				},
				legend: { display: false },
				chartArea: { backgroundColor: '#f7f7f7' },
				scales: {
					xAxes: [{
						gridLines: { display: true, color: '#fff', lineWidth: 2 },
						ticks: { autoSkip: true, maxTicksLimit: 13, maxRotation: 0 },
						barPercentage: 0.75,
						categoryPercentage: 1
					}],
					yAxes: [{
						gridLines: { display: false },
						scaleLabel: {
							display: true,
							labelString: 'MACD'
						},
						beforeBuildTicks: function (scale) { scale.max = Math.max(Math.abs(scale.max), Math.abs(scale.min)); scale.min = -Math.max(Math.abs(scale.max), Math.abs(scale.min)); }
					}]
				},
				annotation: {
					annotations: []
				}
			}
		};

		let gradientFill = context.createLinearGradient(0, 36, 0, 90) // magic number to align the gradient
		gradientFill.addColorStop(1, "#b2182b");
		gradientFill.addColorStop(0.83, "#ef8a62");
		gradientFill.addColorStop(0.55, "#fddbc7"); // should be .67 but is adjusted for visibility
		gradientFill.addColorStop(0.50, "#f7f7f7");
		gradientFill.addColorStop(0.45, "#d1e5f0"); // should be .33 but is adjusted for visibility
		gradientFill.addColorStop(0.17, "#67a9cf");
		gradientFill.addColorStop(0, "#2166ac");

		let dataConfig = {
			data: {
				labels: [],
				datasets: [
					{
						label: 'MACD',
						type: 'line',
						borderColor: '#A33694',
						backgroundColor: '#A33694',
						borderWidth: 3,
						pointRadius: 0,
						data: [],
						tension: 0,
						fill: false
					}, {
						label: 'signal',
						type: 'line',
						borderColor: '#388BCA',
						backgroundColor: '#388BCA',
						borderWidth: 3,
						pointRadius: 0,
						data: [],
						tension: 0,
						fill: false
					}, {
						label: 'divergence',
						type: 'bar',
						backgroundColor: gradientFill,
						borderWidth: 0,
						data: [],
						fill: true
					}
				]
			}
		};

		let config = $.extend(true, styleConfig, dataConfig);
		new Chart(
			context,
			config
		);
	}

	updateCharts(currencyPair: string) {
		let fxChart;
		let macdChart;

		Chart.helpers.each(Chart.instances, function (instance) {
			if (instance.chart.canvas.id == 'LineChart') {
				fxChart = instance.chart;
			}
			if (instance.chart.canvas.id == 'macdChart') {
				macdChart = instance.chart;
			}
		});

		fxChart.data.labels = fxChart.options.all_data[currencyPair]['date'];
		fxChart.data.datasets[0].data = fxChart.options.all_data[currencyPair]['rate'];
		fxChart.data.datasets[1].data = fxChart.options.all_data[currencyPair]['ma'];
		fxChart.options.scales.yAxes[0].scaleLabel.labelString = currencyPair;
		fxChart.update();

		macdChart.data.labels = macdChart.options.all_data[currencyPair]['date'];
		macdChart.data.datasets[0].data = macdChart.options.all_data[currencyPair]['MACD'];
		macdChart.data.datasets[1].data = macdChart.options.all_data[currencyPair]['signal'];
		macdChart.data.datasets[2].data = macdChart.options.all_data[currencyPair]['divergence'];

		let annotations = [];
		// buy
		for (var i = 0; i < macdChart.options.all_data[currencyPair]['buy'].length; i++) {
			annotations.push({
				type: 'line',
				mode: 'vertical',
				borderColor: 'rgba(0,0,0,0.3)',
				value: macdChart.options.all_data[currencyPair]['buy'][i],
				borderWidth: 2,
				scaleID: 'x-axis-0',
				label: {
					content: 'buy',
					enabled: true,
					// fontFamily: 'UniCredit',
					fontSize: 9,
					cornerRadius: 1,
					backgroundColor: 'rgba(0,0,0,0.5)',
					position: 'bottom',
					yAdjust: 5
				}
			});
		}
		// sell
		for (var i = 0; i < macdChart.options.all_data[currencyPair]['sell'].length; i++) {
			annotations.push({
				type: 'line',
				mode: 'vertical',
				borderColor: 'rgba(0,0,0,0.3)',
				value: macdChart.options.all_data[currencyPair]['sell'][i],
				borderWidth: 2,
				scaleID: 'x-axis-0',
				label: {
					content: 'sell',
					enabled: true,
					// fontFamily: 'UniCredit',
					fontSize: 9,
					cornerRadius: 1,
					backgroundColor: 'rgba(0,0,0,0.5)',
					position: 'top',
					yAdjust: 5
				}
			});
		}
		macdChart.options.annotation.annotations = annotations;
		macdChart.update();

		// add card title
		$('#technicalAnalysisChartLabel').text(
			currencyPair + ': ' + currencyPair.substr(4, 3) +
			(macdChart.options.all_data[currencyPair]['type'] === 'sell' ? ' exporters' : ' importers') +
			' may profit from securing current price levels'
		);

		// add link
		$('#btnFXChart').attr(
			"onclick",
			"publicRouter('index/foreignExchangeExposure;search=%22" + currencyPair.substr(0, 3) + " - " + (macdChart.options.all_data[currencyPair]['type'] === 'sell' ? 'sell' : 'buy') + " " + currencyPair.substr(-3) + "%22 ," + currencyPair.substr(-3) + "')"
		);
	}

}
