import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreComponent } from './core/core.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TableComponent } from './table/table.component';
import { BarChartComponent } from './shared/bar-chart/bar-chart.component';
import { PieChartComponent } from './shared/pie-chart/pie-chart.component';
import { DonutChartComponent } from './shared/donut-chart/donut-chart.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table'  
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { CovidIndiaMapComponent } from './covid-india-map/covid-india-map.component';

const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'table', component: TableComponent },
  { path: 'covidMap', component: CovidIndiaMapComponent },

  { path: '', component: DashboardComponent, pathMatch: 'full' },
  { path: '**',component: DashboardComponent, pathMatch: 'full' }

];

@NgModule({
  declarations: [
    AppComponent,
    CoreComponent,
    DashboardComponent,
    TableComponent,
    BarChartComponent,
    PieChartComponent,
    DonutChartComponent,
    CovidIndiaMapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatSelectModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes, { useHash: true }
    ),
    NoopAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
