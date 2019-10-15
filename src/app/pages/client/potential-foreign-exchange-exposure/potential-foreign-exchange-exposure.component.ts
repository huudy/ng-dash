import { Component, OnInit, Input, OnDestroy, OnChanges } from '@angular/core';
import { WorldMap } from './WorldMap';

import * as d3v4 from 'd3';
import * as topojson from 'topojson';

declare var $: any;

@Component({
  selector: 'app-potential-foreign-exchange-exposure',
  templateUrl: './potential-foreign-exchange-exposure.component.html',
  styleUrls: ['./potential-foreign-exchange-exposure.component.scss']
})
export class PotentialForeignExchangeExposureComponent implements OnInit, OnChanges, OnDestroy {

  @Input() data;
  width = 0;
  height = 0;

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges() {
    this.data = JSON.parse(this.data);
    if (!!this.data) {
      $('.tooltip-d3').remove();

      this.drawChart();

      let self = this;
      d3v4.select(window).on('resize', null);
      window.addEventListener('resize', function () { self.resizeMapChart(self); });
    }
  }

  ngOnDestroy() {
    d3v4.select(window).on('resize', null);
    $('.tooltip-d3').remove();
  }

  getDimensions() {
    let margin = { top: 0, right: 0, bottom: 0, left: 0 };
    this.width = $('#potentialForeignExchangeExposureChart').width() - margin.left - margin.right;
    this.height = $('#potentialForeignExchangeExposureChart').height() - margin.top - margin.bottom;
  }

  drawChart() {
    this.getDimensions();

    let self = this;

    function colorLookup(value) {
      switch (value) {
        case 'active':
          return '#1f78b4';
        case 'past':
          return '#a6cee3';
        case 'veryhigh':
          return '#e12200';
        case 'high':
          return '#F57600';
        case 'moderate':
          return '#FAC400';
        default:
          return '#a7a7a7'
      }
    }

    let path = d3v4.geoPath();

    d3v4.select("#potentialForeignExchangeExposureChart").selectAll("*").remove();
    let svg = d3v4.select("#potentialForeignExchangeExposureChart")
      .append("svg")
      .attr("width", this.width)
      .attr("height", this.height)
      .append('g')
      .attr('class', 'map');

    let projection = d3v4.geoMercator()
      .scale(this.width / 6)
      .translate([this.width / 2, this.height / 1.5]);

    path = d3v4.geoPath().projection(projection);

    let mapData = WorldMap.world;

    mapData.features.forEach(function (d) { d['info'] = self.data[d.id] });

    let tool = d3v4.select("body")
      .append("div")
      .attr("class", "tooltip-d3")
      .style("display", 'none')
      .style('position', 'absolute')
      .style('padding', '5px')
      .style('font-family', 'Segoe UI')
      .style('font-size', '0.875rem')
      .style('border-radius', '.125rem')
      .style('background-color', '#000')
      .style('color', '#fff')
      .style('opacity', '0.9')
      .style('width', '250px')
      .style('text-align', 'center');

    let mouseover = function (d) {
      d3v4.select(this)
        .style("opacity", 1)
        .style("stroke", "white")
        .style("stroke-width", 3);
    };

    let mousemove = function (d) {
      if (!!d['info']) {
        tool.style("left", d3v4.event.pageX - 125 + "px");
        tool.style("top", d3v4.event.pageY - 145 + "px");
        tool.style("display", "inline-block");
        tool.html('<div class="font-weight-bold">' + d.properties.name + '</div>Currency: ' + d['info']['currency'] + '</br>' + d['info']['reason']);
      }
    };

    let mouseout = function (d) {
      tool.style("display", "none");

      d3v4.select(this)
        .style("opacity", 0.8)
        .style("stroke", "white")
        .style("stroke-width", 0.3);
    };

    svg.append("g")
      .attr("class", "countries")
      .selectAll("path")
      .data(mapData.features)
      .enter().append("path")
      .attr("d", path)
      .style("fill", function (d) { return colorLookup(!!d['info'] ? d['info']['fillKey'] : ''); })
      .style('stroke', 'white')
      .style('stroke-width', 1.5)
      .style("opacity", 0.8)
      .style("stroke", "white")
      .style('stroke-width', 0.3)
      .attr("title", function (d) { return 'x' })
      .on('mouseover', (d) => mouseover(d))
      .on("mousemove", (d) => mousemove(d))
      .on('mouseout', (d) => mouseout(d));

    svg.append("path")
      .datum(topojson.mesh(mapData.features, function (a, b) { return a.id !== b.id; }))
      .attr("class", "names")
      .attr("d", path);

    //Create static data for bubbles:
    let countries = [
      { id: "SGP", long: 103.851959, lat: 1.290270, properties: { name: "Singapore" }, info: { currency: '', fillkey: '', reason: '', score: 0 } }, 		// Singapore
      { id: "HKG", long: 114.15769, lat: 22.28552, properties: { name: "Hong Kong" }, info: { currency: '', fillkey: '', reason: '', score: 0 } }, 		// Hong Kong
      { id: "TWN", long: 120.9605179, lat: 23.6978092, properties: { name: "Taiwan" }, info: { currency: '', fillkey: '', reason: '', score: 0 } }, 		// Taiwan
      { id: "CHE", long: 8.227512, lat: 46.818188, properties: { name: "Switzerland" }, info: { currency: '', fillkey: '', reason: '', score: 0 } }, 		// Switzerland
    ];

    countries = countries.filter( c => Object.keys(self.data).includes(c.id) );
    countries.forEach(function (d) { d['info'] = self.data[d.id] });

    svg
      .append("g")
      .attr("class", "info-bubbles")
      .selectAll("circle")
      .data(countries)
      .enter()
      .append("circle")
      .attr("cx", function (d) { return projection([d.long, d.lat])[0] })
      .attr("cy", function (d) { return projection([d.long, d.lat])[1] })
      .attr("r", 6)
      .attr("class", "circle")
      .style("fill", function (d) { return colorLookup(!!d['info'] ? d['info']['fillKey'] : ''); })
      .style("stroke", "white")
      .style('stroke-width', 1.5)
      .style("opacity", 0.8)
      .attr("title", function (d) { return 'x' })
      .on('mouseover', (d) => mouseover(d))
      .on("mousemove", (d) => mousemove(d))
      .on('mouseout', (d) => mouseout(d));

  }

  resizeMapChart(self) {
    if ($('#potentialForeignExchangeExposureChart').width() != self.width) {
      self.drawChart();
    }
  }

}
