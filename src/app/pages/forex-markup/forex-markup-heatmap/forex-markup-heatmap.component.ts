import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import * as d3v4 from 'd3';

declare var $: any;

@Component({
  selector: 'app-forex-markup-heatmap',
  templateUrl: './forex-markup-heatmap.component.html',
  styleUrls: ['./forex-markup-heatmap.component.scss']
})
export class ForexMarkupHeatmapComponent implements OnInit, OnDestroy {

  @Input() data;

  markupData = {};

  constructor(
    // private DatatablesService: DatatablesService
  ) { }

  ngOnInit() {
    this.markupData = JSON.parse(this.data);
    this.initializeChart('EUR-USD');
  }

  ngAfterViewInit() {
    $('#currency-select').val('EUR-USD');
  }

  ngOnDestroy() {
    $('rect[data-toggle="tooltip"]').tooltip('dispose');
  }

  objectKeys(object) {
    return Object.keys(object);
  }

  initializeChart(ccy) {
    let data = this.markupData[ccy];

    let margin = { top: 40, right: 200, bottom: 0, left: 60 },
      width = $('#markup_chart_container').width() - margin.left - margin.right,
      height = $('#markup_chart_container').height() - margin.top - margin.bottom,
      colors = ['#a50026', '#d73027', '#f46d43', '#fdae61', '#fee090', '#ffffbf', '#e0f3f8', '#abd9e9', '#74add1', '#4575b4', '#313695'].reverse();

    let categories_x = data.duration.length,
      categories_y = data.notional.length,
      gridSize = Math.min(
        height / categories_y,
        width / categories_x
      );

    width = gridSize * categories_x + margin.left + margin.right;
    height = gridSize * categories_y;
    let canvas_height = height + margin.top + margin.bottom;

    let xScale = d3v4.scaleBand().range([0, gridSize * categories_x]);
    let yScale = d3v4.scaleBand().range([0, height]);
    let xAxis = d3v4.axisTop().tickSizeInner(0);
    let yAxis = d3v4.axisLeft().tickSizeInner(0);

    // Clean canvas if it already existed previously
    $('rect[data-toggle="tooltip"]').tooltip('dispose');
    d3v4.select("#markup_chart").selectAll("*").remove();

    // Create the svg canvas
    let svg = d3v4.select("#markup_chart")
      .attr("catx", categories_x) // to retrieve information on resize
      .attr("caty", categories_y)
      .style("height", canvas_height + "px")
      .style("width", width + "px")
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let maxval_bps = data.markup_bps.reduce(function (a, b) { return Math.max(a, b); });
    let minval_bps = data.markup_bps.reduce(function (a, b) { return Math.min(a, b); });

    let colormap = d3v4.scaleQuantile().domain([Math.log(minval_bps), Math.log(maxval_bps)]).range(colors);

    let quantiles_pips: any;
    if (data.markup_pips.length > 0) {
      let maxval_pips = data.markup_pips.reduce(function (a, b) { return Math.max(a, b); });
      let minval_pips = data.markup_pips.reduce(function (a, b) { return Math.min(a, b); });

      quantiles_pips = d3v4.scaleQuantile().domain([Math.log(minval_pips), Math.log(maxval_pips)]).range(colors);

      quantiles_pips = quantiles_pips.quantiles().slice();
      quantiles_pips.unshift(Math.log(minval_pips));
    }

    let graph_data = [];
    for (let i = 0; i < data.markup_bps.length; i++) {
      if (typeof data.markup_pips[i] === 'undefined') {
        graph_data.push({ 'bps': data.markup_bps[i], 'pips': 0 });
      } else {
        graph_data.push({ 'bps': data.markup_bps[i], 'pips': data.markup_pips[i] });
      }
    }

    // Create the heatmap visualization
    svg.selectAll(".markup")
      .data(graph_data)
      .enter().append("g")
      .attr('transform', function (d, i) { return "translate(" + gridSize * (i % categories_x) + ", " + (height - gridSize * (Math.floor(i / categories_x) + 1)) + ")"; })
      .attr("class", "markup");

    let rects = svg.selectAll("g").append('rect');

    rects.attr("width", gridSize)
      .attr("height", gridSize)
      .attr("rx", 1)
      .attr("ry", 1)
      .style("fill", function (d) { return colormap(Math.log(d.bps)); })
      .style("stroke", "#fff")
      .style("stroke-width", "1px")
      .attr("data-toggle", "tooltip")
      .attr("data-html", "true")
      .attr("data-container", "#heatmap-card")
      .attr("title", function (d) { return 'basis points: ' + d.bps.toLocaleString('de', { maximumFractionDigits: 1, minimumFractionDigits: 1 }) + (d.pips !== 0 ? '</br>pips: ' + d.pips.toLocaleString('de', { maximumFractionDigits: 1, minimumFractionDigits: 1 }) : ''); });

    // LEGEND
    let color_quantiles = colormap.quantiles().slice();
    color_quantiles.unshift(Math.log(minval_bps));

    let legend_values = [];
    for (let i = 0; i < color_quantiles.length; i++) {
      if (typeof quantiles_pips === 'undefined') {
        legend_values.push({ 'bps': color_quantiles[i], 'pips': 0 });
      } else {
        legend_values.push({ 'bps': color_quantiles[i], 'pips': quantiles_pips[i] });
      }
    }

    svg.selectAll(".legend")
      .data(legend_values)
      .enter().append("g")
      .attr('transform', function (d, i) { return "translate(" + (categories_x + 1) * gridSize + ", " + (height - gridSize * (i + 1 + categories_y - colors.length)) + ")"; })
      .attr("class", "legend");

    let legends = svg.selectAll("g.legend").append('rect');

    legends.attr("width", gridSize)
      .attr("height", gridSize)
      .attr("rx", 1)
      .attr("ry", 1)
      .style("fill", function (d) { return colormap(d.bps); })
      .style("stroke", "#fff")
      .style("stroke-width", "1px");

    let texts = svg.selectAll("g.legend").append('text');

    texts.attr("text-anchor", "start")
      .attr('x', gridSize + 5)
      .attr('y', gridSize / 2 + 4)
      .attr("fill", '#000')
      .attr("font-family", 'Segoe UI')
      .attr("font-size", '9pt')
      .html(function (d) { return "&#8805; " + Math.exp(d.bps).toLocaleString('de', { maximumFractionDigits: 1, minimumFractionDigits: 1 }) + ' bps' + (d.pips !== 0 ? ' | ' + Math.exp(d.pips).toLocaleString('de', { maximumFractionDigits: 1, minimumFractionDigits: 1 }) + ' pips' : ''); })
      .attr("class", "rect-text");;

    // Add the horizontal labels
    let names_x = [];
    data.duration.forEach(function (d) {
      names_x.push(d);
    });
    xScale.domain(names_x);
    xAxis.scale(xScale);
    svg.append("g")
      .attr("class", "x axis")
      .attr("names", names_x)
      .call(xAxis)
      .selectAll("text")
      .attr("y", 0)
      .attr("dy", "-.5em")
      .style("text-anchor", "middle")
      .style("font-family", "Segoe UI")
      .style("font-size", "9pt")

    // Add the vertical labels
    let names_y = [];
    data.notional.forEach(function (d) {
      names_y.push(d);
    });
    names_y = names_y.reverse();
    yScale.domain(names_y);
    yAxis.scale(yScale);

    svg.append("g")
      .attr("class", "y axis")
      .attr("names", names_y)
      .call(yAxis)
      .selectAll("text")
      .style("text-anchor", "end")
      .style("font-family", "UniCredit")
      .style("font-size", "9pt");

    svg.selectAll('.axis path')
      .style("stroke", "None")
      .style("fill", "None");

    // Axis titles
    svg.append("text")
      .attr("class", "title-x")
      .attr("text-anchor", "middle")
      .attr("transform", "translate(" + ((width - margin.left - margin.right) / 2) + ", " + (-30) + ")")
      .attr("font-size", "9pt")
      .text("duration (months)");

    svg.append("text")
      .attr("class", "title-y")
      .attr("text-anchor", "middle")
      .attr("transform", "translate(" + (-50) + ", " + (height / 2) + ")rotate(-90)")
      .attr("font-size", "9pt")
      .text("notional (€)");

    // TOOLTIPS
    $('rect[data-toggle="tooltip"]').each(function () {
      $(this).tooltip({
        container: '#markupChartContainer',
        delay: {
          show: 50,
          hide: 50
        }
      });
    })
  }

