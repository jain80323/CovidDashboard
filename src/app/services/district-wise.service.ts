import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DistrictWiseService {

  constructor(private httpClient: HttpClient) { }

  getDistrictData(): Observable<any> {
    return this.httpClient.get<any>('https://api.covid19india.org/state_district_wise.json')
    .pipe(catchError((e) => throwError(e)));
  }

}
