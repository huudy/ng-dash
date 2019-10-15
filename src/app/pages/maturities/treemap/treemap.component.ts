import { Component, OnInit, Input, OnDestroy, OnChanges } from '@angular/core';

import * as d3v4 from 'd3';
// declare var d3v4: any;
declare var $: any;

@Component({
  selector: 'app-treemap',
  templateUrl: './treemap.component.html',
  styleUrls: ['./treemap.component.scss']
})
export class TreemapComponent implements OnInit, OnDestroy, OnChanges {

  @Input() data;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    $('#chart').empty();
    $('.tooltip-treemap').remove();
    this.buildTreemap();
  }

  ngOnDestroy() {
    $('.tooltip-treemap').remove();
  }

  buildTreemap() {
    var width = 100,
      height = 100,
      x = d3v4.scaleLinear().domain([0, width]).range([0, width]),
      y = d3v4.scaleLinear().domain([0, height]).range([0, height]);

    var format = d3v4.format(",d");

    var color = d3v4.scaleOrdinal()
      // .range(["#00AFD0", "#C0E4ED", "#4C4C4C", "#B2B2B2", "#9FCA78", "#A33694", "#F58523" ,"#EFB587", "#EA5C4D", "#FEF1CC", "#388BCA", "#004F95"]
      // .range(['#440154','#482173','#433e85','#38588c','#2d708e','#25858e','#1e9b8a','#2ab07f','#52c569','#86d549','#c2df23', '#fde725']
      .range(['#3182bd', '#6baed6', '#9ecae1', '#e6550d', '#fd8d3c', '#fdae6b', '#31a354', '#74c476', '#a1d99b', '#756bb1', '#9e9ac8', '#bcbddc']
        // .range(['#393b79', '#5254a3', '#6b6ecf', '#637939', '#8ca252', '#b5cf6b', '#8c6d3v41', '#bd9e39', '#e7ba52', '#843c39', '#ad494a', '#d6616b']
        .map(function (c) { c = d3v4.rgb(c); c['opacity'] = 1; return c; }));

    var textcolor = d3v4.scaleOrdinal()
      // .range(["#FFF", "#000", "#FFF", "#000", "#000", "#FFF", "#000" ,"#000", "#FFF", "#000", "#FFF", "#FFF"]
      .range(["#FFF", "#000", "#000", "#FFF", "#000", "#000", "#FFF", "#000", "#000", "#FFF", "#000", "#000"]
        .map(function (c) { c = d3v4.rgb(c); c['opacity'] = 1; return c; }));

    var treemap = d3v4.treemap()
      .size([width, height])
      .paddingInner(0)
      .paddingOuter(0.3)
      .paddingLeft(0.1)
      .round(false);

    // select aggregation level and number of buckets
    var mod = 1;
    var buckets = 12;
    switch ($('#maturitiesTimeFrameButtons .btn.active input').attr('id')) {
      case 'matTimeOne':
        mod = 1;
        buckets = 12;
        break;
      case 'matTimeTwo':
        mod = 7;
        buckets = 4;
        break;
      case 'matTimeThree':
        mod = 7;
        buckets = 12;
        break;
      default:
        mod = 1;
        buckets = 12;
        break;
    }

    //let data = $.grep(this.data, function (n, i) { return n['daysRemaining'] < mod * buckets });
    let data = this.data.filter(transaction => transaction['daysRemaining'] < mod * buckets);
    data.forEach(function (e) { e['value'] = Math.sqrt(e['notional']); });

    var uniqueParents = [];
    for (let i = 0; i < data.length; i++) {
      if (uniqueParents.indexOf(Math.floor(data[i]['daysRemaining'] / mod)) === -1) {
        uniqueParents.push(Math.floor(data[i]['daysRemaining'] / mod));
      }
    }

    // set legend
    $('#maturitiesTreemap .badge').addClass('d-none');
    var first_maturity = null;
    for (let i = 0; i < buckets; i++) {
      var dates = data.filter(date => date['daysRemaining'] == i);
      if (dates.length > 0) {
        first_maturity = i;
        break
      }
    }

    function addDays(date, days) {
      date = new Date(date);
      return new Date(date.setDate(date.getDate() + days));
    }

    /*Date.prototype.addDays = function (days) {
      var date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    }*/

    if (dates.length > 0 && first_maturity !== null) {
      var first_date = dates[0]['maturityDate'];
      var date = new Date(first_date);
      date = addDays(date, -first_maturity);
      for (let i = 0; i < buckets; i++) {
        let badgeText: string;
        switch (mod) {
          case 1:
            badgeText = addDays(date, i * mod).toLocaleDateString('en-DE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
            break;
          case 7:
            badgeText = addDays(date, i * mod).toLocaleDateString('en-DE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) + ' - ' + addDays(date, (i + 1) * mod - 1).toLocaleDateString('en-DE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
            break;
          default:
            badgeText = 'error';
            break;
        }
        $('#days_remaining_' + i).html(badgeText);
        $('#days_remaining_' + i).removeClass('d-none');
      }
    }

    for (let i = 0; i <= buckets; i++) {
      data.push({ "tradeId": i, "daysRemaining": mod * -1 });
    }
    data.push({ "tradeId": -1, "daysRemaining": null });

    var root = d3v4.stratify(data)
      .id(function (d) { return d['tradeId']; })
      .parentId(function (d) { return (d['daysRemaining'] == null ? null : Math.floor(d['daysRemaining'] / mod)); })
      (data);

    root = root.sum(function (d) { return d.value; });

    treemap(root);

    function get_cname(val) {
      for (let i = 0; i < data.length; i++) {
        if (data[i]['tradeId'] === val) {
          // return data[i]['customer name'].match(/([^<>]+)(?=<)/g)[0];
          return data[i]['clientName'];
        }
      }
    };

    function get_product(val) {
      for (let i = 0; i < data.length; i++) {
        if (data[i]['tradeId'] === val) {
          // return data[i]['product'].match(/([^<>]+)(?=<)/g)[0];
          return data[i]['product'];
        }
      }
    };

    var tool = d3v4.select("body")
      .append("div")
      .attr("class", "tooltip-treemap")
      .style("display", 'none')
      .style('position', 'absolute')
      .style('padding', '5px')
      .style('font-family', 'Segoe UI')
      .style('font-size', '0.875rem')
      .style('border-radius', '.125rem')
      .style('background-color', '#000')
      .style('color', '#fff')
      .style('opacity', '0.9')
      .style('width', '200px')
      .style('text-align', 'center');

    // ::after styling not possible

    d3v4.select("#chart")
      .selectAll(".node")
      .data(root.leaves())
      .enter().append("div")
      .attr("class", "node")
      .style("left", function (d) { return x(d.x0) + "%"; })
      .style("top", function (d) { return y(d.y0) + "%"; })
      .style("width", function (d) { return x(d.x1) - x(d.x0) + "%"; })
      .style("height", function (d) { return y(d.y1) - y(d.y0) + "%"; })
      .style("background", function (d) { while (d.depth > 1) d = d.parent; return color(d.id); })
      .style("color", function (d) { while (d.depth > 1) d = d.parent; return textcolor(d.id); })
      .on("mousemove", function (d) {
        tool.style("left", d3v4.event.pageX - 100 + "px");
        tool.style("top", d3v4.event.pageY - 85 + "px");
        tool.style("display", "inline-block");
        tool.html("trade id: " + d.id + "<br>" + "notional: " + format(Math.pow(d.value, 2)) + " €" + "<br>" + "currency pair: " + d.data.currencyPair)
      })
      .on("mouseout", function (d) { tool.style("display", "none"); })
      .append("div")
      .attr("class", "node-label")
      .text(function (d) { if (d.y1 - d.y0 > 3) { return get_cname(d.id); } })
      .append("div")
      .attr("class", "node-value")
      .text(function (d) { if (d.y1 - d.y0 > 5) { return get_product(d.id); } })
      .style("color", function (d) { while (d.depth > 1) d = d.parent; return textcolor(d.id); });
  };

}
