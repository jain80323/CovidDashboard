import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StateDataService {


  constructor(private httpClient: HttpClient) { }

  getData(): Observable<any> {
    return this.httpClient.get<any>('https://api.covid19india.org/v4/data.json')
    .pipe(catchError((e) => throwError(e)));
  }
}
