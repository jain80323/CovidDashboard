import { Component, OnInit,ViewChild,OnDestroy,ChangeDetectorRef } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { DistrictWiseService } from '../services/district-wise.service';
import { StateDataService} from '../services/state-data.service';
import { AllCovidData,AllDistrictData } from './tableModal';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {
  displayedColumns: string[] = [
    "State",
    "Population",
    "Confirmed Cases",
    "Active Cases",
    "Deceased"
  ];
  displayedColumnsd: string[] = [
    "District",
    "Population",
    "Confirmed Cases",
    "Active Cases",
    "Deceased"
  ];
  displayElement = false;

  dataSource:any;
  nameArray = [];
  codeArray = [];
  stateCode = {};
  allData = {};
  myObject = [];
  myData: AllCovidData[];
  selected = '';
  districtName = [];
  populationData = [];
  confirmedData = [];
  deceasedData = [];
  recoveredData = [];

  districtObject = [];
  districtData:any;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor( private DistrictWiseService:DistrictWiseService, private StateDataService:StateDataService,private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.tableDataList();
  }

  tableDataList(){
    this.DistrictWiseService.getDistrictData().subscribe((resp) =>{
      this.stateCode = resp;

      let newObject = {};

      for(let state in this.stateCode){
        newObject[state] = this.stateCode[state]["statecode"];
    }

    this.nameArray = Object.keys(newObject);
    this.codeArray = Object.values(newObject);

    for(let i=0; i < this.nameArray.length;i++){
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
        }
      });
      this.myData.shift();
      this.dataSource = this.myData;

      this.dataSource = new MatTableDataSource (this.myData);
      this.cdr.detectChanges();
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    });
  }
  selectedDistrict(selectedValue){
    this.districtObject = [];
    this.displayElement=true;
      for(let i=0;i<this.myData.length;i++){
        if(selectedValue === this.myData[i].state_name){
          const obj = this.myData[i];
          this.dataSource = obj;
              break;
        }
      }
      this.districtName = Object.keys(this.dataSource.state_code_object.districts)
      
      Object.keys(this.dataSource.state_code_object.districts).forEach(key => {​​​​​

        const obj =this.dataSource.state_code_object.districts[key];
       let newobjj= {​​​​distrctname: key , districtobj: obj }​​​​
       
        this.districtObject.push(newobjj);
       
        }​​​​​);
        this.districtData = this.districtObject;

        this.districtData = new MatTableDataSource (this.districtObject);
        this.cdr.detectChanges();
        this.districtData.sort = this.sort;
        this.districtData.paginator = this.paginator;
  }
}