export interface TrainingWithPerformance {
    status: string;
    data: AllCovidData[];
}
export interface AllCovidData {
    state_name: string;
    State_code: any;
    state_code_object:any;
    // population:any
}

export interface CovidPerformance {
    status: string;
    data: AllTotaldData[];
}
export interface AllTotaldData {
    state_name: string;
    State_code: any;
    state_code_object:any;
    population:number;
    confirmed:number;
    deceased:number;
    recovered:number;
}
export interface PieChart {
    status: string;
    data: PieChartData[];
}
export interface PieChartData {
    name: string;
    value: any;
}
export interface DonutChart {
    status: string;
    data: DonutChartData[];
}
export interface DonutChartData {
    name: string;
    value: any;
}
export interface BarChart {
    status: string;
    data: BarChartData[];
}
export interface BarChartData {
    state: string;
    deceased: any;
}
export interface IndiaMap {
    status: string;
    data: IndiaMapData[];
}
export interface IndiaMapData {
    id: string;
    value: any;
}

export interface district {
    status: string;
    data: AllDistrictData[];
}
export interface AllDistrictData {
    district_name: string;
    population:any;
    confirmed:any;
    deceased:any;
    recovered:any;
}