  resizeMarkupChart() {
    // Reset canvas size
    $('#markup_chart_container').addClass('w-100');
    d3v4.select("#markup_chart")
      .style("height", "calc(100vh - 300px)")
      .style("width", "100%");

    let margin = { top: 40, right: 200, bottom: 0, left: 60 },
      width = $('#markup_chart_container').width() - margin.left - margin.right,
      height = $('#markup_chart_container').height() - margin.top - margin.bottom;

    let categories_x = parseInt($('#markup_chart').attr("catx")),
      categories_y = parseInt($('#markup_chart').attr("caty")),
      gridSize = Math.min(
        height / categories_y,
        width / categories_x
      );

    width = gridSize * categories_x + margin.left + margin.right;
    height = gridSize * categories_y;
    let canvas_height = gridSize * categories_y + margin.top + margin.bottom;

    // Update the canvas size
    d3v4.select("#markup_chart")
      .style("height", canvas_height + "px")
      .style("width", width + "px");

    var svg = d3v4.select("#markup_chart");

    // Update the range of the scale with new width/height
    let xScale = d3v4.scaleBand().range([0, gridSize * categories_x]);
    let yScale = d3v4.scaleBand().range([0, height]);

    let xAxis = d3v4.axisTop().tickSizeInner(0);
    xScale.domain($(".x.axis").attr("names").split(","));
    xAxis.scale(xScale);

    let yAxis = d3v4.axisLeft().tickSizeInner(0);
    yScale.domain($(".y.axis").attr("names").split(","));
    yAxis.scale(yScale);

    d3v4.select(".x.axis")
      .call(xAxis)
      .selectAll("text")
      .attr("y", 0)
      .attr("dy", "-.5em")
      .style("text-anchor", "center");

    d3v4.select(".y.axis")
      .call(yAxis)
      .selectAll("text")
      .style("text-anchor", "end");

    // Axis titles
    d3v4.select(".title-x")
      .attr("transform", "translate(" + ((width - margin.left - margin.right) / 2) + ", " + (-30) + ")");

    d3v4.select(".title-y")
      .attr("transform", "translate(" + (-50) + ", " + (height / 2) + ")rotate(-90)");

    // Heatmap tiles
    svg.selectAll('g.markup')
      .attr('transform', function (d, i) { return "translate(" + gridSize * (i % categories_x) + ", " + (height - gridSize * (Math.floor(i / categories_x) + 1)) + ")"; });

    let n_legend_items = $('g.legend').length;
    svg.selectAll('g.legend')
      .attr('transform', function (d, i) { return "translate(" + (categories_x + 1) * gridSize + ", " + (height - gridSize * (i + 1 + categories_y - n_legend_items)) + ")"; });

    svg.selectAll('rect')
      .attr("width", gridSize)
      .attr("height", gridSize);

    svg.selectAll("g.legend text")
      .attr('x', gridSize + 5)
      .attr('y', gridSize / 2 + 4);

      $('#markup_chart_container').removeClass('w-100');
  }
}