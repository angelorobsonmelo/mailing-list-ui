import { Function } from './../core/model';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";

@Injectable()
export class CategoryService {

  categoriesUrl = `${environment.apiUrl}/categories`;

  constructor(public http: HttpClient) {
  }

  getFunctions(): Observable<any> {
    return this.http.get<any>(this.categoriesUrl);
  }

}