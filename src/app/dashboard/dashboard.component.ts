import { Component, OnInit } from '@angular/core';
import { StateDataService} from '../services/state-data.service';
import { DistrictWiseService } from '../services/district-wise.service';
import { AllTotaldData,PieChartData,DonutChartData,BarChartData } from '../table/tableModal';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dataSource:any;
  nameArray = [];
  codeArray = [];
  stateCode = {};
  allData = {};
  myObject = [];
  myData : AllTotaldData[];
  finalData: AllTotaldData[];
  pieechartData:PieChartData[];
  donuttchartData:DonutChartData[];
  barrchartData:BarChartData[];
  totalPopulation = 0;
  totalConfirmed = 0;
  totalDece = 0;
  totalRecovered = 0;
  totalActive = 0;
  constructor(private StateDataService:StateDataService,private DistrictWiseService:DistrictWiseService,) { }
  
  ngOnInit(): void {
  let n =  new Date();
  let y = n.getFullYear();
  let m = n.getMonth() + 1;
  let d = n.getDate();
  document.getElementById("date").innerHTML = d + "/" + m + "/" + y;

  this.totalData();
  }

  totalData(){
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
      // console.log(this.finalData,'myobjectt');

      for(let i=0; i<this.finalData.length;i++){
        if(this.finalData[i].state_code_object && this.finalData[i].deceased != undefined){
          this.totalPopulation = this.totalPopulation + this.finalData[i].population;
        this.totalConfirmed += this.finalData[i].confirmed;
        this.totalDece += this.finalData[i].deceased;
        this.totalRecovered += this.finalData[i].recovered;
        }
      }
      this.totalActive = this.totalConfirmed - (this.totalDece + this.totalRecovered);
    
      this.barrchartData = [];
      for(let i=0; i < this.finalData.length;i++){
        if(this.finalData[i].deceased != undefined){
        let stateData =  {
           'state':this.finalData[i].state_name,'deceased': this.finalData[i].deceased,
         }
         this.barrchartData.push(stateData)
        }
      }
      this.pieechartData = [];
        this.pieechartData = [
          {
            'name':'Total Population',value:this.totalPopulation,
          },
          {
            'name':'Confirmed Cases',value:this.totalConfirmed,
          }
        ];
      this.donuttchartData=[];
        this.donuttchartData = [
          {
            'name':'Deceased',value:this.totalDece,
          },
          {
            'name':'Active Cases',value:this.totalActive,
          }
        ];

    });

    });

  }

}
