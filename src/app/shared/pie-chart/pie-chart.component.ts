import { Component, OnInit, AfterViewInit, Input} from '@angular/core';
import * as d3 from 'd3';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  constructor() { }
  @Input() chartId;
  @Input() chartData;

  ngOnInit(): void {
  }
  ngAfterViewInit(){
    var data = this.chartData;
    console.log(data,'piechartdata');
    var text = "";
    
    var width = 330;
    var height = 260;
    var thickness = 40;
    var duration = 750;
    
    var radius = Math.min(width, height) - 180;
    var color = d3.scaleLinear()
    .domain([1, 0, 1])
    .range(["#87D3F2", "steelblue"]);

    var svg = d3.select('#' + this.chartId).append('svg')
    .attr('class', 'pie')
    .attr('width', width)
    .attr('height', height);
    
    var g = svg.append('g')
    .attr('transform', 'translate(' + (width/2 - 10) + ',' + (height/2 -20 ) + ')');
    
    var arc = d3.arc()
    .innerRadius(radius-80)
    .outerRadius(radius+30);
    
    var pie = d3.pie()
    .value(function(d) { return d.value; })
    .sort(null);
    
    var path = g.selectAll('path')
    .data(pie(data))
    .enter()
    .append("g")
    .on("mouseover", function(d) {
          let g = d3.select(this)
            .style("cursor", "pointer")
            .style("fill", "black")
            .append("g")
            .attr("class", "text-group");
     
          g.append("text")
            .attr("class", "name-text")
            .text(`${d.data.name}`)
            .attr('text-anchor', 'middle')
            .attr('dy', '-1.2em');
      
          g.append("text")
            .attr("class", "value-text")
            .text(`${d.data.value}`)
            .attr('text-anchor', 'middle')
            .attr('dy', '.6em');
        })
      .on("mouseout", function(d) {
          d3.select(this)
            .style("cursor", "none")  
            .style("fill", color(this._current))
            .select(".text-group").remove();
        })
      .append('path')
      .attr('d', arc)
      .attr('fill', (d,i) => color(i))
      .on("mouseover", function(d) {
          d3.select(this)     
            .style("cursor", "pointer")
            .style("fill", "black");
        })
      .on("mouseout", function(d) {
          d3.select(this)
            .style("cursor", "none")  
            .style("fill", color(this._current));
        })
      .each(function(d, i) { this._current = i; });
    
    
    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '.35em')
      .text(text);
  }
}
