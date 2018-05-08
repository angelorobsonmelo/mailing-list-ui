import { Function } from './../core/model';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";

@Injectable()
export class FunctionService {

  functionsUrl = `${environment.apiUrl}/functions`;

  constructor(public http: HttpClient) {
  }

  getFunctions(): Observable<any> {
    return this.http.get<any>(this.functionsUrl);
  }

  getCategoriesPageable(page: number, pageSize: number): Observable<any> {
    return this.http.get<any>(`${this.functionsUrl}?pag=${page}&perPage=${pageSize}`);
  }

}
