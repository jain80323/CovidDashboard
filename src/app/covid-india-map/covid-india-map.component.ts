import { Component, Inject, NgZone, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { StateDataService} from '../services/state-data.service';
import { DistrictWiseService } from '../services/district-wise.service';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_india2019High from "@amcharts/amcharts4-geodata/india2019High";
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { AllTotaldData,IndiaMapData } from '../table/tableModal';

@Component({
  selector: 'app-covid-india-map',
  templateUrl: './covid-india-map.component.html',
  styleUrls: ['./covid-india-map.component.css']
})
export class CovidIndiaMapComponent implements OnInit {
  private chart: am4charts.XYChart;
  dataSource:any;
  nameArray = [];
  codeArray = [];
  stateCode = {};
  allData = {};
  myObject = [];
  stateData = [];
  myData : AllTotaldData[];
  finalData: AllTotaldData[];
  mapData:IndiaMapData[];
  data:any;
  constructor(private StateDataService:StateDataService, private DistrictWiseService:DistrictWiseService) { }
 
  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.DistrictWiseService.getDistrictData().subscribe((resp) =>{
      this.stateCode = resp;

      let newObject = {};

      for(let state in this.stateCode){
        newObject[state] = this.stateCode[state]["statecode"];
    }
    this.nameArray = Object.keys(newObject);
    this.codeArray = Object.values(newObject);

    for(let i=0; i < this.codeArray.length;i++){
         this.myObject[i] = {
        'state_name':this.nameArray[i],
        'State_code':this.codeArray[i]
      }
    }

    this.myData = this.myObject;

    this.StateDataService.getData().subscribe((response) =>{
      this.allData = response;
      
      this.myData.forEach(el => {
        if (this.allData[el.State_code]) {
          const obj = this.allData[el.State_code];
          el.state_code_object = obj;
          el.population = el.state_code_object.meta.population;
          el.confirmed = el.state_code_object.total.confirmed;
          el.deceased = el.state_code_object.total.deceased;
          el.recovered = el.state_code_object.total.recovered;
        }
      });

      this.myData.shift();
      this.finalData = this.myData;

      am4core.useTheme(am4themes_animated);
      
      var chart = am4core.create("chartdiv", am4maps.MapChart);
      
      chart.geodata = am4geodata_india2019High;
      
      // Create map polygon series
      var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
      
      polygonSeries.heatRules.push({
        property: "fill",
        target: polygonSeries.mapPolygons.template,
        min: chart.colors.getIndex(1).brighten(1),
        max: chart.colors.getIndex(1).brighten(-0.3)
      });
      
      polygonSeries.useGeodata = true;
        // Configure series tooltip
    var polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}: {value}";
    polygonTemplate.nonScalingStroke = true;
    polygonTemplate.strokeWidth = 0.5;
    
    var hs = polygonTemplate.states.create("hover");
    hs.properties.fill = am4core.color("#3c5bdc");
    
    for(let i=0; i < this.finalData.length;i++){
      if(this.finalData[i].population != undefined){
      let mappData = {
          'id':'IN-' +this.finalData[i].State_code, value:this.finalData[i].state_code_object.total.recovered,
        }
        this.stateData.push(mappData)
      }
    }
    polygonSeries.data =this.stateData;
    });

    });
      
  }
}
