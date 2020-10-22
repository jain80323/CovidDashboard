import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import * as d3 from 'd3';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  constructor() { }
  @Input() chartId;
  @Input() chartData;

  data;
  containerElement;
  containerWidth;
  w;
  h;
  margin;
  width;
  height;
  svg;
  layout;

  ngOnInit(): void {
  }

ngAfterViewInit() {

     this.data = this.chartData;

  const margin = {top: 55, right: 10, bottom: 40, left: 10},
  width = 1570 - margin.left - margin.right,
  height = 205 - margin.top - margin.bottom;

// Notice the change of Scale to Band and how the scale now starts at zero
  var x = d3.scaleBand()
        .range([0, 945])
        .padding(0.5);

  var y = d3.scaleLinear()
  .range([height, 0]);

  var svg = d3.select('#' + this.chartId).append('svg')
  .attr('width', width + margin.left + margin.right + 100)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + (margin.left + 50) + ',' + (margin.top - 50) + ')');

  x.domain(this.data.map(function(d) { return d.state; }));
  y.domain([0, d3.max(this.data, function(d) { return d.deceased; })]);

// ===========================================================
// Axes
  svg.append('g')
    .attr('class', 'axis axis--x')
    .attr('transform', 'translate(0,' + (height + 10) + ')')
    .call(d3.axisBottom(x)
    .tickSize(0))
    .selectAll('text')
    .style('text-anchor', 'end')
    .attr('dx', '0.4em')
    .attr('dy', '.45em')
    .attr('transform', 'rotate(-75)');

  svg.append('g')
    .attr('class', 'axis axis--y')
    .call(d3.axisLeft(y)
    .ticks(5)
    .tickSize(0))
    .selectAll('text')
    .style('text-anchor', 'end')
    .attr('dx', '0.4em')
    .attr('dy', '.45em');
    // .append('text');

// Adding Bars

  svg.selectAll('.bar')
    .data(this.data)
    .enter()
    .append('rect')
    .text(d => d.deceased)
    .attr('class', 'bar')
    .attr('x', d => x(d.state))
    .attr('width', x.bandwidth() + 10)
    .attr('y', d => y(d.deceased) - 5)
    .attr('height', function(d) { return height - y(d.deceased); })
    .style('margin-top', function(d) { return '10px'; });

  svg.selectAll('.text')
    .data(this.data)
    .enter()
    .append('text')
    .attr('x', d => x(d.state))
    .attr('width', x.bandwidth())
    .attr('y', d => y(d.deceased) - 5)
    .attr('height', function(d) { return height - y(d.deceased); })
    .attr('dy', '-1em')
    .attr('dx', '0.7em')
    .attr('font-family', 'EYInterstate')
    .attr('fill', '#2E2E38')
    .attr('font-size', '14px')
    .text(function(d) { return d.deceased; });

    var threshold = d3.max(this.data, function(d) { return d.deceased; });
    // Threshold line-------------
      svg.append('g')
          .attr('transform', 'translate(0, '+ y(threshold) +')')
          .append('line')
          .attr('x1', 20)
          .attr('x2', width - 40)
          .style('stroke', '#F95D54')
          .style('stroke-width', '0.4px');

  }
 }
